import express, { type Request, type Response } from "express";
import patientsService from "../services/patientsService.ts";
import {
  type Patient,
  type NewPatient,
  type NonSensitivePatient,
  type Entry,
  type NewEntry,
} from "../types.ts";
import {
  newPatientParser,
  newEntryParser,
  errorMiddleware,
} from "../middleware.ts";

const router: express.Router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const data = patientsService.getNonSensitiveEntries();
  res.send(data);
});

router.get("/:id", (req, res: Response<NonSensitivePatient>) => {
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
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient);
  },
);

router.post(
  "/:id/entries/",
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
    const addedEntry = patientsService.addEntry(req.params.id, req.body);
    res.json(addedEntry);
  },
);

router.use(errorMiddleware);

export default router;
