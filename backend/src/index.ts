import express from "express";

import cors from "cors";

import healthRouter from "./routes/health";

import applicationsRouter from "./routes/applications";



const app = express();

app.use(cors());

app.use(express.json());



app.use("/health", healthRouter);

app.use("/applications", applicationsRouter);



const PORT = 4000;

app.listen(PORT, () => {

  console.log(`API running on http://localhost:${PORT}`);

});

