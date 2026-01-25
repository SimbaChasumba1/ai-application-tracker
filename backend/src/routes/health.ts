import { Router } from "express";



const router = Router();



router.get("/", (req, res) => {

  res.json({

    status: "ok",

    service: "AI Job Application Tracker API",

    uptime: process.uptime(),

    timestamp: new Date().toISOString(),

  });

});



export default router;

