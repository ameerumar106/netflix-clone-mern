import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  // Inline styles for the component
  const styles = {
    searchContainer: {
      position: 'relative',
      display: 'inline-block',
    },
    searchToggle: {
      background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      cursor: 'pointer',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      color: 'white',
    },
    searchToggleHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    },
    searchForm: {
      position: 'absolute',
      top: '50px',
      right: '0',
      display: 'flex',
      background: 'white',
      borderRadius: '25px',
      padding: '5px',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.15)',
      zIndex: '1000',
      animation: 'slideDown 0.3s ease',
    },
    searchInput: {
      border: 'none',
      padding: '12px 20px',
      borderRadius: '25px 0 0 25px',
      outline: 'none',
      width: '250px',
      fontSize: '16px',
      background: '#f5f5f5',
      transition: 'background 0.3s ease',
    },
    searchInputFocus: {
      background: '#eaeaea',
    },
    searchSubmit: {
      background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
      border: 'none',
      borderRadius: '0 25px 25px 0',
      padding: '0 20px',
      color: 'white',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    },
    searchSubmitHover: {
      background: 'linear-gradient(135deg, #5d7cea, #9666d8)',
      transform: 'translateX(2px)',
    },
    // Keyframes as a style tag (will be added to the document head)
    keyframes: `
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  };

  // Add keyframes to document head
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = styles.keyframes;
    document.head.append(style);
    return () => style.remove();
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div style={styles.searchContainer}>
      <button 
        style={{
          ...styles.searchToggle,
          ...(isHovered && styles.searchToggleHover)
        }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        🔍
      </button>
      
      {isOpen && (
        <form 
          style={styles.searchForm} 
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search for movies, series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              ...styles.searchInput,
              ...(isInputFocused && styles.searchInputFocus)
            }}
            autoFocus
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <button 
            type="submit" 
            style={styles.searchSubmit}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #5d7cea, #9666d8)';
              e.target.style.transform = 'translateX(2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #6e8efb, #a777e3)';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            Search
          </button>
        </form>
      )}
    </div>
  );
};

export default Search;