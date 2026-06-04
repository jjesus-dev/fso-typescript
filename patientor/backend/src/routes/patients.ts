import express, { type Response } from "express";
import patientsService from "../services/patientsService.ts";
import { NewPatientSchema, type NonSensitivePatientEntry } from "../types.ts";
import z from "zod";

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
    const newPatientEntry = NewPatientSchema.parse(req.body);
    const addedPatient = patientsService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

export default router;
