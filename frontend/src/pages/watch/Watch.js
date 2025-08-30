import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Watch.css';

const Watch = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/movies/find/${id}`);
        setMovie(res.data);
        setError('');
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Failed to load movie. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="watch-loading">
        <h2>Loading movie...</h2>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="watch-error">
        <h2>{error || 'Movie not found'}</h2>
        <button onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    );
  }

  return (
    <div className="watch">
      <div className="back-button">
        <button onClick={() => navigate('/')}>← Back to Home</button>
      </div>
      
      <div className="video-container">
        {movie.trailer ? (
          <iframe
            width="100%"
            height="100%"
            src={movie.trailer}
            title={`${movie.title} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="no-trailer">
            <h2>Trailer not available</h2>
            <p>No trailer available for {movie.title}</p>
            <button onClick={() => navigate('/')}>Go Back Home</button>
          </div>
        )}
      </div>

      <div className="movie-info">
        <h1>{movie.title} ({movie.year})</h1>
        <p className="genre">{movie.genre} • {movie.limit}+</p>
        <p className="description">{movie.desc}</p>
        
        <div className="actions">
          <button className="play-btn">▶ Continue Watching</button>
          <button className="add-btn">+ Add to My List</button>
        </div>
      </div>
    </div>
  );
};

export default Watch;