import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, LogOut, PlusCircle, User } from 'lucide-react';
import { getCurrentUser, logout } from '../services/storage';

const Navbar = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <header style={{ 
      borderBottom: '1px solid var(--border-light)', 
      backgroundColor: 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(8px)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        height: '64px' 
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <ShoppingBag size={24} color="var(--accent-black)" />
          <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.03em' }}>
            JaypeeMart
          </span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          {user ? (
            <>
              <Link to="/create-listing" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                <PlusCircle size={18} />
                <span>List Product</span>
              </Link>
              <Link to="/my-listings" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                <User size={18} />
                <span>My Listings</span>
              </Link>
              <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-light)', margin: '0 var(--spacing-2)' }}></div>
              <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Log In</Link>
              <Link to="/register" className="btn">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
