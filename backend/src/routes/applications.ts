import { Router } from "express";

import { JobApplication } from "../models/JobApplication";

import { randomUUID } from "crypto";



const router = Router();



const applications: JobApplication[] = [];



router.post("/", (req, res) => {

  const { company, role } = req.body;



  const app: JobApplication = {

    id: randomUUID(),

    company,

    role,

    status: "Applied",

    appliedDate: new Date().toISOString(),

  };



  applications.push(app);

  res.status(201).json(app);

});



router.get("/", (_req, res) => {

  res.json(applications);

});



export default router;

