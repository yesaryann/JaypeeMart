import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { getUserProducts, deleteProduct, getCurrentUser } from '../services/storage';

const MyListings = () => {
  const [products, setProducts] = useState([]);
  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      getUserProducts(user._id || user.id).then(setProducts).catch(console.error);
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!user) {
    return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Please log in to view your listings.</div>;
  }

  return (
    <div>
      <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-8)', letterSpacing: '-0.02em' }}>
        My Listings
      </h2>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-12) 0', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '1.25rem' }}>You haven't posted any listings yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          {products.map(product => (
            <div key={product.id} className="card" style={{ display: 'flex', gap: 'var(--spacing-4)', padding: 'var(--spacing-4)', alignItems: 'center' }}>
              <div style={{ width: '100px', height: '100px', backgroundColor: 'var(--bg-tertiary)', flexShrink: 0, borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/100x100?text=No+Image'; }}
                />
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: 'var(--spacing-1)' }}>{product.title}</h3>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: 'var(--spacing-2)' }}>₹{product.price}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Listed on {new Date(product.createdAt).toLocaleDateString()}</div>
              </div>
              
              <button 
                className="btn btn-outline" 
                style={{ color: 'var(--error)', borderColor: 'var(--error)' }}
                onClick={() => handleDelete(product.id)}
                title="Delete Listing"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
