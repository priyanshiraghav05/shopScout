const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Product = require('../models/Product');

// @route   GET api/shops
// @desc    Get all shops
// @access  Public
router.get('/', async (req, res) => {
  try {
    const shops = await User.find({ userType: 'shopkeeper' })
      .select('-password')
      .select('-email');
    res.json(shops);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/shops/:id
// @desc    Get shop by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const shop = await User.findById(req.params.id)
      .select('-password')
      .select('-email');

    if (!shop || shop.userType !== 'shopkeeper') {
      return res.status(404).json({ msg: 'Shop not found' });
    }

    res.json(shop);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Shop not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/shops/:id/products
// @desc    Get all products from a shop
// @access  Public
router.get('/:id/products', async (req, res) => {
  try {
    const products = await Product.find({ shop: req.params.id })
      .populate('shop', 'name shopInfo')
      .select('-reviews');

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/shops/profile
// @desc    Update shop profile
// @access  Private (Shopkeeper only)
router.put('/profile', auth, async (req, res) => {
  try {
    // Check if user is a shopkeeper
    if (req.user.userType !== 'shopkeeper') {
      return res.status(403).json({ msg: 'Only shopkeepers can update shop profiles' });
    }

    const { shopName, address, phone, description } = req.body;

    const shopFields = {
      shopInfo: {}
    };
    
    if (shopName) shopFields.shopInfo.shopName = shopName;
    if (address) shopFields.shopInfo.address = address;
    if (phone) shopFields.shopInfo.phone = phone;
    if (description) shopFields.shopInfo.description = description;

    const shop = await User.findByIdAndUpdate(
      req.user.id,
      { $set: shopFields },
      { new: true }
    ).select('-password');

    res.json(shop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/shops/:id/analytics
// @desc    Get shop analytics
// @access  Private (Shopkeeper only)
router.get('/:id/analytics', auth, async (req, res) => {
  try {
    // Check if user is requesting their own analytics
    if (req.user.id !== req.params.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const products = await Product.find({ shop: req.params.id });
    
    // Calculate analytics
    const totalProducts = products.length;
    const totalSales = products.reduce((acc, product) => acc + (product.stock || 0), 0);
    const totalRevenue = products.reduce((acc, product) => 
      acc + (product.stock || 0) * product.price, 0);
    const averageRating = products.length > 0 
      ? products.reduce((acc, product) => acc + (product.rating || 0), 0) / totalProducts 
      : 0;

    // Get top selling products
    const topSelling = products
      .sort((a, b) => (b.stock || 0) - (a.stock || 0))
      .slice(0, 5);

    // Get products with low stock
    const lowStock = products.filter(product => product.stock <= 5);

    res.json({
      totalProducts,
      totalSales,
      totalRevenue,
      averageRating,
      topSelling,
      lowStock
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 