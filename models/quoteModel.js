const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    budget: { type: String },
    start_date: { type: Date },
    attachment: { type: String },
    message: { type: String, required: true },
    user: { type: String },
    payment: { type: String, required: true, default: "unpaid" },
    status: { type: String, default: "pending" },
    quote: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);
