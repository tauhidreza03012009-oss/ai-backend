import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log("AI SERVER STARTED");

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI setup
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check
app.get("/", (req, res) => {
  res.send("AI Server is running");
});

// REAL AI CHAT ROUTE
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    console.log("USER MESSAGE:", message);

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    console.log("OPENAI RAW RESPONSE:", completion);

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply) {
      return res.json({ reply: "No AI response received" });
    }

    res.json({ reply });

  } catch (err) {
    console.error("FULL AI ERROR:", err);

    res.status(500).json({
      error: err.message,
      hint: "Check OPENAI_API_KEY in Render environment variables"
    });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
