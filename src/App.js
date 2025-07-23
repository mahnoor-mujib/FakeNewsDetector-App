import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import WelcomeScreen from './components/WelcomeScreen';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AnalyzePage from './components/AnalyzePage';
import FakeNewsFeed from './components/FakeNewsFeed';
import Layout from './components/Layout';
import UserProfile from './components/UserProfile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/app"
          element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}
        >
          <Route path="analyze" element={<AnalyzePage />} />
          <Route path="feed" element={<FakeNewsFeed />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
