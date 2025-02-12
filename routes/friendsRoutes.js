const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Review = require('../models/Review');

router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('following', 'name email');
    const friends = user.following;

    res.render('friends', { user, friends });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.post('/remove/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.following = user.following.filter(friendId => friendId.toString() !== req.params.id);
    await user.save();

    res.redirect('/friends');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('/:id/reviews', protect, async (req, res) => {
  try {
    const friend = await User.findById(req.params.id);
    if (!friend) {
      return res.status(404).send('Friend not found');
    }

    const reviews = await Review.find({ user: req.params.id })
      .populate('movie', 'title genre releaseYear poster')
      .sort({ createdAt: -1 });

    res.render('friendReviews', { user: req.user, friend, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;