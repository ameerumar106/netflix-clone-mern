import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'react';
import { useAuth } from './AuthContext';

const WatchlistContext = createContext();

export const useWatchlist = () => {
  return useContext(WatchlistContext);
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWatchlist();
    }
  }, [user]);

  const fetchWatchlist = async () => {
    try {
      const res = await axios.get(`/api/users/watchlist/${user._id}`);
      setWatchlist(res.data);
    } catch (err) {
      console.error('Error fetching watchlist:', err);
    }
  };

  const addToWatchlist = async (movieId) => {
    try {
      await axios.put(`/api/users/watchlist/add/${user._id}`, { movieId });
      setWatchlist(prev => [...prev, movieId]);
    } catch (err) {
      console.error('Error adding to watchlist:', err);
    }
  };

  const removeFromWatchlist = async (movieId) => {
    try {
      await axios.put(`/api/users/watchlist/remove/${user._id}`, { movieId });
      setWatchlist(prev => prev.filter(id => id !== movieId));
    } catch (err) {
      console.error('Error removing from watchlist:', err);
    }
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(movie => movie._id === movieId);
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    fetchWatchlist
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};