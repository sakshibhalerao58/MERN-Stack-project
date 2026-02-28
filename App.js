import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Movies from "./components/Movies.jsx";
import Watchlist from "./components/Watchlist.jsx";

function App() {
  const [currentTab, setCurrentTab] = useState("movies");
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("watchlist")) || [];
    } catch {
      return [];
    }
  });
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then(res => res.json())
      .then(data => setMovies(data || []))
      .catch(() => setMovies([]));
  }, []);

  return (
    <div style={{ padding: "0 20px" }}>
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} query={query} setQuery={setQuery} />
      {currentTab === "movies" && (
        <Movies
          movies={movies}
          watchlist={watchlist}
          setWatchlist={setWatchlist}
          query={query}
        />
      )}
      {currentTab === "watchlist" && <Watchlist watchlist={watchlist} />}
    </div>
  );
}

export default App;
