import React from 'react';
import './TrailerPlayer.css';

const TrailerPlayer = ({ trailerUrl, isPlaying }) => {
  if (!trailerUrl || !isPlaying) return null;

  return (
    <div className="trailer-player">
      <iframe
        src={`${trailerUrl}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
        title="Movie trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="trailer-overlay"></div>
    </div>
  );
};

export default TrailerPlayer;