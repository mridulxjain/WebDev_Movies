import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

  try {
    const client = await clientPromise;
    const db = client.db("movieApp");
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    await db.collection("users").insertOne({ name, email, password });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
