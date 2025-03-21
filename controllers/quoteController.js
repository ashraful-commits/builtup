const QuoteRequest = require("../models/quoteModel");

// Render the quote request form
const renderQuoteForm =async (req, res) => {
    
  res.render("quote-request-form");
};

// Create a new quote request (POST)
const createQuoteRequest = async (req, res) => {
  try {
    const { name, email, phone, subject, budget, start_date, message } = req.body;

    const userId = req?.session?.user?._id ? req?.session?.user?._id  : null; 
  
    const attachment = req.file ? req?.file?.filename : null; 
    const newQuote = new QuoteRequest({
      user: userId, 
      name,
      email,
      phone,
      subject,
      budget,
      start_date,
      attachment,
      message,
    });

    await newQuote.save();
    console.log(newQuote)
    res.redirect("/auth/user");
  } catch (error) {
    console.log(error)
    res.redirect("/auth/user");
  }
};


// Get all quote requests (GET)
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await QuoteRequest.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: quotes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single quote request by ID (GET)
const getQuoteById = async (req, res) => {
  try {
    const quote = await QuoteRequest.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, message: "Quote not found" });
    }
    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a quote request (PUT)
const updateQuoteApproved = async (req, res) => {
  try {
    const { name, email, phone, subject, budget, start_date, message } = req.body;
    const attachment = req.file ? req.file.path : req.body.attachment; // Update file if uploaded

    const updatedQuote = await QuoteRequest.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, subject, budget, start_date, attachment, message,status:"approved" },
      { new: true, runValidators: true }
    );

    if (!updatedQuote) {
      return res.status(404).json({ success: false, message: "Quote not found" });
    }

    res.redirect("/auth/admin");
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const updateQuoteReject = async (req, res) => {
  try {
    const { name, email, phone, subject, budget, start_date, message } = req.body;
    const attachment = req.file ? req.file.path : req.body.attachment; // Update file if uploaded

    const updatedQuote = await QuoteRequest.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, subject, budget, start_date, attachment, message,status:"rejected" },
      { new: true, runValidators: true }
    );

    if (!updatedQuote) {
      return res.status(404).json({ success: false, message: "Quote not found" });
    }

    res.redirect("/auth/admin");
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a quote request (DELETE)
const deleteQuoteRequest = async (req, res) => {
    try {
        const quote = await QuoteRequest.findByIdAndDelete(req.params.id);
        if (!quote) {
          return res.status(404).json({ success: false, message: "Quote not found" });
        }
        res.redirect("/auth/user");
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
};

module.exports = {
  renderQuoteForm,
  createQuoteRequest,
  getAllQuotes,
  getQuoteById,
  updateQuoteApproved,
updateQuoteReject,
  deleteQuoteRequest,
};
