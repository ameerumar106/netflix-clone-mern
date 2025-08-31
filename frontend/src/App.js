import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Watch from './pages/watch/Watch';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import SearchResults from './pages/search/SearchResults';
import Category from './pages/category/Category';
import AuthGuard from './components/auth/AuthGuard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <WatchlistProvider>
          <Router>
            <div className="App">
              <Navbar />
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected routes - require authentication */}
                <Route path="/" element={
                  <AuthGuard>
                    <Home />
                  </AuthGuard>
                } />
                <Route path="/watch/:id" element={
                  <AuthGuard>
                    <Watch />
                  </AuthGuard>
                } />
                <Route path="/search" element={
                  <AuthGuard>
                    <SearchResults />
                  </AuthGuard>
                } />
                <Route path="/category/:category" element={
                  <AuthGuard>
                    <Category />
                  </AuthGuard>
                } />
                
                {/* Redirect any unknown route to login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </div>
          </Router>
        </WatchlistProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;