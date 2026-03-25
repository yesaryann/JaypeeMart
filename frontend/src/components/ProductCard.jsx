import { Tag, User } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ProductCard = ({ product }) => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <div ref={ref} className={`card reveal ${isVisible ? 'visible' : ''}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="card-image-wrapper" style={{ height: '240px' }}>
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'; }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-1)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '500', lineHeight: 1.4, paddingRight: 'var(--spacing-2)' }}>
            {product.title}
          </h3>
          <span style={{ fontSize: '1rem', fontWeight: '400' }}>₹{product.price}</span>
        </div>
        
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '0.875rem', 
          fontWeight: '300',
          marginBottom: 'var(--spacing-4)', 
          flexGrow: 1, 
          display: '-webkit-box', 
          WebkitLineClamp: 2, 
          WebkitBoxOrient: 'vertical', 
          overflow: 'hidden' 
        }}>
          {product.description}
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          fontSize: '0.65rem', 
          color: 'var(--text-tertiary)', 
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Tag size={12} strokeWidth={1.5} /> {product.category}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <User size={12} strokeWidth={1.5} /> {product.sellerName.split(' ')[0]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
