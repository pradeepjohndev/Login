import express from "express";
import bcrypt from "bcrypt";
import session from "express-session";
import cors from "cors";
import { pool } from "./Db";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true }
}));

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  await pool.request()
    .input("u", username)
    .input("p", hash)
    .query("INSERT INTO Users (username, passwordHash) VALUES (@u,@p)");

  res.sendStatus(201);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.request()
    .input("u", username)
    .query("SELECT * FROM Users WHERE username=@u");

  if (!result.recordset.length) return res.sendStatus(401);

  const user = result.recordset[0];
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.sendStatus(401);

  req.session.userId = user.id;
  res.json({ message: "Logged in" });
});

app.get("/me", (req, res) => {
  if (!req.session.userId) return res.sendStatus(401);
  res.json({ userId: req.session.userId });
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => res.sendStatus(200));
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
