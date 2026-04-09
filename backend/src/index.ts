import express from "express";
import cors from "cors";
import "dotenv/config";

// IMPORTANT: include .js extensions for ES modules
import healthRoutes from "./routes/health.js";
import applicationRoutes from "./routes/applications.js";
import statsRoutes from "./routes/stats.js";

// Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/health", healthRoutes);
app.use("/applications", applicationRoutes);
app.use("/stats", statsRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});