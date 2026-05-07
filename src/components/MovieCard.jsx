const MovieCard = ({ movie, index }) => {
  return (
    <div className="movie-card">
      <div className="movie-number">{index + 1}</div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="movie-year">{movie.year}</p>
        <p className="movie-reason">{movie.reason}</p>
      </div>
    </div>
  );
};

export default MovieCard;