import Fastify from "fastify";
import cors from "@fastify/cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import { saveRecommendation, getAllRecommendations, initDB } from "./db.js";

dotenv.config();

const fastify = Fastify({ logger: true });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

await fastify.register(cors, { origin: "*" });

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

    await saveRecommendation(user_input, recommendations);

    return reply.send({ recommendations });
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: "Failed to get recommendations" });
  }
});

// GET /history
fastify.get("/history", async (request, reply) => {
  try {
    const history = await getAllRecommendations();
    return reply.send({ history });
  } catch (err) {
    return reply.status(500).send({ error: "Failed to fetch history" });
  }
});

// Health check
fastify.get("/", async (request, reply) => {
  return { status: "Movie Recommender API is running 🎬" };
});

const start = async () => {
  try {
    await initDB();
    await fastify.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();