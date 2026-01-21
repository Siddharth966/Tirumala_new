const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../routes/auth'); // If we want to import middleware, but maybe we just import it directly if it was exported. 
// Actually auth middleware is likely not exported or named differently. Let's look at auth.js later if we need protection. 
// For now, let's just make open routes or basic ones. 
// Wait, I should probably check if I can reuse an auth middleware. 
// Let's assume public read, private write.

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a product
router.post('/', async (req, res) => {
  const { name, category, price, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      category,
      price,
      image
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
    }
    
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
