import express from "express";
import { supabase } from "../lib/supabase";

const router = express.Router();

/**
 GET Applications
*/
router.get("/", async (req, res) => {
  const { data, error } =
    await supabase
      .from("applications")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    return res
      .status(500)
      .json({ error: error.message });
  }

  res.json(data);
});

/**
 POST Application
*/
router.post("/", async (req, res) => {
  const {
    company,
    role,
    status,
    job_url,
    notes,
    salary_range,
  } = req.body;

  const { data, error } =
    await supabase
      .from("applications")
      .insert([
        {
          company,
          role,
          status,
          job_url,
          notes,
          salary_range,
        },
      ])
      .select()
      .single();

  if (error) {
    return res
      .status(500)
      .json({ error: error.message });
  }

  res.status(201).json(data);
});

/**
 DELETE Application
*/
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true });
});

export default router;