# Film & Series Review App

This project is a full-stack web application for managing and reviewing films and series. Users can browse movies, view details, and submit reviews with numeric ratings between 1 and 5 (in increments of 0.25). The project is built using Node.js, Express, MongoDB, and various front-end libraries/frameworks for an enhanced user experience.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Docker Instructions](#docker-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Credits & License](#credits--license)

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
│   app.js
│   createAdmin.js
│   package-lock.json
│   package.json
│   README.md
│   seed.js
│
├───bin
│       www
│
├───controllers
│       authController.js
│       homeController.js
│
├───middleware
│       authMiddleware.js
│
├───models
│       Movie.js
│       Review.js
│       User.js
│
├───public
│   ├───images
│   │       file.jpg
│   │       Hoze-Naghashiii-1-207x290.jpg
│   │       khobbadjelf.jpg
│   │
│   ├───javascripts
│   └───stylesheets
│           adminstyles.css
│           style.css
│           userstyles.css
│
├───routes
│       adminRoutes.js
│       authRoutes.js
│       index.js
│       movieRoutes.js
│       reviewRoutes.js
│       users.js
│
└───views
    │   addMovie.ejs
    │   adminDashboard.ejs
    │   adminMovies.ejs
    │   adminUsers.ejs
    │   editMovie.ejs
    │   editUser.ejs
    │   error.ejs
    │   index.ejs
    │   index.jade
    │   login.ejs
    │   movieDetails.ejs
    │   signup.ejs
    │   userDashboard.ejs
    │
    └───partials
            header.ejs
            topnav.ejs
yaml

---

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mojtabahadei12/letterboxd.git
   cd film-review-app
Install dependencies:

bash
npm install
Environment Variables:

Run the application:

bash
npm start
The application will be available at: http://localhost:3000

Usage
Dashboard: Navigate to /user/dashboard to view the list of movies with filtering options.
Movie Details: Click on a movie to view its details and existing reviews at /movies/:id.
Submit Review: On the movie details page, if you are logged in, fill in the review form and click Submit Review. The app will validate the input and redirect you back to the movie details page.
API Endpoints
Movies:
GET /movies/:id – Get details for a movie along with its reviews.
Reviews:
POST /reviews – Submit a new review (requires authentication).
Users:
Additional endpoints for user login, registration, and dashboard management are provided.
Each API endpoint performs necessary validation and data persistence using MongoDB.

Contributing
The project is intended for collaborative work.
For the first three projects, teams can consist of up to 2 members; for the subsequent three projects, teams may consist of up to 3 members.
All commits must be made to a GitHub repository with a detailed commit history.
Each team member should be familiar with all aspects of the codebase and ready to answer technical questions during the presentation.
Any form of plagiarism or copying from other sources (including GitHub repositories or classmates) will result in a zero grade.

Happy Coding!



