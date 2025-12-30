import React from "react";

const MovieCard = ({ data, onSelect }) => {
  const IMG_PATH = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie" onClick={() => onSelect(data.id)}>
      <div className="movie-image">
        <img
          src={
            data.poster_path
              ? `${IMG_PATH}${data.poster_path}`
              : "https://via.placeholder.com/400"
          }
          alt={data.title}
        />
        <div className="overlay">
          <button className="view-btn">View Details</button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{data.title}</h3>
        <div className="meta-info">
          <span className="year">
            {data.release_date ? data.release_date.split("-")[0] : "N/A"}
          </span>
          <span className="type">Movie</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
