import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful personal AI." },
        { role: "user", content: userMessage }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
  console.error("REAL ERROR:", err);
  res.status(500).json({ error: err.message });
}
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});;
app.get("/", (req, res) => {
  res.send("Server is working");
});
