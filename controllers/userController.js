const QuoteRequest = require("../models/quoteModel");
const Payment = require("../models/payment");
const { validator } = require("../utility/validator");
const userdashbord = async (req, res) => {
    const user = req?.session?.user;
    try {
        if (!user) {
            return validator("Please login first", "/auth/login", req, res);
        }

        // Fetch user quotes sorted by creation date
        const userQuotes = await QuoteRequest.find({ user: user._id })
            .sort({ createdAt: -1 });

        // Fetch payment details for each quote using a for loop
        const userQuotesWithPayments = await Promise.all(
            userQuotes.map(async (quote) => {
                const payment = await Payment.findOne({ quote: quote._id }); // Assuming `quote` has an _id field
                return { ...quote.toObject(), paymentDetails: payment }; // Merging the quote and payment data
            })
        );
        // Render the dashboard with quotes and payment details
        res.render("user-dashbord", { user, allQuotes: userQuotesWithPayments });
    } catch (error) {
        console.error("Error fetching quotes:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { userdashbord };