import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/storage';

const CATEGORIES = ['All', 'Books', 'Vehicles', 'Furniture', 'Electronics', 'Other'];

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-4)', letterSpacing: '-0.02em' }}>
          Latest Listings
        </h2>
        
        <div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Search specific item..." 
              className="form-input"
              style={{ paddingLeft: '32px', border: 'none', borderBottom: '1px solid var(--border-light)', borderRadius: '0', background: 'transparent' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <Filter size={18} strokeWidth={1.5} color="var(--text-secondary)" />
            <select 
              className="form-input" 
              style={{ width: 'auto', border: 'none', borderBottom: '1px solid var(--border-light)', borderRadius: '0', background: 'transparent' }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-12) 0', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '1.25rem' }}>No products found.</p>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: 'var(--spacing-6)' 
        }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
