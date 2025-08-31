import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on authentication pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleHomeClick = () => {
    navigate(user ? '/' : '/login');
  };

  // If on auth page, show only Netflix logo
  if (isAuthPage) {
    return (
      <div className="navbar">
        <div className="container">
          <div className="left">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt="Netflix Logo"
              onClick={handleHomeClick}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Normal navbar for all other pages
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="Netflix Logo"
            onClick={handleHomeClick}
            style={{ cursor: 'pointer' }}
          />
          {user && (
            <>
              <span onClick={() => navigate('/')}>Home</span>
              <span>Series</span>
              <span>Movies</span>
              <span>New & Popular</span>
              <span>My List</span>
            </>
          )}
        </div>
        
        <div className="right">
          {user && (
            <>
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  🔍
                </button>
              </form>

              <div className="user-info">
                <span className="welcome-text">Welcome, {user.username}</span>
                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;