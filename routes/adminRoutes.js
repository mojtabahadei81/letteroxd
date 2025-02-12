const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Movie = require('../models/Movie');

router.get('/dashboard', protect, isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        const movies = await Movie.find();
        res.render('adminDashboard', { users, movies });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/users', protect, isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.render('adminUsers', { users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/reports', protect, isAdmin, (req, res) => {
    res.send('View Reports Page');
});

router.get('/settings', protect, isAdmin, (req, res) => {
    res.send('Admin Settings Page');
});

router.post('/users/:id/delete', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.redirect('/admin/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/users/:id/edit', protect, isAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('editUser', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.post('/users/:id/edit', protect, isAdmin, async (req, res) => {
    try {
        const { name, email, role } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


router.get('/movies', protect, isAdmin, async (req, res) => {
    try {
        const movies = await Movie.find();
        res.render('adminMovies', { movies });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/movies/add', protect, isAdmin, (req, res) => {
    res.render('addMovie');
});


router.post('/movies/add', protect, isAdmin, async (req, res) => {
    const { title, description, genre, releaseYear, poster, images } = req.body;

    try {
        const movie = new Movie({
            title,
            description,
            genre,
            releaseYear,
            poster,
            images: images ? images.split(',') : [],
        });

        await movie.save();
        res.redirect('/admin/movies');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/movies/:id/edit', protect, isAdmin, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        res.render('editMovie', { movie });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.post('/movies/:id/edit', protect, isAdmin, async (req, res) => {
    const { title, description, genre, releaseYear, poster, images } = req.body;

    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                genre,
                releaseYear,
                poster,
                images: images ? images.split(',') : [],
            },
            { new: true, runValidators: true }
        );

        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        res.redirect('/admin/movies');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.post('/movies/:id/delete', protect, isAdmin, async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        res.redirect('/admin/movies');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});




module.exports = router;