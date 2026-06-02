import express, { type Response } from "express";
import patientsService from "../services/patientsService.ts";
import type { NonSensitivePatientEntry } from "../types.ts";

const router: express.Router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const data = patientsService.getNonSensitiveEntries();
  res.send(data);
});

export default router;
