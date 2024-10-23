import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import TopOfPage from "./components/Landing";
import CategoriesComponent from "./components/Categories";
import RandomCocktail from "./components/RandomSelection";
import Login from "./components/UserLogin";
import Register from "./components/Register";

const API_URL = process.env.REACT_APP_API_URL || 'https://cocktail-combined.onrender.com';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${API_URL}/check-auth`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          // Token is invalid or expired
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <TopOfPage />
            <RandomCocktail isLoggedIn={isLoggedIn} />
            <CategoriesComponent isLoggedIn={isLoggedIn} />
          </>
        } />
        <Route 
          path="/login" 
          element={
            isLoggedIn ? 
            <Navigate to="/" replace /> : 
            <Login setIsLoggedIn={setIsLoggedIn} />
          } 
        />
        <Route 
          path="/register" 
          element={
            isLoggedIn ? 
            <Navigate to="/" replace /> : 
            <Register />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;