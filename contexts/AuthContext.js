import { createContext, useContext, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      setUser(session.user);
    } else {
      setUser(null);
    }
  }, [session, status]);

  const login = (provider) => signIn(provider);
  const logout = () => signOut();

  return (
    <AuthContext.Provider value={{ user, login, logout, status }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
