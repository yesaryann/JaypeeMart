const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, rollNumber, batchYear, hostelNumber, password } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ rollNumber });
    if (user) {
      return res.status(400).json({ message: 'User with this Roll Number already exists' });
    }
    
    user = new User({ name, rollNumber, batchYear, hostelNumber, password });
    await user.save();
    
    // Convert to object and strip password before sending back
    const userObj = user.toObject();
    delete userObj.password;
    
    res.status(201).json(userObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { rollNumber, password } = req.body;
    
    const user = await User.findOne({ rollNumber, password });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Roll Number or Password' });
    }
    
    const userObj = user.toObject();
    delete userObj.password;
    
    res.json(userObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
