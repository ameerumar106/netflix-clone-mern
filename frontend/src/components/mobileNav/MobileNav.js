import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MobileNav.css';

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on auth pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  if (isAuthPage) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="mobile-nav">
      <button 
        className={isActive('/') ? 'active' : ''}
        onClick={() => navigate('/')}
      >
        <span>🏠</span>
        <span>Home</span>
      </button>
      <button 
        className={isActive('/search') ? 'active' : ''}
        onClick={() => navigate('/search')}
      >
        <span>🔍</span>
        <span>Search</span>
      </button>
      <button 
        className={isActive('/watchlist') ? 'active' : ''}
        onClick={() => navigate('/watchlist')}
      >
        <span>📋</span>
        <span>My List</span>
      </button>
      <button 
        className={isActive('/profile') ? 'active' : ''}
        onClick={() => navigate('/profile')}
      >
        <span>👤</span>
        <span>Profile</span>
      </button>
    </div>
  );
};

export default MobileNav;