const Movie = require('../models/Movie');


const getHomePageContent = async (req, res) => {
    try {

        const topRatedMovies = await Movie.find()
            .sort({ averageRating: -1 })
            .limit(10)
            .select('title poster averageRating _id');

        const newestMovies = await Movie.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .select('title poster year _id');

        const trendingMovies = await Movie.find()
            .sort({ viewCount: -1 })
            .limit(10)
            .select('title poster viewCount _id');

        const popularGenres = await Movie.aggregate([
            { $unwind: "$genre" },
            { $group: { _id: "$genre", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        res.render('index', {
            topRatedMovies,
            newestMovies,
            trendingMovies,
            popularGenres
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = { getHomePageContent };