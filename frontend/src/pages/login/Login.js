import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user just registered
  useEffect(() => {
    if (location.state?.fromRegister) {
      setShowWelcome(true);
      // Clear the state after showing message
      const timer = setTimeout(() => {
        setShowWelcome(false);
        // Replace state to remove the flag
        navigate('.', { replace: true });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Sign In</h2>
        
        {showWelcome && (
          <div className="welcome-message">
            <p>🎉 Welcome! Your account has been created. Please sign in.</p>
          </div>
        )}
        
        {error && <div className="error">{error}</div>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        
        <p className="register-link">
          Don't have an account? <span onClick={() => navigate('/register')} style={{cursor: 'pointer', color: '#e50914'}}>Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;