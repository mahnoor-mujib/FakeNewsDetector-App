const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const USERS_PATH = path.join(__dirname, '../data/users.json');

if (!fs.existsSync(USERS_PATH)) {
  fs.writeFileSync(USERS_PATH, '[]');
}

// LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required." });
  }

  const users = fs.existsSync(USERS_PATH) ? JSON.parse(fs.readFileSync(USERS_PATH)) : [];

  const existing = users.find(u => u.username === username && u.password === password);

  if (existing) {
    return res.json({ success: true, message: "Login successful." });
  } else {
    return res.status(401).json({ success: false, message: "Invalid username or password." });
  }
});

// SIGNUP
router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }

  const users = JSON.parse(fs.readFileSync(USERS_PATH));
  const exists = users.find(u => u.username === username);

  if (exists) {
    return res.status(409).json({ success: false, message: 'Username already exists' });
  }

  users.push({ username, password });
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));

  return res.json({ success: true, message: 'Signup successful' });
});

module.exports = router;
