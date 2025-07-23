const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const analyzeFake = async (articleText) => {
  const res = await openai.chat.completions.create({
    model: "meta-llama/llama-3-70b-instruct",  // ✅ Replace with this working model
    messages: [
      {
        role: "user",
        content: `Is this article fake or real? Reply with explanation.\n\n${articleText}`,
      },
    ],
  });

  return res.choices[0].message.content;
};

module.exports = analyzeFake;
