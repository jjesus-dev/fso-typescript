import express, { type Response } from "express";
import patientsService from "../services/patientsService.ts";
import type { NonSensitivePatientEntry } from "../types.ts";
import parseNewPatientEntry from "../utils.ts";

const router: express.Router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const data = patientsService.getNonSensitiveEntries();
  res.send(data);
});

router.get("/:id", (req, res: Response<NonSensitivePatientEntry>) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedPatient = patientsService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    res.status(404).send(errorMessage);
  }
});

export default router;
