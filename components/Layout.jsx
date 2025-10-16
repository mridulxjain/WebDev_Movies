import Head from "next/head";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Layout({ children }) {
  const [focused, setFocused] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();

  const styles = {
    header: {
      padding: "0.8rem 1rem",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
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
      gap: "0.8rem",
      flexWrap: "wrap",
    },
    rightNav: {
      display: "flex",
      alignItems: "center",
      gap: "0.8rem",
      flexWrap: "wrap",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: 700,
    },
    button: {
      padding: "0.4rem 0.9rem",
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
      padding: "0.4rem 0.6rem",
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
      alignItems: "center",
      minWidth: "200px",
      margin: "0.5rem 0",
      gap: "0.5rem",
    },
    userAfterSearch: {
      fontWeight: 600,
      color: theme === "dark" ? "#fff" : "#000",
      whiteSpace: "nowrap",
    },
    main: { padding: "2rem", minHeight: "80vh" },

    // New Responsive Footer Styles
    footer: {
      background: theme === "dark" ? "#0a0a0a" : "#f5f5f5",
      color: theme === "dark" ? "#fff" : "#000",
      padding: "2rem 1rem",
      textAlign: "center",
      borderTop: theme === "dark"
        ? "1px solid rgba(255,255,255,0.1)"
        : "1px solid rgba(0,0,0,0.1)",
    },
    footerGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1rem",
      maxWidth: "900px",
      margin: "0 auto",
      textAlign: "center",
    },
    footerColumn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.4rem",
    },
    footerLink: {
      color: theme === "dark" ? "#ccc" : "#333",
      textDecoration: "none",
      fontSize: "0.95rem",
      transition: "color 0.2s ease",
    },
    socialIcons: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      fontSize: "1.3rem",
      marginTop: "0.5rem",
    },
    copyright: {
      marginTop: "1rem",
      fontSize: "0.9rem",
      opacity: 0.7,
    },
  };

  return (
    <>
      <Head>
        <title>Movie Database</title>
        <meta name="description" content="Browse your favorite movies and anime!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.leftNav}>
          <span style={styles.title}>MovieDB</span>
          <button style={styles.button} onClick={() => (window.location.href = "/")}>
            Home
          </button>
          <button style={styles.themeButton} onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        <div style={styles.searchWrapper}>
          <SearchBar
            isFocused={focused}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {session && <span style={styles.userAfterSearch}>Hi, {session.user.name}</span>}
        </div>

        <div style={styles.rightNav}>
          {session && (
            <>
              <div className="desktop-buttons">
                <Link href="/watchlist">
                  <button style={styles.button}>Watchlist</button>
                </Link>
                <button style={styles.button} onClick={() => signOut()}>
                  Logout
                </button>
              </div>
              <div className="mobile-icons">
                <Link href="/watchlist">
                  <span style={styles.mobileIcon}>⭐</span>
                </Link>
                <button style={styles.mobileIcon} onClick={() => signOut()}>
                  ⏏️
                </button>
              </div>
            </>
          )}
          {!session && (
            <>
              <div className="desktop-buttons">
                <Link href="/auth/login">
                  <button style={styles.button}>Login</button>
                </Link>
                <Link href="/auth/signup">
                  <button style={styles.button}>Signup</button>
                </Link>
              </div>
              <div className="mobile-icons">
                <Link href="/auth/login">
                  <span style={styles.mobileIcon}>🔑</span>
                </Link>
                <Link href="/auth/signup">
                  <span style={styles.mobileIcon}>📝</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>{children}</main>

      {/* Responsive Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div style={styles.footerColumn}>
            <h3>About</h3>
            <Link href="/about" style={styles.footerLink}>Our Story</Link>
            <Link href="/team" style={styles.footerLink}>Team</Link>
          </div>
          <div style={styles.footerColumn}>
            <h3>Support</h3>
            <Link href="/contact" style={styles.footerLink}>Contact Us</Link>
            <Link href="/faq" style={styles.footerLink}>FAQ</Link>
          </div>
          <div style={styles.footerColumn}>
            <h3>Legal</h3>
            <Link href="/privacy" style={styles.footerLink}>Privacy Policy</Link>
            <Link href="/terms" style={styles.footerLink}>Terms of Service</Link>
          </div>
          <div style={styles.footerColumn}>
            <h3>Follow Us</h3>
            <div style={styles.socialIcons}>
              <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            </div>
          </div>
        </div>
        <div style={styles.copyright}>© 2025 Mystic — All Rights Reserved</div>
      </footer>

      {/* Responsive Mobile CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-buttons {
            display: none;
          }
          .mobile-icons {
            display: flex;
            gap: 0.5rem;
          }
        }
        @media (min-width: 769px) {
          .desktop-buttons {
            display: flex;
            gap: 0.5rem;
          }
          .mobile-icons {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
