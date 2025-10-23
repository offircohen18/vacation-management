import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/knex.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// check DB Connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.raw("SELECT NOW()");
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});