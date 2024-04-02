const mongoose = require('mongoose');
const regExpLink = /^(https?:\/\/)(www\.)?[\w~:/?%#[\]@!$&'.()*+,;=]*\/#?/;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 80,
    required: true,
  },
  category: {
    type: String,
    enum: ['case airpods', 'case iphone', 'he/him', 'termos, vasos y tazas'],
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  models: {
    type: Array,
  },
  price: {
    type: Number,
    required: true,
  },
  'photo-link': {
    type: String,
    validate: {
      validator(v) {
        return regExpLink.test(v);
      },
    },
    required: true,
  },
});
module.exports = mongoose.model('product', productSchema);
