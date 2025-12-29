import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie" onClick={() => onClick(movie.imdbID)}>
      
      {/* Image Area */}
      <div className="movie-image">
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} 
          alt={movie.Title} 
        />
        <div className="overlay">
          <button className="view-btn">View Details</button>
        </div>
      </div>

      {/* Info Area */}
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <div className="meta-info">
          <span className="year">{movie.Year}</span>
          <span className="type">{movie.Type}</span>
        </div>
      </div>
      
    </div>
  );
}

export default MovieCard;