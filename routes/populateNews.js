const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const analyzeFake = require('./analyzeHelper');

const POSTS_PATH = path.join(__dirname, '../data/posts.json');

router.get('/populate', async (req, res) => {
  try {
    const gnewsURL = `https://gnews.io/api/v4/top-headlines?token=${process.env.GNEWS_API_KEY}&lang=en`;
    const response = await axios.get(gnewsURL);
    const articles = response.data.articles;

    let newFakePosts = [];

    for (const article of articles) {
      const text = `${article.title}\n${article.description || ''}`;
      const result = await analyzeFake(text);

      if (result.toLowerCase().includes("fake")) {
        const post = {
          id: Date.now() + Math.floor(Math.random() * 10000),
          title: article.title,
          content: article.description || '',
          result,
          likes: 0,
          dislikes: 0,
          comments: [],
        };
        newFakePosts.push(post);
      }
    }

    fs.writeFileSync(POSTS_PATH, JSON.stringify(newFakePosts, null, 2));
    res.json({ success: true, added: newFakePosts.length });

  } catch (err) {
    console.error("Failed to fetch/analyze:", err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch or analyze', error: err.message });
  }
});

module.exports = router;