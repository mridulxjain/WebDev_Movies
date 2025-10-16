import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import MovieHeader from "../../components/MovieHeader";
import MovieTrailer from "../../components/MovieTrailer";
import MovieCast from "../../components/MovieCast";
import MovieCard from "../../components/MovieCard";
import { useTheme } from "../../contexts/ThemeContext";

export default function MovieDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useTheme();

  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;
  const TMDB_BASE = "https://api.themoviedb.org/3";

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);
  const [videos, setVideos] = useState([]);
  const [providers, setProviders] = useState({});
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  const similarRef = useRef(null);

  // Fetch movie data
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    async function fetchData() {
      try {
        const [movieRes, creditsRes, videosRes, providersRes, similarRes] = await Promise.all([
          fetch(`${TMDB_BASE}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`),
          fetch(`${TMDB_BASE}/movie/${id}/credits?api_key=${TMDB_API_KEY}`),
          fetch(`${TMDB_BASE}/movie/${id}/videos?api_key=${TMDB_API_KEY}`),
          fetch(`${TMDB_BASE}/movie/${id}/watch/providers?api_key=${TMDB_API_KEY}`),
          fetch(`${TMDB_BASE}/movie/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
        ]);

        const movieData = await movieRes.json();
        const creditsData = await creditsRes.json();
        const videosData = await videosRes.json();
        const providersData = await providersRes.json();
        const similarData = await similarRes.json();

        setMovie(movieData);
        setCredits(creditsData.cast || []);
        setVideos(videosData.results || []);
        setProviders(providersData.results || {});
        setSimilar(similarData.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // Auto-scroll similar movies
  useEffect(() => {
    const interval = setInterval(() => {
      if (!similarRef.current || similarRef.current.children.length === 0) return;
      const childWidth = similarRef.current.firstChild.offsetWidth + 15;
      similarRef.current.scrollLeft += childWidth;
      if (similarRef.current.scrollLeft + similarRef.current.clientWidth >= similarRef.current.scrollWidth) {
        similarRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [similar]);

  if (loading || !movie) {
    return <h1 style={{ color: theme === "dark" ? "#fff" : "#000", textAlign: "center", marginTop: "2rem" }}>Loading...</h1>;
  }

  const trailer = videos.find(v => v.site === "YouTube" && v.type === "Trailer");
  const providerLogo = providers?.IN?.flatrate?.[0]?.logo_path
    ? `https://image.tmdb.org/t/p/w92${providers.IN.flatrate[0].logo_path}`
    : null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const scrollLeft = () => similarRef.current.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = () => similarRef.current.scrollBy({ left: 200, behavior: "smooth" });

  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "#121212" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        minHeight: "100vh",
      }}
    >
      {/* TOP HERO SECTION WITH BACKDROP */}
      <div
        style={{
          position: "relative",
          height: "60vh",
          overflow: "hidden",
          borderRadius: "0 0 20px 20px",
          marginBottom: "2rem",
        }}
      >
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.4)",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            textAlign: "center",
            flexDirection: "column",
            padding: "1rem",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700 }}>{movie.title}</h1>
          <p style={{ maxWidth: "700px", opacity: 0.8 }}>{movie.tagline || " "}</p>
        </div>
      </div>

      {/* Movie Info Sections */}
      <div style={{ padding: "0 2rem" }}>
        <MovieHeader movie={movie} providerLogo={providerLogo} />
        <MovieTrailer trailer={trailer} />
        <MovieCast cast={credits.slice(0, 10)} />
      </div>

      {/* Similar Movies */}
      {similar.length > 0 && (
        <section style={{ margin: "2rem" }}>
          <h2>Similar Movies</h2>
          <div style={{ position: "relative" }}>
            <button onClick={scrollLeft} style={arrowStyle("left")}>◀</button>
            <div
              ref={similarRef}
              style={{
                display: "flex",
                gap: "15px",
                overflowX: "hidden",
                scrollBehavior: "smooth",
                padding: "10px 0",
              }}
            >
              {similar.map((m) => (
                <MovieCard
                  key={m.id}
                  movieID={m.id}
                  title={m.title}
                  posterUrl={
                    m.poster_path
                      ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                      : "/placeholder.jpg"
                  }
                />
              ))}
            </div>
            <button onClick={scrollRight} style={arrowStyle("right")}>▶</button>
          </div>
        </section>
      )}
    </div>
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
  opacity: 0.9,
});
