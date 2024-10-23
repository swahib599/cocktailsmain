const getApiUrl = () => {
    if (process.env.REACT_APP_API_URL) {
      return process.env.REACT_APP_API_URL;
    }
    
    if (process.env.NODE_ENV === 'production') {
      return 'https://cocktail-combined.onrender.com';
    }
    
    return 'http://localhost:5000';
  };
  
  export const API_URL = getApiUrl();