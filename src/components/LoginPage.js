import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      if (response.data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        window.location.href = '/app/analyze';
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      alert('Error connecting to backend.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#5C5B57',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <div>
        <h2 style={{ marginBottom: '2rem' }}> Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '10px',
            marginBottom: '1rem',
            width: '100%',
            maxWidth: '300px',
            backgroundColor: '#D3D3D3',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem'
          }}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '10px',
            marginBottom: '1.5rem',
            width: '100%',
            maxWidth: '300px',
            backgroundColor: '#D3D3D3',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem'
          }}
        /><br />
        <button
          onClick={handleLogin}
          style={{
            backgroundColor: '#2E2E2E',
            color: 'white',
            padding: '10px 25px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Login
        </button>

        <p style={{ marginTop: '1.5rem', color: 'white' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#2E2E2E', textDecoration: 'underline' }}>
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
