import { useState } from "react";
import { useRouter } from "next/router";

export default function MovieCard({ movieID, title, posterUrl, placeholder = false }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!placeholder && movieID) router.push(`/movies/${movieID}`);
  };

  const styles = {
    container: { width: "200px", cursor: placeholder ? "default" : "pointer", flexShrink: 0 },
    poster: {
      width: "200px",
      height: "300px",
      borderRadius: "12px",
      objectFit: "cover",
      backgroundColor: "#2A2A2A",
      transform: isHovered ? "scale(1.05)" : "scale(1)",
      transition: "transform 0.3s ease",
    },
    title: {
      marginTop: "10px",
      fontSize: "1.1rem",
      fontFamily: "Oswald, sans-serif",
      textAlign: "center",
      color: "#eee",
    },
  };

  if (placeholder) {
    return (
      <div style={styles.container}>
        <div style={styles.poster} />
        <div style={{ height: "16px", marginTop: "10px", background: "#3a3a3a", borderRadius: "6px" }} />
      </div>
    );
  }

  return (
    <div
      style={styles.container}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {posterUrl ? <img src={posterUrl} alt={title} style={styles.poster} /> : <div style={styles.poster} />}
      <div style={styles.title}>{title || "Untitled"}</div>
    </div>
  );
}
