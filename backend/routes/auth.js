const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (userExists) {
      return res.status(400).json({ 
        message: 'User already exists with this email or username' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    
    // Create token for auto-login
    const token = jwt.sign(
      { id: savedUser._id, isAdmin: savedUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = savedUser._doc;
    
    res.status(201).json({
      token,
      user: userWithoutPassword,
      message: 'User created successfully'
    });
    
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      message: 'Internal server error during registration' 
    });
  }
});

// LOGIN (keep your existing login code)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(200).json({
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;