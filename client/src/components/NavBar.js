import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  
  return (
    <nav style={styles.navbar}>
      <div style={styles.topSection}>
        {/* <Link to="/" style={styles.button}>Home</Link> */}
        <a href="#categoriesSection" style={styles.button}>Categories</a>
        <a href="#topSelectionSection" style={styles.button}>Random Selection</a>
        <a href="#searchSection" style={styles.button}>Search</a>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        ) : (
          <Link to="/login" style={styles.button}>Login</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: '15px',
    color: 'white',
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: '10px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  searchBar: {
    marginLeft: 'auto',
    marginRight: '20px',
  },
};

export default Navbar;