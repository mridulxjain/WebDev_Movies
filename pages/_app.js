import "@/styles/globals.css";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext"; // fixed
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react"; // optional if using NextAuth

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
