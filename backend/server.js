
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔍 Scam Detection Logic
function detectScam(text) {
  const scamWords = [
    "win money",
    "click link",
    "urgent",
    "lottery",
    "free cash",
    "offer",
    "prize",
    "act now",
    "limited time"
  ];

  let score = 0;

  scamWords.forEach(word => {
    if (text.toLowerCase().includes(word)) {
      score++;
    }
  });

  if (score >= 2) {
    return {
      result: "Fake/Scam ❌",
      confidence: (score * 20) + "%"
    };
  } else {
    return {
      result: "Genuine ✅",
      confidence: (80 - score * 10) + "%"
    };
  }
}

// API
app.post("/check", (req, res) => {
  const { text } = req.body;
  const output = detectScam(text);
  res.json(output);
});

// Server Start
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});