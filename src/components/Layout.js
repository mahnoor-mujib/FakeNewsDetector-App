import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#4a4a4a', color: 'white' }}>
      {/* Top Menu Bar */}
      <nav style={{
        background: '#2c2c2c',
        padding: '15px 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', gap: '25px' }}>
          <Link to="/app/analyze" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>🕵️ Analyze News</Link>
          <Link to="/app/feed" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>🔥 View Fake Posts</Link>
          <Link to="/app/profile" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>👤 My Profile</Link>
        </div>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🚪 Logout
        </button>
      </nav>

      <div style={{ padding: '2rem' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
