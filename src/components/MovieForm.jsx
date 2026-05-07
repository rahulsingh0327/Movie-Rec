import { useState } from "react";

const MovieForm = ({ onSubmit, loading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSubmit(input);
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h1>🎬 Movie Recommender</h1>
      <p className="subtitle">Tell us what you're in the mood for</p>
      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. action movies with a strong female lead"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          {loading ? "Finding..." : "Recommend"}
        </button>
      </div>
    </form>
  );
};

export default MovieForm;