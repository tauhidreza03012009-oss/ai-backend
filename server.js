import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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

    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    // OpenAI call
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are a helpful AI." },
        { role: "user", content: message }
      ],
    });

    const reply = response.choices[0].message.content;

    res.json({ reply });

  } catch (err) {
    console.error("REAL ERROR:", err);

    res.status(500).json({
      error: err.message || "AI failed"
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});});;
app.get("/", (req, res) => {
  res.send("Server is working");
});
