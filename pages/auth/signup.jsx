import { useState } from "react";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const hashedPassword = bcrypt.hashSync(password, 10);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password: hashedPassword }),
    });

    const data = await res.json();
    if (!res.ok) setError(data.message || "Signup failed");
    else router.push("/auth/login");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-orange-500 text-white py-2 rounded">Sign Up</button>
    </form>
  );
}
