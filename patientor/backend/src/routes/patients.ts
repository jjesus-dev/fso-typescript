import express, { type Response } from "express";
import patientsService from "../services/patientsService.ts";
import type { NonSensitivePatientEntry } from "../types.ts";

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
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(addedPatient);
});

export default router;
