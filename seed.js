const mongoose = require('mongoose');
const Movie = require('./models/Movie');
require('dotenv').config();

dbURI = 'mongodb+srv://mojtaba:13811121@network-eng.oayd0.mongodb.net/?retryWrites=true&w=majority&appName=network-eng'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const sampleMovies = [
    {
        title: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        genre: ["Drama"],
        year: 1994,
        averageRating: 9.3,
        viewCount: 1500000,
        featured: true,
        poster: "the-shawshank.jpg",
        createdAt: new Date()
    },
    {
        title: "The Godfather",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        genre: ["Crime", "Drama"],
        year: 1972,
        averageRating: 9.2,
        viewCount: 1200000,
        featured: true,
        poster: "god_father.jpg",
        createdAt: new Date()
    },
    {
        title: "The Dark Knight",
        description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
        genre: ["Action", "Crime", "Drama"],
        year: 2008,
        averageRating: 9.0,
        viewCount: 1800000,
        featured: true,
        poster: "the-dark.jpg",
        createdAt: new Date()
    },
    {
        title: "Pulp Fiction",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        genre: ["Crime", "Drama"],
        year: 1994,
        averageRating: 8.9,
        viewCount: 1100000,
        featured: false,
        poster: "pulp_fiction.jpg",
        createdAt: new Date()
    },
    {
        title: "Forrest Gump",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
        genre: ["Drama", "Romance"],
        year: 1994,
        averageRating: 8.8,
        viewCount: 1000000,
        featured: false,
        poster: "forrest-gump.jpg",
        createdAt: new Date()
    }
];

const seedDatabase = async () => {
    try {
        await Movie.deleteMany({});
        console.log('Existing movies deleted.');

        await Movie.insertMany(sampleMovies);
        console.log('Sample movies added to the database.');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding the database:', error);
        mongoose.connection.close();
    }
};

seedDatabase();