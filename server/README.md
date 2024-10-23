Cocktail App

The Cocktail App is a full-stack web application designed to provide users with an engaging way to explore, review, and share various cocktail recipes. Built using Flask for the backend and React for the frontend, this app allows users to view cocktail listings, create and modify reviews, add new cocktail recipes, and manage their accounts through a user login system.

Table of Contents

  Features
  Tech Stack
  Getting Started
  Prerequisites
  Installation
  Database Setup
  Running the Application
  API Endpoints
  Contributing

    FEATURES
View Cocktail Listings: Users can browse through a variety of cocktail recipes.
CRUD Functionality for Listings: Users can create, read, update, and delete cocktail listings.
Review System: Users can add, edit, and delete reviews for each cocktail.
User Authentication: Login and registration functionality for account management.
Responsive UI: Interactive and user-friendly interface built with React.
Tech Stack
Frontend: React, React Router, Formik (for form management and validation)
Backend: Flask, SQLAlchemy
Database: PostgreSQL
Others: CSS for styling, JavaScript (ES6+) for interactivity

Getting Started

Prerequisites
Ensure you have the following installed:

Python 3.x
Node.js and npm
PostgreSQL

   Backend Setup:

Navigate to the backend folder:

cd backend
Create and activate a virtual environment:

python3 -m venv venv  /  pipenv install
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`   /  pipenv shell

Install the required dependencies:

pip install -r requirements.txt

Database Setup
Create a PostgreSQL Database:

Open PostgreSQL and create a new database:
sql
CREATE DATABASE cocktail_app;
Configure the Database Connection:

Update the config.py file in the backend folder with your PostgreSQL database URI:

SQLALCHEMY_DATABASE_URI = 'postgresql://username:password@localhost/cocktail_app'
Run Database Migrations:

In the backend folder, run: (to start the migrations)

flask db init
flask db migrate
flask db upgrade

Seed the Database:

Run the seed.py script to populate the database with initial data:

python seed.py
Running the Application
Start the Backend Server:

flask run

   API Endpoints
Here is a brief overview of the available API routes:

Cocktails:

GET /api/cocktails: Fetch all cocktails
POST /api/cocktails: Create a new cocktail
PUT /api/cocktails/<id>: Update an existing cocktail
DELETE /api/cocktails/<id>: Delete a cocktail
Reviews:

GET /api/reviews: Fetch all reviews
POST /api/reviews: Add a new review
PUT /api/reviews/<id>: Update a review
DELETE /api/reviews/<id>: Delete a review
Users:

POST /api/register: Register a new user
POST /api/login: Authenticate a user


Contributing

We welcome contributions! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Make your changes and commit them (git commit -m 'Add your feature here').
Push to the branch (git push origin feature/your-feature-name).
Open a pull request.

