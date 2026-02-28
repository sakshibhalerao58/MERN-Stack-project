import React from "react";

function Navbar({ currentTab, setCurrentTab, query, setQuery }) {
  const linkStyle = (tab) => ({
    marginRight: "20px",
    padding: "5px 10px",
    cursor: "pointer",
    fontWeight: currentTab === tab ? "bold" : "normal",
    borderBottom: currentTab === tab ? "2px solid gold" : "none"
  });

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      borderBottom: "1px solid #ccc",
      marginBottom: "20px"
    }}>
      <h2 style={{ margin: 0 }}>🎬 Movie Recommendation</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={linkStyle("movies")} onClick={() => setCurrentTab("movies")}>Movies</span>
        <span style={linkStyle("watchlist")} onClick={() => setCurrentTab("watchlist")}>Watchlist</span>
        {currentTab === "movies" && (
          <input
            type="text"
            placeholder="🔍 Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ marginLeft: "20px", padding: "5px 10px" }}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
