const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const USERS_PATH = path.join(__dirname, '../data/users.json');
const POSTS_PATH = path.join(__dirname, '../data/posts.json');

router.get('/:username', (req, res) => {
  const { username } = req.params;
  const users = JSON.parse(fs.readFileSync(USERS_PATH));
  const posts = JSON.parse(fs.readFileSync(POSTS_PATH));

  const interactions = users.filter(u => u.username === username);
  const result = interactions.map(({ postId, action }) => {
    const post = posts.find(p => p.id === postId);
    return post ? { ...post, userAction: action } : null;
  }).filter(Boolean);

  res.json({ success: true, posts: result });
});

module.exports = router;
