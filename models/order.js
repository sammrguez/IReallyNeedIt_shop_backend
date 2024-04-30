const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const orderSchema = new mongoose.Schema({
  items: {
    type: Array,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  trackId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('order', orderSchema);
