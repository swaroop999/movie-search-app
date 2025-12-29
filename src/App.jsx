import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import searchIcon from './search.svg';

const API_URL = 'https://www.omdbapi.com?apikey=11ddaa7d';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchMovieDetail = async (id) => {
    try {
      const response = await fetch(`${API_URL}&i=${id}`);
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };

  useEffect(() => {
    searchMovies('Avengers');
  }, []);

  return (
    <>
      {/* 1. Main App Container (Search & Grid) */}
      <div className="app">
        <h1>CINESEARCH</h1>

        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchMovies(searchTerm)}
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
                key={movie.imdbID} 
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
      {/* 2. CLOSE THE APP DIV HERE to release the trap */}


      {/* 3. The Modal is now a sibling, completely free to float on top */}
      {selectedMovie && (
        <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedMovie(null)}>
              &times;
            </button>
            
            {/* LEFT SIDE: POSTER */}
            <img 
              className="modal-poster"
              src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'https://via.placeholder.com/400'} 
              alt={selectedMovie.Title} 
            />

            {/* RIGHT SIDE: INFO */}
            <div className="modal-body">
              <div className="modal-info">
                <h2>{selectedMovie.Title}</h2>
                <div className="modal-meta">
                  <span>{selectedMovie.Year}</span>
                  <span>•</span>
                  <span>{selectedMovie.Runtime}</span>
                  <span>•</span>
                  <span>⭐ {selectedMovie.imdbRating}</span>
                </div>
                <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
                <p><strong>Director:</strong> {selectedMovie.Director}</p>
                <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
              </div>

              <div className="modal-plot">
                <p>{selectedMovie.Plot}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;