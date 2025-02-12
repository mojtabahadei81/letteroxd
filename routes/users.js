const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Movie = require('../models/Movie');
const User = require('../models/User');
const Review = require('../models/Review');

router.get('/dashboard', protect, async (req, res) => {
  try {
    const { genre, year, rating } = req.query;

    const query = {};
    if (genre) {
      query.genre = { $regex: new RegExp(genre, 'i') };
    }
    if (year) {
      query.releaseYear = parseInt(year);
    }
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }

    const movies = await Movie.find(query).limit(20);

    const user = await User.findById(req.user._id).populate('following');
    const friendsIds = user.following.map(friend => friend._id);

    const friendsActivities = await Review.find({ user: { $in: friendsIds } })
      .populate('user', 'name')
      .populate('movie', 'title')
      .sort({ createdAt: -1 })
      .limit(10);

    res.render('userDashboard', { 
      user: req.user, 
      movies, 
      friendsActivities
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('/profile', protect, async (req, res) => {
  try {
    const user = req.user;
    const reviews = await Review.find({ user: user._id })
      .populate('movie', 'title genre year poster')
      .sort({ createdAt: -1 });

    res.render('userProfile', { user, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;