import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

function Watchlist({ watchlist = [] }) {
  const [userRatings, setUserRatings] = useState({});
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    try {
      const savedRatings = JSON.parse(localStorage.getItem("userRatings")) || {};
      setUserRatings(savedRatings);
    } catch {}
  }, []);

  const handleShowWatchlist = () => {
    setShowList(true); // toggle display
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>❤️ My Watchlist</h2>
      <button
        onClick={handleShowWatchlist}
        style={{ padding: "5px 10px", cursor: "pointer", marginBottom: "10px" }}
      >
        📄 Show Saved Movies
      </button>

      {showList && (
        <>
          {(!watchlist || watchlist.length === 0) ? (
            <p>No movies saved yet.</p>
          ) : (
            watchlist.map((movie, index) => (
              <div
                key={movie._id || index}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              >
                <h4>{movie.title || "Untitled"}</h4>
                <p>Genre: {movie.genre || "N/A"}</p>
                <p>Rating: {movie.rating || "N/A"}</p>

                {/* Show user rating */}
                <div>
                  {[1, 2, 3, 4, 5].map(star => (
                    <FaStar
                      key={star}
                      size={16}
                      color={(userRatings[movie._id] || 0) >= star ? "gold" : "#ccc"}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default Watchlist;
