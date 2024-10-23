import React, { useState, useEffect } from 'react';

import { API_URL } from '../config';

const CategoriesComponent = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchCocktailsByCategory();
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchCocktailsByCategory = async () => {
    try {
      const response = await fetch(`${API_URL}/api/cocktails?glass_type=${selectedCategory}`);
      const data = await response.json();
      setCocktails(data);
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  
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
    <div id="categoriesSection" style={styles.container}>
      <h2 style={styles.title}>
        Looking for a drink with something specific? Set preference below!
      </h2>

      <select
        onChange={handleCategoryChange}
        value={selectedCategory}
        style={styles.select}
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div style={styles.cocktailGrid}>
        {currentCocktails.map((cocktail) => (
          <div key={cocktail.id} style={styles.cocktailCard}>
            <img
              src={`${API_URL}${cocktail.image_url}`}
              alt={cocktail.name}
              style={styles.cocktailImage}
            />
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
          </div>
        ))}
      </div>
      <div style={styles.paginationContainer}>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          style={styles.paginationButton}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(cocktails.length / itemsPerPage)}
          style={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'black',
    padding: '20px',
    borderRadius: '10px',
  },
  title: {
    color: 'white',
    marginBottom: '10px',
    textAlign: 'center',
  },
  select: {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  cocktailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  cocktailCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    padding: '15px',
    borderRadius: '10px',
    textAlign: 'left',
  },
  cocktailImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  cocktailTitle: {
    marginBottom: '10px',
  },
  ingredientList: {
    listStyleType: 'none',
    padding: 0,
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
};

export default CategoriesComponent;