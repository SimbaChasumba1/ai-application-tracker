import { Router } from "express";

import { JobApplication } from "../models/JobApplications";



const router = Router();



router.get("/summary", async (req, res) => {

  const total = await JobApplication.countDocuments();

  const applied = await JobApplication.countDocuments({ status: "Applied" });

  const interviewing = await JobApplication.countDocuments({ status: "Interviewing" });

  const offer = await JobApplication.countDocuments({ status: "Offer" });

  const rejected = await JobApplication.countDocuments({ status: "Rejected" });



  res.json({

    total,

    applied,

    interviewing,

    offer,

    rejected

  });

});



export default router;