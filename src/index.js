import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import chatbotRoutes from "./routes/chatbot.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatbotRoutes);

// ✅ Default health check
app.get("/", (_req, res) => res.json({ status: "ok", service: "finverse-backend" }));

// ✅ Database connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// ✅ Export app (no app.listen)
export default app;
