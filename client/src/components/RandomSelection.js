import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './SearchBar';

const API_URL = process.env.REACT_APP_API_URL || 'https://cocktail-combined.onrender.com';

const RandomCocktail = ({ isLoggedIn }) => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [error, setError] = useState(null);

  const fetchRandomCocktails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/cocktails`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCocktails(data);
    } catch (err) {
      setError('Failed to fetch cocktails: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomCocktails();
  }, [fetchRandomCocktails]);

  const handleLike = useCallback(async (id) => {
    if (!isLoggedIn) {
      setError('Please log in to like cocktails');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/cocktails/${id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: 1 }),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to like cocktail');
      }
      fetchRandomCocktails();
    } catch (err) {
      setError('Failed to like cocktail: ' + err.message);
    }
  }, [isLoggedIn, fetchRandomCocktails]);

  const handleDislike = useCallback(async (id) => {
    if (!isLoggedIn) {
      setError('Please log in to dislike cocktails');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/cocktails/${id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: -1 }),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to dislike cocktail');
      }
      fetchRandomCocktails();
    } catch (err) {
      setError('Failed to dislike cocktail: ' + err.message);
    }
  }, [isLoggedIn, fetchRandomCocktails]);

  const handleCommentSubmit = useCallback(async (id, comment) => {
    if (!isLoggedIn) {
      setError('Please log in to comment on cocktails');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/cocktails/${id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
      fetchRandomCocktails();
    } catch (err) {
      setError('Failed to submit comment: ' + err.message);
    }
  }, [isLoggedIn, fetchRandomCocktails]);

  const handleSearch = useCallback(async (searchTerm) => {
    try {
      const response = await fetch(`${API_URL}/api/search?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      setCocktails(data);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to search cocktails: ' + err.message);
    }
  }, []);

  // Pagination
  const indexOfLastCocktail = currentPage * itemsPerPage;
  const indexOfFirstCocktail = indexOfLastCocktail - itemsPerPage;
  const currentCocktails = cocktails.slice(indexOfFirstCocktail, indexOfLastCocktail);

  const nextPage = () => {
    if (currentPage < Math.ceil(cocktails.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div id="topSelectionSection">
      <h2 style={{ color: 'white', fontSize: "2em" }}>Our Top Selections Today!</h2>
      <SearchBar onSearch={handleSearch} />
      {error && <p style={styles.error}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={styles.cocktailGrid}>
          {currentCocktails.map((cocktail) => (
            <div key={cocktail.id} style={styles.cocktailCard}>
              <img src={`${API_URL}${cocktail.image_url}`} alt={cocktail.name} style={styles.cocktailImage}/>
              <h3 style={styles.cocktailTitle}>{cocktail.name}</h3>
              <p>Glass: {cocktail.glass_type}</p>
              <h4>Ingredients:</h4>
              <ul style={styles.ingredientList}>
              {cocktail.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.amount} {ingredient.name}</li>
              ))}
              </ul>
              <h4>Instructions:</h4>
              <p>{cocktail.instructions}</p>
              <div style={styles.buttonContainer}>
                <button onClick={() => handleLike(cocktail.id)} style={styles.likeButton}>👍🏾</button>
                <button onClick={() => handleDislike(cocktail.id)} style={styles.dislikeButton}>👎🏾</button>
              </div>
              <textarea
                placeholder="Leave a comment..."
                style={styles.commentBox}
                onBlur={(e) => handleCommentSubmit(cocktail.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
      <div style={styles.paginationContainer}>
        <button onClick={prevPage} disabled={currentPage === 1} style={styles.paginationButton}>
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage >= Math.ceil(cocktails.length / itemsPerPage)} style={styles.paginationButton}>
          Next
        </button>
      </div>
    </div>
  );
};


const styles = {
  cocktailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    padding: '20px',
  },
  cocktailCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  cocktailImage: {
    width: '150px',
    height: '150px',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  cocktailTitle: {
    margin: '10px 0',
  },
  buttonContainer: {
    margin: '10px 0',
  },
  likeButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  dislikeButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  commentBox: {
    width: '100%',
    height: '60px',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#333',
    color: 'white',
  },
  paginationContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  paginationButton: {
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  cocktailImage: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
};

export default RandomCocktail;