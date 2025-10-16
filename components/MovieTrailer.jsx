import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function MovieTrailer({ trailer }) {
  const { theme } = useTheme();
  if (!trailer) return null;

  const styles = {
    container: { margin: "2rem 0", textAlign: "center" },
    iframe: { width: "100%", maxWidth: "800px", height: "450px", border: "none" },
    title: { color: theme === "dark" ? "#F1F1F1" : "#000", marginBottom: "10px", fontSize: "1.5rem" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Official Trailer</h2>
      <iframe
        style={styles.iframe}
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title="Trailer"
        allowFullScreen
      />
    </div>
  );
}
