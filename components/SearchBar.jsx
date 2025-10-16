import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

export default function SearchBar({ isFocused, onFocus, onBlur }) {
  const router = useRouter();
  const { theme } = useTheme();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const cache = useRef({});
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;

  const controls = useAnimation();

  // Load recent searches
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(saved);
  }, []);

  // Close dropdown on click outside + stop/fade glow
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        // Smooth fade out glow
        controls.start({ boxShadow: "0 0 4px rgba(0,0,0,0.1)", transition: { duration: 0.3 } });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [controls]);

  // Fetch results
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      if (cache.current[query]) {
        setResults(cache.current[query]);
      } else {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
              query
            )}&language=en-US&page=1`
          );
          const data = await res.json();
          cache.current[query] = data.results || [];
          setResults(data.results || []);
        } catch (err) {
          console.error(err);
        }
      }
      setShowDropdown(true);
    }, 80);
    return () => clearTimeout(timer);
  }, [query]);

  // Save recent searches
  const saveRecentSearch = (text) => {
    if (!text.trim()) return;
    const updated = [text, ...recentSearches.filter((s) => s !== text)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // Safe navigation
  const handleSelect = (item) => {
    saveRecentSearch(item.title || item.name || query);
    setShowDropdown(false);

    const validRoutes = ["movie", "tv", "person"];
    if (!validRoutes.includes(item.media_type)) return;

    const routeMap = {
      movie: "/movies",
      tv: "/tv",
      person: "/person",
    };

    router.push(`${routeMap[item.media_type]}/${item.id}`);
  };

  const styles = {
    container: { position: "relative", width: "100%", maxWidth: "600px" },
    input: {
      width: "100%",
      height: "45px",
      padding: "0.5rem 1.2rem",
      fontSize: "1rem",
      borderRadius: "25px",
      border: "2px solid",
      borderColor: theme === "dark" ? "#555" : "#ccc",
      backgroundColor: theme === "dark" ? "#1F1F1F" : "#fff",
      color: theme === "dark" ? "#eee" : "#000",
      outline: "none",
      transition: "all 0.2s ease",
      boxShadow: "0 0 4px rgba(0,0,0,0.1)", // initial shadow
    },
    clearBtn: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "transparent",
      border: "none",
      color: theme === "dark" ? "#eee" : "#000",
      fontSize: "1.1rem",
      cursor: "pointer",
    },
    suggestion: {
      padding: "10px 15px",
      cursor: "pointer",
      transition: "background 0.1s ease, transform 0.1s ease",
    },
    suggestionHover: {
      backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
    },
  };

  return (
    <div style={styles.container} ref={dropdownRef}>
      <motion.input
        style={styles.input}
        placeholder="Search movies, TV shows or actors"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          setShowDropdown(true);
          // Start pulsing glow when focused
          controls.start({
            boxShadow: [
              "0 0 12px 2px rgba(255,102,0,0.8)",
              "0 0 18px 4px rgba(255,102,0,0.6)",
              "0 0 12px 2px rgba(255,102,0,0.8)",
            ],
            transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
          });
        }}
        onBlur={onBlur}
        animate={controls}
      />
      {query && (
        <button style={styles.clearBtn} onClick={() => setQuery("")}>
          ×
        </button>
      )}

      <AnimatePresence>
        {showDropdown && (results.length > 0 || recentSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "105%",
              left: 0,
              right: 0,
              backgroundColor: theme === "dark" ? "#1F1F1F" : "#fff",
              color: theme === "dark" ? "#eee" : "#000",
              maxHeight: "300px",
              overflowY: "auto",
              borderRadius: "0 0 12px 12px",
              marginTop: "5px",
              zIndex: 5,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            {query && results.length > 0
              ? results.map((item) => (
                  <motion.div
                    key={item.id + item.media_type}
                    style={styles.suggestion}
                    whileHover={{
                      backgroundColor: styles.suggestionHover.backgroundColor,
                      scale: 1.02,
                    }}
                    onMouseDown={() => handleSelect(item)}
                  >
                    {item.title || item.name}{" "}
                    <span style={{ opacity: 0.6 }}>
                      ({item.release_date?.slice(0, 4) ||
                        item.first_air_date?.slice(0, 4) ||
                        item.media_type})
                    </span>
                  </motion.div>
                ))
              : null}

            {(!query || results.length === 0) && recentSearches.length > 0 && (
              <>
                <div
                  style={{
                    padding: "8px 15px",
                    opacity: 0.7,
                    fontSize: "0.9rem",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  Recent Searches
                </div>
                {recentSearches.map((term, i) => (
                  <motion.div
                    key={i}
                    style={styles.suggestion}
                    whileHover={{
                      backgroundColor: styles.suggestionHover.backgroundColor,
                      scale: 1.02,
                    }}
                    onMouseDown={() => {
                      setQuery(term);
                      setShowDropdown(false);
                    }}
                  >
                    🔍 {term}
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
