const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Store data in DB (for now, just store it directly — no hashing)
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(200).json({ message: 'Login saved to database' });
  } catch (error) {
    res.status(400).json({ message: 'User already exists or DB error', error });
  }
});

module.exports = router;
