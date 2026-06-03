import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients.ts";
import type {
  PatientEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
} from "../types.ts";

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, getNonSensitiveEntries, findById, addPatient };
