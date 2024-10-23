# FrontEnd
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
  Frontend Structure
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


Installation
Clone the Repository:

git clone https://github.com/your-username/cocktail-app.git
cd cocktail-app

Frontend Setup:

Navigate to the frontend folder:

cd ../frontend
Install the necessary dependencies:

npm install


Start the Frontend Development Server:

In the frontend folder, run:

npm start

The app should now be accessible at http://localhost:3000.

   Frontend Structure

The frontend folder contains the following main components:

Pages: For rendering different views such as Home, Cocktail Details, Login, etc.
Components: Reusable components like CocktailCard, ReviewForm, Navbar, etc.
Services: API calls for fetching and manipulating data.
Styles: CSS files for styling the application.
Contributing
We welcome contributions! To contribute:

   Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).
Make your changes and commit them (git commit -m 'Add your feature here').
Push to the branch (git push origin feature/your-feature-name).
Open a pull request.