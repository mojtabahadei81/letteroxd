// routes/followRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

router.post('/:id', protect, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    if (!userToFollow) {
      return res.status(404).json({ message: 'this user not found.' });
    }

    const currentUser = await User.findById(req.user._id);

    if (currentUser.following.includes(userToFollow._id)) {
      return res.status(400).json({ message: 'you are followed this user before.' });
    }

    currentUser.following.push(userToFollow._id);
    await currentUser.save();

    res.status(200).json({ message: 'user followed successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error.' });
  }
});

module.exports = router;