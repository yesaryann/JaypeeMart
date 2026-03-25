const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products
// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    // Map _id to id for frontend compatibility
    const formattedProducts = products.map(p => {
      const obj = p.toObject();
      obj.id = obj._id;
      return obj;
    });
    res.json(formattedProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/user/:userId
// Get products by specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.params.userId }).sort({ createdAt: -1 });
    const formattedProducts = products.map(p => {
      const obj = p.toObject();
      obj.id = obj._id;
      return obj;
    });
    res.json(formattedProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products
// Create a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    
    const obj = savedProduct.toObject();
    obj.id = obj._id;
    res.status(201).json(obj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/products/:id
// Delete a specific product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
