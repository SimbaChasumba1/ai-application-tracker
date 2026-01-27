import express from "express";

import cors from "cors";

import healthRoutes from "./routes/health";

import applicationRoutes from "./routes/applications";

import statsRoutes from "./routes/stats";





const app = express();



app.use(cors());

app.use(express.json());



app.use("/health", healthRoutes);

app.use("/applications", applicationRoutes);

app.use("/stats", statsRoutes);



const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {

  console.log(`API running on http://localhost:${PORT}`);

});