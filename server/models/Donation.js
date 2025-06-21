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
  message: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Donation', donationSchema);
