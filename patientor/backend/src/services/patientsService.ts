import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients.ts";
import type {
  Patient,
  NewPatient,
  NonSensitivePatient,
  Entry,
  NewEntry,
} from "../types.ts";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
    entries: [],
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuidv4(),
    ...entry,
  };

  const patient = patients.find((p) => p.id === id);
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitiveEntries,
  findById,
  addPatient,
  addEntry,
};
