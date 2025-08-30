import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="Netflix Logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
          <span onClick={() => navigate('/')}>Home</span>
          <span>Series</span>
          <span>Movies</span>
          <span>New & Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          {/* Search Form */}
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

          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <div className="auth-buttons">
              <button onClick={() => navigate('/login')}>Sign In</button>
              <button 
                onClick={() => navigate('/register')}
                className="signup-btn"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;