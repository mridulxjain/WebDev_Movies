import { useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "../../contexts/ThemeContext";

export default function Signup() {
  const router = useRouter();
  const { theme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) setError(data.message || "Signup failed");
      else router.push("/auth/login");
    } catch (err) {
      setLoading(false);
      setError("Signup failed. Try again.");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme === "dark" ? "#121212" : "#f9f9f9",
      padding: "1rem",
    },
    card: {
      backgroundColor: theme === "dark" ? "#1E1E1E" : "#fff",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow:
        theme === "dark"
          ? "0 4px 20px rgba(0,0,0,0.7)"
          : "0 4px 20px rgba(0,0,0,0.2)",
      width: "100%",
      maxWidth: "400px",
    },
    input: {
      width: "100%",
      padding: "0.75rem 1rem",
      marginBottom: "1rem",
      borderRadius: "8px",
      border: "1px solid",
      borderColor: theme === "dark" ? "#555" : "#ccc",
      backgroundColor: theme === "dark" ? "#2A2A2A" : "#fff",
      color: theme === "dark" ? "#eee" : "#000",
      fontSize: "1rem",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#ff6600",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "1rem",
      marginTop: "0.5rem",
    },
    error: {
      color: "#ff4d4d",
      marginBottom: "0.5rem",
      textAlign: "center",
    },
    title: {
      textAlign: "center",
      fontSize: "1.8rem",
      fontWeight: 700,
      marginBottom: "1.5rem",
      color: theme === "dark" ? "#fff" : "#000",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
