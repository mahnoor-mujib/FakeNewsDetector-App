import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/signup', {
        username,
        password,
      });

      if (res.data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        alert('Signup successful! You can now log in.');
        navigate('/app/analyze');
      } else {
        alert(res.data.message || 'Signup failed');
      }
    } catch (err) {
      alert('Error: Could not connect to backend');
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
        padding: '2rem',
      }}
    >
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: '0.75rem',
              marginBottom: '1rem',
              width: '100%',
              maxWidth: '300px',
              backgroundColor: '#d3d3d3', 
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
            }}
          /><br />
          <input
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '0.75rem',
              marginBottom: '1rem',
              width: '100%',
              maxWidth: '300px',
              backgroundColor: '#d3d3d3',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
            }}
          /><br />
          <button
            type="submit"
            style={{
              backgroundColor: '#2E2E2E', 
              color: 'white',
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Sign Up
          </button>
        </form>
        <p style={{ marginTop: '1rem', color: 'white' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#2E2E2E', textDecoration: 'underline' }}>
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
