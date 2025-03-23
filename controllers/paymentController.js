const Payment = require("../models/payment");
const Quote = require("../models/quoteModel");
const { validator } = require("../utility/validator");
const stripe = require("stripe")(
  "sk_test_51R4vXt4GL9088pHXRPGRhQ69I2QKOPtvkkMNOCeq58y0MQk0S0Miw5WyQAs4oQqMGv7xSRxmDguQAk1LS5gMkE2O00gCvKcC8p"
); // Replace with your actual secret key

// Process Payment and Redirect to Stripe Checkout
const processPayment = async (req, res) => {
  try {
    const { amount, fullName, email, billingAddress, phone } = req.body;

    // Find the quote by ID
    const quote = await Quote.findById(req.params.quoteId);
    if (!quote) {
      return validator("Quote not found", "/auth/user", req, res);
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Quote Payment" },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.APP_LINK}/payment/success?session_id={CHECKOUT_SESSION_ID}&quote_id=${quote._id}`,
      cancel_url: `${process.env.APP_LINK}/auth/user`,
    });

    // Save payment details in the database
    const payment = new Payment({
      quote: quote._id,
      fullName,
      email,
      phone,
      billingAddress,
      amount,
      paymentIntentId: session.id,
      status: "pending",
      paymentStatus: "not_processed",
    });

    await payment.save();

    // Redirect user to Stripe checkout page
    return validator({url:session.url,quoteId:quote?._id}, "/auth/user", req, res);
  } catch (error) {
    console.error("Payment error:", error);
    return validator(error.message, "/auth/user", req, res);
  }
};

// Handle Payment Success
const paymentSuccess = async (req, res) => {
  try {
    const { session_id, quote_id } = req.query;

    if (!session_id || !quote_id) {
      return validator("Missing required parameters", "/auth/user", req, res);
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session) {
      return validator("Session not found", "/auth/user", req, res);
    }

    // Update the quote status to "paid"
    const updatedQuote = await Quote.findByIdAndUpdate(
      quote_id,
      { payment: "paid" },
      { new: true } // Return the updated document
    );

    // Update payment status in the database
    await Payment.updateOne(
      { paymentIntentId: session.id },
      { status: "succeeded", paymentStatus: "processed" }
    );

    // Emit a real-time update to all clients
    const io = req.app.get('io'); // Get the Socket.IO instance
    io.emit('payment-success', "success"); // Emit the updated quote

    return validator("Payment successful", "/auth/user", req, res);
  } catch (error) {
    console.error("Payment success error:", error);
    return validator(error.message, "/auth/user", req, res);
  }
};

module.exports = { processPayment, paymentSuccess };
