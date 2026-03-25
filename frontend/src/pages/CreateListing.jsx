import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../services/storage';

const CATEGORIES = ['Books', 'Vehicles', 'Furniture', 'Electronics', 'Other'];

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: CATEGORIES[0]
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        ...formData,
        price: Number(formData.price)
      });
      navigate('/my-listings');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-6)', letterSpacing: '-0.02em' }}>
        Create New Listing
      </h2>

      <div className="form-card">
        {error && (
          <div style={{ padding: 'var(--spacing-3)', marginBottom: 'var(--spacing-4)', backgroundColor: '#fff0f0', color: 'var(--error)', borderRadius: 'var(--radius-sm)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">Product Title</label>
            <input 
              id="title" name="title" className="form-input" type="text" 
              value={formData.title} onChange={handleChange} required 
              placeholder="e.g. Advanced Engineering Mathematics"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea 
              id="description" name="description" className="form-input" 
              value={formData.description} onChange={handleChange} required 
              rows="4" placeholder="Describe the condition, usage, and any defects..."
            ></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="price">Price (₹)</label>
              <input 
                id="price" name="price" className="form-input" type="number" 
                value={formData.price} onChange={handleChange} required 
                min="0" step="0.01"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="category">Category</label>
              <select 
                id="category" name="category" className="form-input"
                value={formData.category} onChange={handleChange}
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="image">Image URL</label>
            <input 
              id="image" name="image" className="form-input" type="url" 
              value={formData.image} onChange={handleChange} required 
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginTop: 'var(--spacing-6)' }}>
            <button type="submit" className="btn" style={{ flex: 1 }}>
              Publish Listing
            </button>
            <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
