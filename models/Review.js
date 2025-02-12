const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        validate: {
            validator: function(v) {
                return (v * 4) % 1 === 0;
            },
            message: 'Rating must be in increments of 0.25'
        }
    }
}, {
    timestamps: true
});

reviewSchema.index({ user: 1, movie: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;