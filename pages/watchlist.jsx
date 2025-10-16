import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useTheme } from "../contexts/ThemeContext";

export default function WatchlistPage() {
  const { theme } = useTheme();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setWatchlist(saved);
  }, []);

  const removeFromWatchlist = (movieID) => {
    const updated = watchlist.filter((movie) => movie.movieID !== movieID);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: theme === "dark" ? "#121212" : "#f9f9f9",
      color: theme === "dark" ? "#fff" : "#000",
      padding: "20px",
      transition: "background 0.3s ease",
    },
    heading: {
      fontSize: "2rem",
      fontFamily: "Oswald, sans-serif",
      marginBottom: "20px",
      textAlign: "center",
    },
    grid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
    },
    empty: {
      textAlign: "center",
      fontSize: "1.2rem",
      marginTop: "50px",
      opacity: 0.7,
    },
    removeBtn: {
      marginTop: "8px",
      background: theme === "dark" ? "#444" : "#ddd",
      border: "none",
      borderRadius: "6px",
      padding: "6px 10px",
      cursor: "pointer",
      fontSize: "0.9rem",
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Your Watchlist</h1>

      {watchlist.length === 0 ? (
        <div style={styles.empty}>No movies in your watchlist yet.</div>
      ) : (
        <div style={styles.grid}>
          {watchlist.map((movie) => (
            <div key={movie.movieID} style={{ textAlign: "center" }}>
              <MovieCard
                movieID={movie.movieID}
                title={movie.title}
                posterUrl={movie.posterUrl}
              />
              <button
                style={styles.removeBtn}
                onClick={() => removeFromWatchlist(movie.movieID)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
