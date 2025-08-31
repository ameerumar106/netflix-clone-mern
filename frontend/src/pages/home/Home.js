import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useWatchlist } from '../../context/WatchlistContext';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [moviesRes, featuredRes, categoriesRes] = await Promise.all([
          axios.get("/api/movies"),
          axios.get("/api/movies/random"),
          axios.get("/api/movies/categories")
        ]);
        
        setMovies(moviesRes.data);
        setCategories(categoriesRes.data);
        
        // Set featured movie
        if (featuredRes.data && featuredRes.data.length > 0) {
          setFeaturedMovie(featuredRes.data[0]);
        } else if (moviesRes.data.length > 0) {
          setFeaturedMovie(moviesRes.data[0]);
        }
        
        setError('');
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load movies. Please check if backend is running on port 5000');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  const handleWatchlistClick = (e, movieId) => {
    e.stopPropagation(); // Prevent navigation to movie page
    if (isInWatchlist(movieId)) {
      removeFromWatchlist(movieId);
    } else {
      addToWatchlist(movieId);
    }
  };

  if (loading) {
    return (
      <div className="home" style={{ marginTop: '70px', textAlign: 'center', padding: '50px' }}>
        <h2>Loading movies...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home" style={{ marginTop: '70px', textAlign: 'center', padding: '50px' }}>
        <h2 style={{ color: '#e50914' }}>{error}</h2>
        <p>Make sure your backend server is running on port 5000</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="home">
      {featuredMovie ? (
        <div className="featured">
          <img src={featuredMovie.img} alt={featuredMovie.title} />
          <div className="featured-overlay"></div>
          <div className="info">
            <h1>{featuredMovie.title}</h1>
            <p className="desc">{featuredMovie.desc}</p>
            <div className="buttons">
              <button className="play" onClick={() => navigate(`/watch/${featuredMovie._id}`)}>
                ▶ Play
              </button>
              {user && (
                <button 
                  className="more"
                  onClick={(e) => handleWatchlistClick(e, featuredMovie._id)}
                >
                  {isInWatchlist(featuredMovie._id) ? '✓ My List' : '+ My List'}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-featured">
          <h2>No featured movie available</h2>
          <p>Please add movies to the database</p>
        </div>
      )}
      
      {/* Categories Section */}
      {categories.length > 0 && (
        <div className="categories-section">
          <h2>Browse by Category</h2>
          <div className="categories-grid">
            {categories.slice(0, 6).map((category) => (
              <div
                key={category}
                className="category-card"
                onClick={() => handleCategoryClick(category)}
              >
                <h3>{category}</h3>
                <span className="category-count">
                  {movies.filter(movie => movie.genre === category).length} titles
                </span>
              </div>
            ))}
          </div>
          {categories.length > 6 && (
            <button 
              className="view-all-categories"
              onClick={() => navigate('/categories')}
            >
              View All Categories →
            </button>
          )}
        </div>
      )}

      {/* Movies Sections */}
      {movies.length > 0 ? (
        <div className="lists">
          {/* Popular Movies */}
          <div className="list">
            <h2>Popular on Netflix</h2>
            <div className="movies">
              {movies.slice(0, 8).map(movie => (
                <div key={movie._id} className="movie" onClick={() => navigate(`/watch/${movie._id}`)}>
                  <img src={movie.img} alt={movie.title} />
                  <div className="movie-overlay">
                    <h4>{movie.title}</h4>
                    <p>{movie.year} • {movie.genre}</p>
                    {user && (
                      <button 
                        onClick={(e) => handleWatchlistClick(e, movie._id)}
                        className="watchlist-btn"
                      >
                        {isInWatchlist(movie._id) ? '✓ In Watchlist' : '+ Add to Watchlist'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Releases */}
          <div className="list">
            <h2>New Releases</h2>
            <div className="movies">
              {movies.slice().reverse().slice(0, 8).map(movie => (
                <div key={movie._id} className="movie" onClick={() => navigate(`/watch/${movie._id}`)}>
                  <img src={movie.img} alt={movie.title} />
                  <div className="movie-overlay">
                    <h4>{movie.title}</h4>
                    <p>{movie.year} • {movie.genre}</p>
                    {user && (
                      <button 
                        onClick={(e) => handleWatchlistClick(e, movie._id)}
                        className="watchlist-btn"
                      >
                        {isInWatchlist(movie._id) ? '✓ In Watchlist' : '+ Add to Watchlist'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Now */}
          <div className="list">
            <h2>Trending Now</h2>
            <div className="movies">
              {movies.sort(() => Math.random() - 0.5).slice(0, 8).map(movie => (
                <div key={movie._id} className="movie" onClick={() => navigate(`/watch/${movie._id}`)}>
                  <img src={movie.img} alt={movie.title} />
                  <div className="movie-overlay">
                    <h4>{movie.title}</h4>
                    <p>{movie.year} • {movie.genre}</p>
                    {user && (
                      <button 
                        onClick={(e) => handleWatchlistClick(e, movie._id)}
                        className="watchlist-btn"
                      >
                        {isInWatchlist(movie._id) ? '✓ In Watchlist' : '+ Add to Watchlist'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* By Category Sections */}
          {categories.slice(0, 3).map(category => {
            const categoryMovies = movies.filter(movie => movie.genre === category);
            if (categoryMovies.length === 0) return null;
            
            return (
              <div key={category} className="list">
                <h2>{category} Movies</h2>
                <div className="movies">
                  {categoryMovies.slice(0, 8).map(movie => (
                    <div key={movie._id} className="movie" onClick={() => navigate(`/watch/${movie._id}`)}>
                      <img src={movie.img} alt={movie.title} />
                      <div className="movie-overlay">
                        <h4>{movie.title}</h4>
                        <p>{movie.year} • {movie.genre}</p>
                        {user && (
                          <button 
                            onClick={(e) => handleWatchlistClick(e, movie._id)}
                            className="watchlist-btn"
                          >
                            {isInWatchlist(movie._id) ? '✓ In Watchlist' : '+ Add to Watchlist'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {categoryMovies.length > 8 && (
                  <button 
                    className="view-more"
                    onClick={() => navigate(`/category/${category}`)}
                  >
                    View All {category} Movies →
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-movies">
          <h3>No movies found in database</h3>
          <p>Run "node seed.js" in your backend folder to add sample movies</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Refresh Page
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;