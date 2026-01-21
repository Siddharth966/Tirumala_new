const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // For now we store the class string like 'bg-green-100' or eventually a URL
    required: true, 
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
