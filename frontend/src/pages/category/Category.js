import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Category.css';

const Category = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryMovies = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/movies/category/${category}`);
        setMovies(res.data);
      } catch (err) {
        console.error('Error fetching category movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryMovies();
  }, [category]);

  if (loading) {
    return (
      <div className="category-page">
        <div className="category-header">
          <button onClick={() => navigate('/')} className="back-btn">← Back</button>
          <h1>Loading {category} movies...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-header">
        <button onClick={() => navigate('/')} className="back-btn">← Back</button>
        <h1>{category} Movies & Series</h1>
        <p className="movie-count">{movies.length} titles found</p>
      </div>

      {movies.length > 0 ? (
        <div className="category-movies">
          {movies.map(movie => (
            <div
              key={movie._id}
              className="category-movie"
              onClick={() => navigate(`/watch/${movie._id}`)}
            >
              <img src={movie.img} alt={movie.title} />
              <div className="movie-overlay">
                <h3>{movie.title}</h3>
                <p>{movie.year} • {movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-movies">
          <h2>No {category} movies found</h2>
          <p>Try browsing other categories</p>
          <button onClick={() => navigate('/')} className="browse-btn">
            Browse All Categories
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;