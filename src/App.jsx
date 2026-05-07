import { useState } from "react";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import { getMovieRecommendations } from "./services/api";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (userInput) => {
    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const data = await getMovieRecommendations(userInput);
      setMovies(data.recommendations);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <MovieForm onSubmit={handleSubmit} loading={loading} />
      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">🎥 Finding the best movies for you...</p>}
      <MovieList movies={movies} />
    </div>
  );
}

export default App;