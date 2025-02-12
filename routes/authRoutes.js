const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controllers/authController');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
});

router.post('/signup', signUp);

router.post('/login', login);

module.exports = router;