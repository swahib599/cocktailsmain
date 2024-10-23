import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div id="searchSection">
      <input
        type="text"
        placeholder="Search cocktails..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '200px',
          backgroundColor: '#333',
          color: 'white'
        }}
      />
    </div>
  );
}

export default SearchBar;