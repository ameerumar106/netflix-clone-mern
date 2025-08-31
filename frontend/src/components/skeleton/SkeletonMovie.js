import React from 'react';
import './SkeletonMovie.css';

const SkeletonMovie = () => {
  return (
    <div className="skeleton-movie">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-year"></div>
      </div>
    </div>
  );
};

export default SkeletonMovie;