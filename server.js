import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log("NEW VERSION DEPLOYED");

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI setup
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Chat route
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Temporary echo response (safe fallback)
    res.json({
      reply: "Echo: " + message
    });

    // If you later enable OpenAI:
    // const completion = await client.chat.completions.create({
    //   model: "gpt-4o-mini",
    //   messages: [{ role: "user", content: message }]
    // });

    // res.json({
    //   reply: completion.choices[0].message.content
    // });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
