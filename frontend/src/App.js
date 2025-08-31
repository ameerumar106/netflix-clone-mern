import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import Navbar from './components/navbar/Navbar';
import MobileNav from './components/mobileNav/MobileNav';
import Home from './pages/home/Home';
import Watch from './pages/watch/Watch';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import SearchResults from './pages/search/SearchResults';
import AuthGuard from './components/auth/AuthGuard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <Router>
          <div className="App">
            <Navbar />
            <MobileNav />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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
                            <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </WatchlistProvider>
    </AuthProvider>
  );
}

export default App;