const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const POSTS_PATH = path.join(__dirname, '../data/posts.json');
const USERS_PATH = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
  const data = fs.existsSync(POSTS_PATH) ? JSON.parse(fs.readFileSync(POSTS_PATH)) : [];
  const limit = parseInt(req.query.limit) || 10;
  res.json(data.slice(-limit).reverse());
});

router.post('/like', (req, res) => {
  const { id, username } = req.body;
  const posts = JSON.parse(fs.readFileSync(POSTS_PATH));
  const users = JSON.parse(fs.readFileSync(USERS_PATH));

  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const existing = users.find(u => u.username === username && u.postId === id);
  if (existing) {
    if (existing.action === 'like') {
      return res.status(400).json({ message: 'Already liked' });
    } else {
      post.likes += 1;
      post.dislikes -= 1;
      existing.action = 'like';
    }
  } else {
    post.likes += 1;
    users.push({ username, postId: id, action: 'like' });
  }

  fs.writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2));
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
  res.json({ success: true });
});

router.post('/dislike', (req, res) => {
  const { id, username } = req.body;
  const posts = JSON.parse(fs.readFileSync(POSTS_PATH));
  const users = JSON.parse(fs.readFileSync(USERS_PATH));

  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const existing = users.find(u => u.username === username && u.postId === id);
  if (existing) {
    if (existing.action === 'dislike') {
      return res.status(400).json({ message: 'Already disliked' });
    } else {
      post.dislikes += 1;
      post.likes -= 1;
      existing.action = 'dislike';
    }
  } else {
    post.dislikes += 1;
    users.push({ username, postId: id, action: 'dislike' });
  }

  fs.writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2));
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
  res.json({ success: true });
});

router.post('/comment', (req, res) => {
  const { id, comment, username } = req.body;
  const posts = JSON.parse(fs.readFileSync(POSTS_PATH));

  const post = posts.find(p => p.id === id);
  if (!post || !comment) {
    return res.status(400).json({ message: 'Invalid comment or post ID' });
  }

  const commentEntry = `${username}: ${comment}`;
  post.comments.push(commentEntry);

  fs.writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2));
  res.json({ success: true });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const { username } = req.query;

  if (username !== 'admin') {
    return res.status(403).json({ success: false, message: 'Only admin can delete' });
  }

  let data = JSON.parse(fs.readFileSync(POSTS_PATH));
  const updated = data.filter(post => post.id !== parseInt(id));
  if (updated.length === data.length) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }
  fs.writeFileSync(POSTS_PATH, JSON.stringify(updated, null, 2));
  res.json({ success: true });
});

module.exports = router;
