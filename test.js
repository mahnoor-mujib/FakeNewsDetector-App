console.log(" Test file is running!");

require("dotenv").config();
console.log(" OpenRouter API Key:", process.env.OPENROUTER_API_KEY);

const OpenAI = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function test() {
  try {
    const res = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo", // You can test other models here
      messages: [{ role: "user", content: "Hello" }],
    });

    console.log("OpenRouter Response:", res.choices[0].message.content);
  } catch (err) {
    console.error("OpenRouter Failed:");
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    } else {
      console.error("Message:", err.message);
    }
  }
}

test();
