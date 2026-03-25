const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-light)',
      padding: 'var(--spacing-8) 0',
      marginTop: 'auto',
      backgroundColor: 'var(--bg-secondary)',
      textAlign: 'center'
    }}>
      <div className="container">
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: 'var(--spacing-2)', letterSpacing: '-0.02em' }}>JaypeeMart</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} JaypeeMart. The exclusive campus marketplace.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
