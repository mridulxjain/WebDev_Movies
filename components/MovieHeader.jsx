export default function MovieHeader({ movie, providerLogo }) {
  if (!movie) return null;

  const posterURL = movie.poster_path ? `https://image.tmdb.org/t/p/w780${movie.poster_path}` : "/placeholder.jpg";

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      backgroundColor: "rgba(0,0,0,0.7)",
      borderRadius: "12px",
      padding: "2rem",
      gap: "2rem",
      maxWidth: "100vw",
      margin: "0 auto",
    }}>
      <img src={posterURL} alt={movie.title} style={{ width: "300px", borderRadius: "12px" }} />
      <div style={{ flex: 1, minWidth: "300px", color: "#F1F1F1", fontFamily: `'Poppins', sans-serif` }}>
        <h1 style={{ fontSize: "3rem", margin: 0 }}>{movie.title}</h1>
        <h2 style={{ color: "#E0E0E0", fontSize: "1.5rem", marginTop: "10px", marginBottom: "15px" }}>Rating: {movie.vote_average ?? "N/A"}</h2>
        <p style={{ marginTop: "10px", fontWeight: 500 }}>{movie.overview || "No description available."}</p>
        <p>Release Date: {movie.release_date || "N/A"}</p>
        <p>Genres: {movie.genres?.map(g => g.name).join(", ") || "N/A"}</p>
        <p>Status: {movie.status || "N/A"}</p>
        <p>Runtime: {movie.runtime ?? "N/A"} min</p>
        <p>Production Studio: {movie.production_companies?.[0]?.name || "N/A"}</p>

        <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
          <span style={{ fontWeight: 500 }}>Stream On: </span>
          {providerLogo ? <img src={providerLogo} alt="Provider Logo" style={{ width: "50px", height: "50px", marginLeft: "7px", objectFit: "contain" }} /> : <span style={{ marginLeft: "7px" }}>Not Available</span>}
        </div>
      </div>
    </div>
  );
}
