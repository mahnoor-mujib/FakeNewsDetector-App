const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function listModels() {
  try {
    const models = await openai.models.list();
    console.log(" Models you can use via OpenRouter:");
    models.data.forEach((m, i) => console.log(`${i + 1}. ${m.id}`));
  } catch (err) {
    console.error(" Failed to list models:", err.message);
  }
}

listModels();
