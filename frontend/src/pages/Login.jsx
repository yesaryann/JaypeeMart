import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/storage';

const Login = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(rollNumber, password);
      navigate('/');
      window.location.reload(); // Quick way to re-evaluate Navbar state
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }} className="form-card">
      <div>
        <h2 style={{ marginBottom: 'var(--spacing-6)', textAlign: 'center', fontWeight: '600' }}>Welcome Back</h2>
        
        {error && (
          <div style={{ padding: 'var(--spacing-3)', marginBottom: 'var(--spacing-4)', backgroundColor: '#fff0f0', color: 'var(--error)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="rollNumber">Roll Number</label>
            <input 
              id="rollNumber"
              className="form-input" 
              type="text" 
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input 
              id="password"
              className="form-input" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn" style={{ width: '100%', marginTop: 'var(--spacing-2)' }}>
            Log In
          </button>
        </form>

        <div style={{ marginTop: 'var(--spacing-6)', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
