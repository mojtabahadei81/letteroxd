const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Review = require('../models/Review');
const Movie = require('../models/Movie');

router.post('/', protect, async (req, res) => {
  try {
    const { movieId, text, rating } = req.body;

    if (!movieId || !text || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const numericRating = parseFloat(rating);
    if (numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const existingReview = await Review.findOne({
      movie: movieId,
      user: req.user._id,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: 'You have already reviewed this movie.' });
    }

    const newReview = new Review({
      movie: movieId,
      user: req.user._id,
      text,
      rating: numericRating,
    });

    await newReview.save();

    const reviews = await Review.find({ movie: movieId });
    const averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    await Movie.findByIdAndUpdate(movieId, { rating: averageRating });

    res.redirect(`/movie/${movieId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;