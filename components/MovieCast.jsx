import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function MovieCast({ cast }) {
  const { theme } = useTheme();
  if (!cast || cast.length === 0) return null;

  const styles = {
    container: { margin: "2rem 0" },
    title: { color: theme === "dark" ? "#F1F1F1" : "#000", marginBottom: "15px", fontSize: "1.5rem" },
    scroll: { display: "flex", overflowX: "auto", gap: "15px", paddingBottom: "10px" },
    card: { minWidth: "150px", textAlign: "center", color: theme === "dark" ? "#FFF" : "#000" },
    img: { width: "150px", height: "225px", objectFit: "cover", borderRadius: "10px" },
    name: { marginTop: "8px", fontWeight: 500 },
    character: { fontSize: "0.9rem", color: theme === "dark" ? "#ccc" : "#555" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cast</h2>
      <div style={styles.scroll}>
        {cast.slice(0, 8).map((member) => (
          <div key={member.id} style={styles.card}>
            <img
              src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : "/placeholder.jpg"}
              alt={member.name}
              style={styles.img}
            />
            <div style={styles.name}>{member.name}</div>
            <div style={styles.character}>{member.character}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
