import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import searchIcon from "./search.svg";

// ---------------------------------------------------------
// 🔑 PASTE YOUR TMDB API KEY HERE
// ---------------------------------------------------------
const API_KEY = "244b83e323bde6f3b54f61df522e64b1";
const API_URL = "https://api.themoviedb.org/3";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  // 1. Search Function (TMDB)
  const searchMovies = async (title) => {
    if (!title) return;
    try {
      const response = await fetch(
        `${API_URL}/search/movie?api_key=${API_KEY}&query=${title}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // 2. Details Function (TMDB)
  // We need a second call to get extra details like "Runtime" and "Director"
  // because the search result doesn't give everything.
  const fetchMovieDetail = async (id) => {
    try {
      // Get core details
      const response = await fetch(
        `${API_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
      );
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };

  useEffect(() => {
    searchMovies("Avengers");
  }, []);

  return (
    <>
      <div className="app">
        <h1>CINESEARCH</h1>

        <div className="search">
          <input
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchMovies(searchTerm)}
          />
          <img
            src={searchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
                onClick={fetchMovieDetail}
              />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>

      {/* 3. Modal Popup */}
      {selectedMovie && (
        <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedMovie(null)}
            >
              &times;
            </button>

            {/* POSTER */}
            <img
              className="modal-poster"
              src={
                selectedMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                  : "https://via.placeholder.com/400"
              }
              alt={selectedMovie.title}
            />

            {/* INFO */}
            <div className="modal-body">
              <div className="modal-info">
                <h2>{selectedMovie.title}</h2>
                <div className="modal-meta">
                  {/* TMDB Date is YYYY-MM-DD, let's take just the Year */}
                  <span>
                    {selectedMovie.release_date
                      ? selectedMovie.release_date.split("-")[0]
                      : "N/A"}
                  </span>
                  <span>•</span>
                  {/* Runtime is in minutes */}
                  <span>
                    {selectedMovie.runtime
                      ? `${selectedMovie.runtime} min`
                      : "N/A"}
                  </span>
                  <span>•</span>
                  <span>
                    ⭐{" "}
                    {selectedMovie.vote_average
                      ? selectedMovie.vote_average.toFixed(1)
                      : "N/A"}
                  </span>
                </div>

                {/* Genres are an array in TMDB */}
                <p>
                  <strong>Genre:</strong>{" "}
                  {selectedMovie.genres?.map((g) => g.name).join(", ")}
                </p>

                {/* Director is inside "credits.crew" */}
                <p>
                  <strong>Director:</strong>{" "}
                  {selectedMovie.credits?.crew?.find(
                    (person) => person.job === "Director"
                  )?.name || "N/A"}
                </p>
              </div>

              <div className="modal-plot">
                <p>{selectedMovie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
