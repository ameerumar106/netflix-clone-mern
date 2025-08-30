import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`/api/movies/search?q=${query}`);
        setResults(res.data);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  if (loading) {
    return (
      <div className="search-results">
        <div className="search-header">
          <button onClick={() => navigate('/')} className="back-btn">← Back</button>
          <h1>Searching for "{query}"...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="search-header">
        <button onClick={() => navigate('/')} className="back-btn">← Back</button>
        <h1>Search Results for "{query}"</h1>
      </div>

      {results.length > 0 ? (
        <div className="results-grid">
          {results.map(movie => (
            <div
              key={movie._id}
              className="result-card"
              onClick={() => navigate(`/watch/${movie._id}`)}
            >
              <img src={movie.img} alt={movie.title} />
              <div className="result-info">
                <h3>{movie.title}</h3>
                <p className="year">{movie.year}</p>
                <p className="genre">{movie.genre}</p>
                <p className="desc">{movie.desc?.substring(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h2>No results found for "{query}"</h2>
          <p>Try different keywords or browse our categories</p>
          <button onClick={() => navigate('/')} className="browse-btn">
            Browse All Movies
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;