const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const analyzeRoute = require("./routes/analyze");
const authRoutes = require("./routes/auth");
const fakeNewsRoutes = require("./routes/fakenews");
const populateNewsRoute = require("./routes/populateNews");
const userProfileRoute = require("./routes/userProfile");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  console.log(" OpenRouter API KEY:", process.env.OPENROUTER_API_KEY);
}

// Routes
app.use("/api/analyze", analyzeRoute);
app.use("/api", authRoutes);
app.use("/api/fakenews", fakeNewsRoutes); // only fakeNews routes
app.use("/api/populate", populateNewsRoute); // populate separated to avoid conflict
app.use("/api/profile", userProfileRoute); // user-specific liked/disliked/commented posts

app.listen(5000, () => {
  console.log(" Backend running on port 5000");
});
