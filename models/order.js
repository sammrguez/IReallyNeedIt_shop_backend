const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const orderSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
  total: {
    type: Number,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('order', orderSchema);
