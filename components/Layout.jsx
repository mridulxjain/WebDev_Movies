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
      gap: "1rem",
      fontFamily: "Oswald, sans-serif",
      position: "sticky",
      top: 0,
      zIndex: 50,
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
      boxShadow:
        theme === "dark"
          ? "0 4px 12px rgba(255,255,255,0.1)"
          : "0 4px 12px rgba(0,0,0,0.2)",
      borderRadius: "12px",
      backdropFilter: "blur(6px)",
    },
    leftNav: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    rightNav: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: 700,
    },
    button: {
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      border: "1px solid",
      borderColor: theme === "dark" ? "#fff" : "#000",
      cursor: "pointer",
      fontWeight: 600,
      background: theme === "dark" ? "#000" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    themeButton: {
      padding: "0.5rem 0.8rem",
      borderRadius: "8px",
      border: "1px solid",
      borderColor: theme === "dark" ? "#fff" : "#000",
      cursor: "pointer",
      fontSize: "1.2rem",
      background: theme === "dark" ? "#000" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    searchWrapper: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      position: "relative",
    },
    userAfterSearch: {
      marginLeft: "0.5rem",
      fontWeight: 600,
      color: theme === "dark" ? "#fff" : "#000",
      whiteSpace: "nowrap",
    },
    main: { padding: "2rem", minHeight: "80vh" },
    footer: {
      padding: "1rem",
      background: theme === "dark" ? "#000" : "#f1f1f1",
      color: theme === "dark" ? "#fff" : "#000",
      textAlign: "center",
    },
  };

  return (
    <>
      <Head>
        <title>Movie Database</title>
        <meta name="description" content="Browse your favorite movies and anime!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header style={styles.header}>
        {/* Left buttons */}
        <div style={styles.leftNav}>
          <span style={styles.title}>MovieDB</span>
          <button style={styles.button} onClick={() => (window.location.href = "/")}>
            Home
          </button>
          <button style={styles.themeButton} onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Center search */}
        <div style={styles.searchWrapper}>
          <SearchBar
            isFocused={focused}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {session && <span style={styles.userAfterSearch}>Hi, {session.user.name}</span>}
        </div>

        {/* Right buttons */}
        <div style={styles.rightNav}>
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
            <button style={styles.button} onClick={() => signOut()}>
              Logout
            </button>
          )}
        </div>
      </header>

      <main style={styles.main}>{children}</main>

      <footer style={styles.footer}>© 2025 Mystic</footer>
    </>
  );
}
