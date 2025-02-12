const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Movie = require('../models/Movie');
const Review = require('../models/Review');

router.get('/:id', protect, async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }

    const reviews = await Review.find({ movie: movieId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.render('movieDetails', { movie, reviews, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;