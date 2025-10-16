import Head from "next/head";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Layout({ children }) {
  const [focused, setFocused] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();

  const styles = {
    header: {
      padding: "1rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: "Oswald, sans-serif",
      position: "sticky",
      top: 0,
      zIndex: 10,
      backgroundColor: theme === "dark" ? "#121212" : "#fff",
      color: theme === "dark" ? "#eee" : "#000",
      gap: "1rem",
    },
    title: { fontSize: "1.8rem", fontWeight: 700 },
    main: { padding: "2rem", minHeight: "80vh" },
    footer: {
      padding: "1rem",
      background: theme === "dark" ? "#1F1F1F" : "#f1f1f1",
      color: theme === "dark" ? "#ccc" : "#333",
      textAlign: "center",
    },
    navButtons: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    button: {
      padding: "0.5rem 1rem",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      background: theme === "dark" ? "#ff6600" : "#ff6600",
      color: "#fff",
    },
    sessionText: { marginRight: "0.5rem", fontWeight: 600 },
  };

  return (
    <>
      <Head>
        <title>Movie Database</title>
        <meta name="description" content="Browse your favorite movies and anime!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <h1 style={styles.title}>MovieDB</h1>

          <div style={styles.navButtons}>
            <button style={styles.button} onClick={() => (window.location.href = "/")}>
              Home
            </button>
            <button style={styles.button} onClick={toggleTheme}>
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>

            {/* Session Buttons */}
            {!session && (
              <>
                <Link href="/auth/login">
                  <button style={styles.button}>Login</button>
                </Link>
                <Link href="/auth/signup">
                  <button style={styles.button}>Signup</button>
                </Link>
              </>
            )}

            {session && (
              <>
                <span style={styles.sessionText}>Hi, {session.user.name}</span>
                <button style={styles.button} onClick={() => signOut()}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {focused && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backdropFilter: "blur(7px)",
                zIndex: 0,
                transition: "backdrop-filter 0.4s ease",
              }}
            />
          )}
          <SearchBar
            isFocused={focused}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
      </header>

      <main style={styles.main}>{children}</main>

      <footer style={styles.footer}>© 2025 Mystic</footer>
    </>
  );
}
