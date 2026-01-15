import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ status: "API is running" });
});

export default router;
