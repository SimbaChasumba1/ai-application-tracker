import express from "express";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const port = 3000;

app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Endpoint to handle AI text generation
app.post("/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = response.choices?.[0]?.message?.content ?? "No response generated.";

    return res.status(200).json({ response: responseText });
  } catch (error) {
    console.error("Error generating text:", error);
    return res.status(500).json({ error: "Failed to generate text. Try again." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});