# 🎬 Movie Recommender

An AI-powered movie recommendation web app. Tell it what you're in the mood for and it suggests 3–5 movies tailored to your taste — powered by OpenAI, built with React + Fastify, and containerized with Docker.

---

## ✨ Features

- 🤖 AI-powered recommendations via OpenAI GPT-3.5
- 🎨 Clean, dark-themed UI
- 💾 SQLite database stores all past queries and results
- 🐳 Fully Dockerized — one command to run everything
- ⚡ Monolithic architecture — Fastify serves both the API and the React frontend

---

## 🛠️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 19, Vite                    |
| Backend   | Node.js, Fastify                  |
| AI        | OpenAI API (GPT-3.5-turbo)        |
| Database  | SQLite via better-sqlite3         |
| Container | Docker + Docker Compose           |

---

## 📁 Project Structure

```
movie-recommender/
├── src/                        # React frontend source
│   ├── components/
│   │   ├── MovieCard.jsx       # Individual movie card
│   │   ├── MovieForm.jsx       # User input form
│   │   └── MovieList.jsx       # List of recommendations
│   ├── services/
│   │   └── api.js              # API calls to backend
│   ├── App.jsx
│   └── App.css
├── server/
│   ├── index.js                # Fastify server + API routes
│   ├── db.js                   # SQLite database setup
│   ├── Dockerfile              # Docker build instructions
│   └── package.json
├── docker-compose.yml          # Docker Compose config
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Running Locally

### Prerequisites

Make sure you have these installed:
- [Node.js v22+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- An [OpenAI API key](https://platform.openai.com/api-keys)

---

### Option A — Run with Docker (Recommended)

**1. Clone the repo**
```bash
git clone https://github.com/rahulsingh0327/Movie-Rec.git
cd Movie-Rec
```

**2. Create a `.env` file in the root folder**
```env
OPENAI_API_KEY=your_openai_api_key_here
```

**3. Start the app**
```bash
docker-compose up --build
```

**4. Open your browser**
```
http://localhost:3000
```

That's it. The frontend and backend both run on port 3000.

---

### Option B — Run Without Docker

**1. Clone the repo**
```bash
git clone https://github.com/rahulsingh0327/Movie-Rec.git
cd Movie-Rec
```

**2. Install root dependencies (React + Vite)**
```bash
npm install
```

**3. Install server dependencies**
```bash
cd server
npm install
cd ..
```

**4. Create `server/.env`**
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
DB_PATH=./movies.db
```

**5. Build the React frontend**
```bash
npm run build
```

**6. Start the server**
```bash
node server/index.js
```

**7. Open your browser**
```
http://localhost:3000
```

---

## 🔌 API Endpoints

| Method | Endpoint     | Description                          |
|--------|--------------|--------------------------------------|
| POST   | `/recommend` | Get AI movie recommendations         |
| GET    | `/history`   | Fetch all past recommendations       |
| GET    | `/`          | Health check / serves frontend       |

### POST `/recommend` — Example Request
```json
{
  "user_input": "sci-fi movies with mind-bending plot twists"
}
```

### POST `/recommend` — Example Response
```json
{
  "recommendations": [
    {
      "title": "Inception",
      "year": "2010",
      "reason": "A heist thriller set within dreams that constantly challenges your perception of reality."
    },
    {
      "title": "Interstellar",
      "year": "2014",
      "reason": "A visually stunning space epic with a deeply emotional and intellectually complex narrative."
    }
  ]
}
```

---

## 🗄️ Database Schema

SQLite table: `recommendations`

| Column               | Type     | Description                        |
|----------------------|----------|------------------------------------|
| id                   | INTEGER  | Auto-incremented primary key       |
| user_input           | TEXT     | The user's movie preference query  |
| recommended_movies   | TEXT     | JSON array of recommendations      |
| timestamp            | DATETIME | When the query was made            |

---

## 🌍 Deployment

The app is deployed as a single monolithic service on **Render** using Docker.

- Frontend and backend are served from the same container on the same URL
- SQLite database persists on Render's disk storage
- OpenAI API key is set as a secret environment variable on Render

**Live URL:** `https://movie-rec-an3t.onrender.com`

---

## ⚙️ Environment Variables

| Variable         | Required | Description                         |
|------------------|----------|-------------------------------------|
| `OPENAI_API_KEY` | ✅ Yes   | Your OpenAI API key                 |
| `PORT`           | ❌ No    | Server port (defaults to 3000)      |
| `DB_PATH`        | ❌ No    | Path to SQLite file (has a default) |

---

## 📝 License

MIT
