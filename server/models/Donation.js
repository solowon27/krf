const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
    trim: true,
  },
  item: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: Number,
    required: false,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
   submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

module.exports = mongoose.model('Donation', donationSchema);
