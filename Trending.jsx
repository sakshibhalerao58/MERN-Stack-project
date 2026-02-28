function Trending({ movies }) {
  if (!movies || movies.length === 0) return null;

  const trending = movies
    .filter(movie => movie.views > 120)
    .slice(0, 6);

  return (
    <div style={{ margin: "20px 0" }}>
      <h2 style={{ marginBottom: "15px" }}>🔥 Trending Movies</h2>

      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "20px",
          padding: 0,
          margin: 0,
          flexWrap: "wrap"
        }}
      >
        {trending.map(movie => (
          <li
            key={movie._id}
            style={{
              width: "180px",
              background: "#1c1c1c",
              color: "#fff",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center"
            }}
          >
            <img
              src={movie.image}
              alt={movie.title}
              style={{
                width: "100%",
                height: "240px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />

            <h4 style={{ margin: "10px 0 5px" }}>
              {movie.title}
            </h4>

            <p style={{ margin: 0, color: "gold" }}>
              ⭐ {movie.rating}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trending;
