const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const POSTS_PATH = path.join(__dirname, '../data/posts.json');

router.post('/', async (req, res) => {
  const { articleText } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openrouter/cypher-alpha:free',
        messages: [
          {
            role: 'system',
            content: 'You are a fact-checking assistant. Respond whether the article is likely fake or real, and why.'
          },
          {
            role: 'user',
            content: articleText
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;

    // ✅ Save if fake
    if (aiResponse.toLowerCase().includes("fake")) {
      const post = {
        id: Date.now(),
        title: articleText.slice(0, 50) + '...',
        content: articleText,
        result: aiResponse,
        likes: 0,
        dislikes: 0,
        comments: []
      };

      const data = fs.existsSync(POSTS_PATH) ? JSON.parse(fs.readFileSync(POSTS_PATH)) : [];
      data.push(post);
      fs.writeFileSync(POSTS_PATH, JSON.stringify(data, null, 2));
    }

    res.json({ result: aiResponse });

  } catch (err) {
    console.error('🛑 OpenRouter Error:', err.message);
    res.status(500).json({ error: 'AI analysis failed.', message: err.message });
  }
});

module.exports = router;

