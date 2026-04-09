import express from "express";
import { supabase } from "../lib/supabase";

const router = express.Router();

router.get("/summary", async (req, res) => {
  const { data, error } =
    await supabase
      .from("applications")
      .select("status");

  if (error) {
    return res
      .status(500)
      .json({ error: error.message });
  }

  const apps = data || [];

  const summary = {
    total: apps.length,
    applied: apps.filter(
      (a) => a.status === "Applied"
    ).length,
    interviewing: apps.filter(
      (a) => a.status === "Interviewing"
    ).length,
    offer: apps.filter(
      (a) => a.status === "Offer"
    ).length,
    rejected: apps.filter(
      (a) => a.status === "Rejected"
    ).length,
  };

  res.json(summary);
});

export default router;