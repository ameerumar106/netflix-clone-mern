import React from 'react';
import './Rating.css';

const Rating = ({ rating, voteCount, size = 'medium' }) => {
  if (!rating) return null;

  return (
    <div className={`rating ${size}`}>
      <span className="rating-stars">⭐</span>
      <span className="rating-value">{rating.toFixed(1)}</span>
      {voteCount > 0 && (
        <span className="rating-count">({voteCount})</span>
      )}
    </div>
  );
};

export default Rating;