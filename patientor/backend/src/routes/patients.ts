import express, { type Request, type Response } from "express";
import patientsService from "../services/patientsService.ts";
import {
  type PatientEntry,
  type NewPatientEntry,
  type NonSensitivePatientEntry,
} from "../types.ts";
import { newPatientParser, errorMiddleware } from "../middleware.ts";

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

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientEntry>,
  ) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient);
  },
);

router.use(errorMiddleware);

export default router;
