import clientPromise from "../../../lib/mongodb.js";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("movieApp");

    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid email or password" });

    // Optionally, you can generate a token here if you want JWT
    const token = `${user._id}-${new Date().getTime()}`;

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
