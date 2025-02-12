const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

dbURI = 'mongodb+srv://mojtaba:13811121@network-eng.oayd0.mongodb.net/?retryWrites=true&w=majority&appName=network-eng'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const createAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin already exists:', existingAdmin);
            mongoose.connection.close();
            return;
        }

        const admin = new User({
            email: 'admin@example.com',
            password: '123',
            name: 'Admin User',
            role: 'admin'
        });

        await admin.save();
        console.log('Admin user created successfully:', admin);
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating admin user:', error);
        mongoose.connection.close();
    }
};

createAdmin();