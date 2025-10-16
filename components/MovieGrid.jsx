import { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import { useTheme } from "../contexts/ThemeContext";

export default function MovieGrid({ title = "Now Playing", category = "now_playing", scrollDirection = "right" }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const { theme } = useTheme();

  const TMDB_BASE = "https://api.themoviedb.org/3";
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;

  // Fetch movies
  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const res = await fetch(`${TMDB_BASE}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [category]);

  // Auto-scroll
  useEffect(() => {
    if (!movies.length) return;
    const interval = setInterval(() => {
      if (!scrollRef.current) return;

      const childWidth = scrollRef.current.firstChild?.offsetWidth + 15 || 220; // include gap
      let direction = scrollDirection === "right" ? 1 : -1;
      scrollRef.current.scrollLeft += childWidth * direction;

      // Loop scroll
      if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth && direction === 1) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
      if (scrollRef.current.scrollLeft <= 0 && direction === -1) {
        scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth, behavior: "smooth" });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [movies, scrollDirection]);

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -220, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 220, behavior: "smooth" });

  return (
    <section style={{ marginBottom: "2rem", position: "relative" }}>
      <h2 style={{ fontFamily: "Oswald, sans-serif", color: theme === "dark" ? "#F1F1F1" : "#000", marginLeft: "15px" }}>{title}</h2>

      <button onClick={scrollLeft} style={arrowStyle("left")}>◀</button>

      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: "15px",
          overflow: "hidden",
          padding: "10px 50px",
          scrollBehavior: "smooth",
        }}
      >
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <MovieCard key={i} placeholder={true} />)
          : movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movieID={movie.id}
                title={movie.title}
                posterUrl={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.jpg"}
              />
            ))}
      </div>

      <button onClick={scrollRight} style={arrowStyle("right")}>▶</button>
    </section>
  );
}

const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: "0px",
  transform: "translateY(-50%)",
  background: "orange",
  color: "#fff",
  border: "none",
  fontSize: "2rem",
  cursor: "pointer",
  zIndex: 5,
  width: "40px",
  height: "80px",
  borderRadius: side === "left" ? "0 8px 8px 0" : "8px 0 0 8px",
  opacity: 0.8,
});
