import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-list">
      <h2>🍿 Recommended for You</h2>
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} index={index} />
      ))}
    </div>
  );
};

export default MovieList;