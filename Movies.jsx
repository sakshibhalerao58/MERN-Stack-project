import React, { useState, useMemo, useEffect } from "react";
import { FaStar } from "react-icons/fa";

function Movies({ movies = [], watchlist = [], setWatchlist = () => {}, query = "" }) {
  const [filterGenre, setFilterGenre] = useState("All");
  const [filterRating, setFilterRating] = useState(0);
  const [userRatings, setUserRatings] = useState({});

  useEffect(() => {
    try {
      const savedRatings = JSON.parse(localStorage.getItem("userRatings")) || {};
      setUserRatings(savedRatings);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("userRatings", JSON.stringify(userRatings));
  }, [userRatings]);

  const filteredMovies = useMemo(() => {
    return movies
      .filter(movie => movie?.title?.toLowerCase().includes(query.toLowerCase()))
      .filter(movie => filterGenre === "All" || movie.genre === filterGenre)
      .filter(movie => (movie.rating || 0) >= filterRating);
  }, [movies, query, filterGenre, filterRating]);

  const trendingMovies = useMemo(() => movies.filter(m => m.views && m.views > 120), [movies]);

  const genres = useMemo(() => {
    const g = movies.map(m => m.genre).filter(Boolean);
    return ["All", ...new Set(g)];
  }, [movies]);

  const addToWatchlist = (movie) => {
    if (!watchlist.find(m => m._id === movie._id)) {
      const list = [...watchlist, movie];
      setWatchlist(list);
      try { localStorage.setItem("watchlist", JSON.stringify(list)); } catch {}
      alert("Added to Watchlist");
    } else {
      alert("Already in Watchlist");
    }
  };

  const rateMovie = (movieId, rating) => {
    if (!movieId) return;
    setUserRatings(prev => ({ ...prev, [movieId]: rating }));
  };

  return (
    <div>
      {/* Filters */}
      <div style={{ marginBottom: "10px" }}>
        <label>Genre: </label>
        <select onChange={e => setFilterGenre(e.target.value)}>
          {genres.map((g, i) => <option key={i} value={g}>{g}</option>)}
        </select>

        <label style={{ marginLeft: "10px" }}>Min Rating: </label>
        <select onChange={e => setFilterRating(Number(e.target.value))}>
          {[0,1,2,3,4,5,6,7,8,9,10].map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Trending */}
      {trendingMovies.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h2>🔥 Trending Movies</h2>
          {trendingMovies.map(movie => (
            <span key={movie._id} style={{ marginRight: "10px" }}>{movie.title}</span>
          ))}
        </div>
      )}

      {/* Movie List */}
      <h2>🎥 All Movies</h2>
      {filteredMovies.map(movie => (
        <div key={movie._id || Math.random()} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{movie.title || "Untitled"}</h3>
          <p>Genre: {movie.genre || "N/A"}</p>
          <p>Rating: {movie.rating || "N/A"}</p>

          {/* Star rating */}
          <div>
            {[1,2,3,4,5].map(star => (
              <FaStar
                key={star}
                size={24}
                style={{ marginRight: 4, cursor: "pointer" }}
                color={(userRatings[movie._id] || 0) >= star ? "gold" : "#ccc"}
                onClick={() => rateMovie(movie._id, star)}
              />
            ))}
          </div>

          <button onClick={() => addToWatchlist(movie)} style={{ marginTop: "5px" }}>
            ❤️ Watchlist
          </button>
        </div>
      ))}
    </div>
  );
}

export default Movies;
