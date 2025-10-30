import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import db from "./db/knex.js";
import userRoutes from './routes/usersRoutes.js';
import vacationRoutes from './routes/vacationRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server is running 🚀"));

app.get("/test-db", async (req, res) => {
  try {
    const result = await db.raw("SELECT NOW()");
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    console.error("DB connection error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use('/api/users', userRoutes);
app.use('/api/vacations', vacationRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
});

export default app;
