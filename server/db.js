import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Works both locally and in Docker
const dbPath = process.env.DB_PATH || path.join(__dirname, "movies.db");

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS recommendations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_input TEXT NOT NULL,
    recommended_movies TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export const initDB = () => {
  console.log("✅ SQLite database initialized at", dbPath);
};

export const saveRecommendation = (userInput, movies) => {
  const stmt = db.prepare(`
    INSERT INTO recommendations (user_input, recommended_movies)
    VALUES (?, ?)
  `);
  stmt.run(userInput, JSON.stringify(movies));
};

export const getAllRecommendations = () => {
  const stmt = db.prepare(
    `SELECT * FROM recommendations ORDER BY timestamp DESC`
  );
  return stmt.all();
};

export default db;
