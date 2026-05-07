import Fastify from "fastify";
import cors from "@fastify/cors";
import staticPlugin from "@fastify/static";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { saveRecommendation, getAllRecommendations, initDB } from "./db.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fastify = Fastify({ logger: true });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

await fastify.register(cors, { origin: "*" });

// Serve React frontend static files from dist/
await fastify.register(staticPlugin, {
  root: path.join(__dirname, "../dist"),
  prefix: "/",
});

// POST /recommend
fastify.post("/recommend", async (request, reply) => {
  const { user_input } = request.body;

  if (!user_input || user_input.trim() === "") {
    return reply.status(400).send({ error: "user_input is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a movie recommendation assistant. 
          When given a user preference, return exactly 3-5 movie recommendations as a JSON array.
          Each movie must have: title (string), year (string), reason (string).
          Respond ONLY with valid JSON array, no extra text.
          Example: [{"title":"Movie Name","year":"2020","reason":"Why it matches"}]`,
        },
        {
          role: "user",
          content: `Recommend movies for: ${user_input}`,
        },
      ],
      temperature: 0.7,
    });

    const raw = completion.choices[0].message.content.trim();
    const recommendations = JSON.parse(raw);

    saveRecommendation(user_input, recommendations);

    return reply.send({ recommendations });
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: "Failed to get recommendations" });
  }
});

// GET /history
fastify.get("/history", async (request, reply) => {
  try {
    const history = getAllRecommendations();
    return reply.send({ history });
  } catch (err) {
    return reply.status(500).send({ error: "Failed to fetch history" });
  }
});

// Catch-all — serve React app for any unknown route (SPA support)
fastify.setNotFoundHandler((request, reply) => {
  reply.sendFile("index.html");
});

const start = async () => {
  try {
    initDB();
    await fastify.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
    console.log("🎬 Server running at http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
