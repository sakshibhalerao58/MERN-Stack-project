function Search({ setQuery }) {
  return (
    <input
      type="text"
      placeholder="🔍 Search movies..."
      style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
