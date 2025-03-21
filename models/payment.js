const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  quote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quote', 
    required: true
  },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    billingAddress: {
      type: String,
      required: false,
    },

  amount: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    enum: ['pending', 'succeeded', 'failed'],
    default: 'pending', // Payment starts as pending
  },
  paymentMethodId: {
    type: String,
    required: false,
  },
  paymentIntentId: {
    type: String,
    required: false, // Only necessary if you're using payment intents
  },
  paymentStatus: {
    type: String,
    enum: ['not_processed', 'processed', 'failed'],
    default: 'not_processed',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Create a payment model
const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
