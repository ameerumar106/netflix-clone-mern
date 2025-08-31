import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWatchlist } from '../../context/WatchlistContext';
import SkeletonMovie from '../../components/skeleton/SkeletonMovie';
import TrailerPlayer from '../../components/trailer/TrailerPlayer';
import Rating from '../../components/rating/Rating';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [continueWatching, setContinueWatching] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [moviesRes, featuredRes] = await Promise.all([
          axios.get("/api/movies"),
          axios.get("/api/movies/random")
        ]);
        
        setMovies(moviesRes.data);
        
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

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('continueWatching') || '[]');
    setContinueWatching(savedProgress);
  }, []);

  const handleWatchlistClick = (e, movieId) => {
    e.stopPropagation();
    if (isInWatchlist(movieId)) {
      removeFromWatchlist(movieId);
    } else {
      addToWatchlist(movieId);
    }
  };

  if (loading) {
    return (
      <div className="home" style={{ marginTop: '70px' }}>
        <div className="skeleton-featured"></div>
        
        {[...Array(3)].map((_, index) => (
          <div key={index} className="list">
            <div className="skeleton-title" style={{width: '200px', height: '25px', marginBottom: '15px'}}></div>
            <div className="movies">
              {[...Array(8)].map((_, i) => (
                <SkeletonMovie key={i} />
              ))}
            </div>
          </div>
        ))}
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
            <Rating rating={featuredMovie.rating} voteCount={featuredMovie.voteCount} size="large" />
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
      
      {continueWatching.length > 0 && (
        <div className="list">
          <h2>Continue Watching</h2>
          <div className="movies">
            {continueWatching.slice(0, 8).map(item => {
              const movie = movies.find(m => m._id === item.movieId);
              if (!movie) return null;
              
              return (
                <div
                  key={movie._id}
                  className="movie"
                  onClick={() => navigate(`/watch/${movie._id}`)}
                >
                  <img src={movie.img} alt={movie.title} />
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <div className="movie-overlay">
                    <h4>{movie.title}</h4>
                    <p>Continue from {Math.round(item.progress)}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {movies.length > 0 ? (
        <div className="lists">
          <div className="list">
            <h2>Popular on Netflix</h2>
            <div className="movies">
              {movies.slice(0, 8).map(movie => (
                <div
                  key={movie._id}
                  className="movie"
                  onMouseEnter={() => setHoveredMovie(movie._id)}
                  onMouseLeave={() => setHoveredMovie(null)}
                  onClick={() => navigate(`/watch/${movie._id}`)}
                >
                  <img src={movie.img} alt={movie.title} />
                  <TrailerPlayer 
                    trailerUrl={movie.trailer} 
                    isPlaying={hoveredMovie === movie._id}
                  />
                  <div className="movie-overlay">
                    <h4>{movie.title}</h4>
                    <Rating rating={movie.rating} voteCount={movie.voteCount} size="small" />
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

          <div className="list">
            <h2>New Releases</h2>
            <div className="movies">
              {movies.slice().reverse().slice(0, 8).map(movie => (
                <div
                  key={movie._id}
                  className="movie"
                  onMouseEnter={() => setHoveredMovie(movie._id)}
                  onMouseLeave={() => setHoveredMovie(null)}
                  onClick={() => navigate(`/watch/${movie._id}`)}
                >
                  <img src={movie.img} alt={movie.title} />
                  <TrailerPlayer 
                    trailerUrl={movie.trailer} 
                    isPlaying={hoveredMovie === movie._id}
                  />
                  <div className="movie-overlay">
                    <h4>{movie.title}</h4>
                    <Rating rating={movie.rating} voteCount={movie.voteCount} size="small" />
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

          <div className="list">
            <h2>Trending Now</h2>
            <div className="movies">
              {movies.sort(() => Math.random() - 0.5).slice(0, 8).map(movie => (
                <div
                  key={movie._id}
                  className="movie"
                  onMouseEnter={() => setHoveredMovie(movie._id)}
                  onMouseLeave={() => setHoveredMovie(null)}
                  onClick={() => navigate(`/watch/${movie._id}`)}
                >
                  <img src={movie.img} alt={movie.title} />
                  <TrailerPlayer 
                    trailerUrl={movie.trailer} 
                    isPlaying={hoveredMovie === movie._id}
                  />
                  <div className="movie-overlay">
                    <h4>{movie.title}</h4>
                    <Rating rating={movie.rating} voteCount={movie.voteCount} size="small" />
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