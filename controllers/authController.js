const jwt = require('jsonwebtoken');
const User = require('../models/User');

JWT_SECRET='MOJTABA'

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
    );
};

const signUp = async (req, res) => {
    const { email, password, name, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('<script>alert("User already exists"); window.location.href="/signup";</script>');
        }

        const user = new User({ email, password, name, role });
        await user.save();

        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('<script>alert("Server error. Please try again later."); window.location.href="/signup";</script>');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).render('login', { message: 'User not found', success: false });
        }

        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(401).render('login', { message: 'Invalid credentials', success: false });
        }

        const token = generateToken(user);

        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        if (user.role === 'admin') {
            return res.redirect('/admin/dashboard');
        } else {
            return res.redirect('/users/dashboard');
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('login', { message: 'Server error', success: false });
    }
};


module.exports = { signUp, login };