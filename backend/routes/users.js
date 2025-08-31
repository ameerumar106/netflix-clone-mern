// backend/routes/users.js
const router = require('express').Router();
const User = require('../models/User');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/auth');

// UPDATE USER
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE USER
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USERS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
// ADD TO WATCHLIST
router.put('/watchlist/add/:userId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user.watchlist.includes(req.body.movieId)) {
      await user.updateOne({ $push: { watchlist: req.body.movieId } });
      res.status(200).json('Added to watchlist');
    } else {
      res.status(400).json('Already in watchlist');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// REMOVE FROM WATCHLIST
router.put('/watchlist/remove/:userId', verifyToken, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userId, {
      $pull: { watchlist: req.body.movieId }
    });
    res.status(200).json('Removed from watchlist');
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET WATCHLIST
router.get('/watchlist/:userId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('watchlist');
    res.status(200).json(user.watchlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;