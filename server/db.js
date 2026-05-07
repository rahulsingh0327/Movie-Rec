import Database from "better-sqlite3";

const db = new Database("/app/data/movies.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS recommendations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_input TEXT NOT NULL,
    recommended_movies TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export const saveRecommendation = (userInput, movies) => {
  const stmt = db.prepare(`
    INSERT INTO recommendations (user_input, recommended_movies)
    VALUES (?, ?)
  `);
  stmt.run(userInput, JSON.stringify(movies));
};

export const getAllRecommendations = () => {
  const stmt = db.prepare(`SELECT * FROM recommendations ORDER BY timestamp DESC`);
  return stmt.all();
};

export default db;