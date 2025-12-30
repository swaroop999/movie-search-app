import React from "react";

const MovieCard = ({ movie, onClick }) => {
  // TMDB Image Base URL
  const imgBaseURL = "https://image.tmdb.org/t/p/w500";

  return (
    // Pass movie.id instead of imdbID
    <div className="movie" onClick={() => onClick(movie.id)}>
      <div className="movie-image">
        <img
          src={
            movie.poster_path
              ? `${imgBaseURL}${movie.poster_path}`
              : "https://via.placeholder.com/400"
          }
          alt={movie.title}
        />
        <div className="overlay">
          <button className="view-btn">View Details</button>
        </div>
      </div>

      <div className="movie-info">
        {/* TMDB uses 'title' (lowercase) not 'Title' */}
        <h3>{movie.title}</h3>
        <div className="meta-info">
          <span className="year">
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </span>
          <span className="type">Movie</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
