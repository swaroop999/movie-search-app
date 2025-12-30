import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import searchIcon from "./search.svg";

// TODO: Move this to .env later
const API_KEY = "244b83e323bde6f3b54f61df522e64b1";
const API_URL = "https://api.themoviedb.org/3";

const App = () => {
  const [content, setContent] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const search = async (q) => {
    if (!q) return;

    // console.log("Searching for:", q);
    const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${q}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.results) {
      setContent(data.results);
    }
  };

  const openDetails = async (id) => {
    const url = `${API_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`;
    const res = await fetch(url);
    const data = await res.json();
    setSelected(data);
  };

  useEffect(() => {
    search("Avengers");
  }, []);

  return (
    <>
      <div className="app">
        <h1
          onClick={() => {
            setQuery("");
            search("Avengers");
            setSelected(null);
          }}
          style={{ cursor: "pointer" }}
        >
          CINESEARCH
        </h1>

        <div className="search">
          <input
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search(query)}
          />
          <img src={searchIcon} alt="search" onClick={() => search(query)} />
        </div>

        {content?.length > 0 ? (
          <div className="container">
            {content.map((item) => (
              <MovieCard key={item.id} data={item} onSelect={openDetails} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>
              &times;
            </button>

            <img
              className="modal-poster"
              src={
                selected.poster_path
                  ? `https://image.tmdb.org/t/p/w500${selected.poster_path}`
                  : "https://via.placeholder.com/400"
              }
              alt={selected.title}
            />

            <div className="modal-body">
              <div className="modal-info">
                <h2>{selected.title}</h2>
                <div className="modal-meta">
                  <span>
                    {selected.release_date
                      ? selected.release_date.split("-")[0]
                      : "N/A"}
                  </span>
                  <span>•</span>
                  <span>
                    {selected.runtime ? `${selected.runtime} min` : "N/A"}
                  </span>
                  <span>•</span>
                  <span>
                    ⭐{" "}
                    {selected.vote_average
                      ? selected.vote_average.toFixed(1)
                      : "N/A"}
                  </span>
                </div>

                <p>
                  <strong>Genre:</strong>{" "}
                  {selected.genres?.map((g) => g.name).join(", ")}
                </p>
                <p>
                  <strong>Director:</strong>{" "}
                  {selected.credits?.crew?.find((p) => p.job === "Director")
                    ?.name || "N/A"}
                </p>
              </div>

              <div className="modal-plot">
                <p>{selected.overview}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
