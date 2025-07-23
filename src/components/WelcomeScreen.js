import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeScreen = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#5C5B57', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>
        📰 FAKE NEWS DETECTOR
      </h1>

      <div>
        <Link to="/signup">
          <button
            style={{
              backgroundColor: '#2E2E2E', 
              color: 'white',
              border: 'none',
              padding: '1rem 2.5rem',
              margin: '0.5rem',
              fontSize: '1rem',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </Link>

        <Link to="/login">
          <button
            style={{
              backgroundColor: '#2E2E2E',
              color: 'white',
              border: 'none',
              padding: '1rem 2.5rem',
              margin: '0.5rem',
              fontSize: '1rem',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Log In
          </button>
        </Link>
      </div>

      <p style={{ marginTop: '1.5rem', fontSize: '1rem', color: 'white' }}>
        If you haven’t logged in before, please sign up first.
      </p>
    </div>
  );
};

export default WelcomeScreen;
