# Film & Series Review App

This project is a full-stack web application for managing and reviewing films and series. Users can browse movies, view details, and submit reviews with numeric ratings between 1 and 5 (in increments of 0.25). The project is built using Node.js, Express, MongoDB, and various front-end libraries/frameworks for an enhanced user experience.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)

---

## Overview

This application allows:
- **Browsing & Filtering Movies:** Users can view a dashboard of movies with advanced filtering options (by genre, release year, and rating).
- **Movie Details View:** Each movie has its details page where users can see movie information along with existing reviews.
- **Submitting Reviews:** Authenticated users can write reviews with text and a numeric rating, ensuring each rating meets the required criteria.
- **Persistent Data:** All movie and review data is stored in a MongoDB database, ensuring persistence across application restarts.
---

## Features

- **User Authentication:** Only logged-in users can submit reviews.
- **Movie Dashboard:** Filter movies based on genre, year, and rating.
- **Movie Details View:** Displays full details of selected movies along with all associated reviews.
- **Review Submission:** Users can submit a review with validation ensuring ratings between 1 and 5 (increments of 0.25).
- **Dynamic Average Rating:** Movies update their overall average rating as new reviews are submitted.
- **Responsive Design:** The application is built with a responsive layout using modern CSS frameworks.

---

## Technologies

- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript ,ejs
- **Database:** MongoDB
- **Authentication:** JWT or session-based authentication
- **Other Tools:** Docker for containerization, Git for version control

---

## Project Structure

Film-Review-App/
├── bin/
│   └── www                      # Application HTTP server startup script
├── controllers/
│   ├── authController.js        # Handles authentication-related logic
│   └── homeController.js        # Controls the home page and dashboard views
├── middleware/
│   └── authMiddleware.js        # Custom middleware for route protection
├── models/
│   ├── Movie.js                 # Mongoose schema/model for movies
│   ├── Review.js                # Mongoose schema/model for reviews
│   └── User.js                  # Mongoose schema/model for users
├── public/
│   ├── images/                  # Static image assets
│   │   ├── file.jpg
│   │   ├── Hoze-Naghashiii-1-207x290.jpg
│   │   └── khobbadjelf.jpg
│   ├── javascripts/             # Client-side JavaScript files
│   └── stylesheets/             # CSS stylesheets for different layouts
│       ├── adminstyles.css
│       ├── style.css
│       └── userstyles.css
├── routes/
│   ├── adminRoutes.js           # Admin-level routes (e.g., movie/user management)
│   ├── authRoutes.js            # Routes for login, logout, and signup
│   ├── index.js                 # Main router for home page and general navigation
│   ├── movieRoutes.js           # Routes for listing movies and movie details
│   ├── reviewRoutes.js          # Endpoints for submitting and managing reviews
│   └── users.js                 # Routes for user profile and management functions
├── views/
│   ├── partials/                # Reusable view components (e.g., header, navigation)
│   │   ├── header.ejs
│   │   └── topnav.ejs
│   ├── addMovie.ejs             # Admin view for adding new movies
│   ├── adminDashboard.ejs       # Dashboard view for administrators
│   ├── adminMovies.ejs          # Admin view for managing movies
│   ├── adminUsers.ejs           # Admin view for managing users
│   ├── editMovie.ejs            # View for editing movie details (admin)
│   ├── editUser.ejs             # View for editing user information (admin)
│   ├── error.ejs                # Error display page
│   ├── index.ejs                # Main landing page
│   ├── login.ejs                # User login page
│   ├── movieDetails.ejs         # Detailed view for a single movie (with reviews)
│   ├── signup.ejs               # User signup/registration page
│   └── userDashboard.ejs        # Dashboard view for authenticated users
├── app.js                       # Main application setup and configuration
├── createAdmin.js               # Script to create an admin user account
├── seed.js                      # Script for seeding the database with sample data
├── package.json                 # Project metadata and dependency lists
└── README.md                    # Project documentation (this file)

---

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mojtabahadei81/letterboxd.git
   cd film-review-app

2. **Install dependencies:**

   ```bash
   npm install

3. **Run the application:**

   ```bash
   npm start

The application will be available at: http://localhost:3000

Usage
Dashboard: Navigate to /user/dashboard to view the list of movies with filtering options.
Movie Details: Click on a movie to view its details and existing reviews at /movies/:id.
Submit Review: On the movie details page, if you are logged in, fill in the review form and click Submit Review. The app will validate the input and redirect you back to the movie details page.