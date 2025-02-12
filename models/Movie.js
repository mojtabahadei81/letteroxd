const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: [{
        type: String,
        required: true
    }],
    poster: {
        type: String,
        default: 'default-poster.jpg'
    },
    images: [{
        type: String
    }],
    totalRating: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

movieSchema.virtual('averageRating').get(function() {
    return this.ratingCount ? (this.totalRating / this.ratingCount) : 0;
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;