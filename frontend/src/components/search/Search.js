import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="search-container">
      <button 
        className="search-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        🔍
      </button>
      
      {isOpen && (
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for movies, series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            autoFocus
          />
          <button type="submit" className="search-submit">
            Search
          </button>
        </form>
      )}
    </div>
  );
};

export default Search;