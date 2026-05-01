import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
console.log("NEW VERSION DEPLOYED");
// Middleware (REQUIRED)
app.use(cors());
app.use(express.json());

// OpenAI setup
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check route (for testing in browser)
app.get("/", (req, res) => {
  res.send("Server is running");
});

// MAIN CHAT ROUTE
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    res.json({
      reply: "Echo: " + message
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});});;
app.get("/", (req, res) => {
  res.send("Server is working");
});
