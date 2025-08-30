import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Watch from './pages/watch/Watch';
import Login from './pages/login/Login';
import SearchResults from './pages/search/SearchResults';
import Category from './pages/category/Category';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/category/:category" element={<Category />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Make sure this export is present
export default App;