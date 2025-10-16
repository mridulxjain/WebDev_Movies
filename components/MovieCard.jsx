import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from "../contexts/ThemeContext";

export default function MovieCard({ movieID, title, posterUrl, placeholder = false }) {
  const router = useRouter();
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setWatchlist(saved);
    setIsInWatchlist(saved.some((item) => item.movieID === movieID));
  }, [movieID]);

  // Add or remove from watchlist
  const toggleWatchlist = (e) => {
    e.stopPropagation(); // Prevent navigating when clicking star
    const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
    let updatedList;

    if (isInWatchlist) {
      updatedList = saved.filter((item) => item.movieID !== movieID);
    } else {
      const newMovie = { movieID, title, posterUrl };
      updatedList = [...saved, newMovie];
    }

    localStorage.setItem("watchlist", JSON.stringify(updatedList));
    setWatchlist(updatedList);
    setIsInWatchlist(!isInWatchlist);
  };

  const handleClick = () => {
    if (!placeholder && movieID) router.push(`/movies/${movieID}`);
  };

  const styles = {
    container: {
      width: "200px",
      cursor: placeholder ? "default" : "pointer",
      flexShrink: 0,
      position: "relative",
      transition: "transform 0.3s ease",
    },
    poster: {
      width: "200px",
      height: "300px",
      borderRadius: "12px",
      objectFit: "cover",
      backgroundColor: theme === "dark" ? "#2A2A2A" : "#ddd",
      transform: isHovered ? "scale(1.05)" : "scale(1)",
      transition: "transform 0.3s ease",
    },
    title: {
      marginTop: "10px",
      fontSize: "1.1rem",
      fontFamily: "Oswald, sans-serif",
      textAlign: "center",
      color: theme === "dark" ? "#eee" : "#000",
    },
    watchlistIcon: {
      position: "absolute",
      top: "8px",
      right: "8px",
      fontSize: "1.6rem",
      color: isInWatchlist ? "gold" : theme === "dark" ? "#bbb" : "#444",
      textShadow: "0 0 6px rgba(0,0,0,0.5)",
      cursor: "pointer",
      zIndex: 10,
      transition: "transform 0.2s",
    },
  };

  if (placeholder)
    return (
      <div style={styles.container}>
        <div style={styles.poster} />
        <div
          style={{
            height: "16px",
            marginTop: "10px",
            background: theme === "dark" ? "#3a3a3a" : "#ccc",
            borderRadius: "6px",
          }}
        />
      </div>
    );

  return (
    <div
      style={styles.container}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.watchlistIcon} onClick={toggleWatchlist}>
        {isInWatchlist ? "⭐" : "☆"}
      </div>

      {posterUrl ? (
        <img src={posterUrl} alt={title} style={styles.poster} />
      ) : (
        <div
          style={{
            ...styles.poster,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme === "dark" ? "#999" : "#333",
            fontSize: "0.9rem",
          }}
        >
          No Image
        </div>
      )}

      <div style={styles.title}>{title || "Untitled"}</div>
    </div>
  );
}
