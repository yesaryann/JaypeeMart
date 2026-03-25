import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/storage';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    batchYear: '',
    hostelNumber: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }} className="form-card">
      <div>
        <h2 style={{ marginBottom: 'var(--spacing-6)', textAlign: 'center', fontWeight: '600' }}>Create Account</h2>
        
        {error && (
          <div style={{ padding: 'var(--spacing-3)', marginBottom: 'var(--spacing-4)', backgroundColor: '#fff0f0', color: 'var(--error)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input 
              id="name" name="name" className="form-input" type="text" 
              value={formData.name} onChange={handleChange} required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="rollNumber">Roll Number</label>
            <input 
              id="rollNumber" name="rollNumber" className="form-input" type="text" 
              value={formData.rollNumber} onChange={handleChange} required 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="batchYear">Batch Year</label>
              <input 
                id="batchYear" name="batchYear" className="form-input" type="number" 
                value={formData.batchYear} onChange={handleChange} required 
                min="2020" max="2030"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="hostelNumber">Hostel No.</label>
              <input 
                id="hostelNumber" name="hostelNumber" className="form-input" type="text" 
                value={formData.hostelNumber} onChange={handleChange} required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input 
              id="password" name="password" className="form-input" type="password" 
              value={formData.password} onChange={handleChange} required 
            />
          </div>

          <button type="submit" className="btn" style={{ width: '100%', marginTop: 'var(--spacing-2)' }}>
            Register
          </button>
        </form>

        <div style={{ marginTop: 'var(--spacing-6)', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
