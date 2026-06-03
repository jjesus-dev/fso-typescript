import patients from "../../data/patients.ts";
import type { PatientEntry, NonSensitivePatientEntry } from "../types.ts";

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

const addPatient = () => {
  return null;
};

export default { getPatients, getNonSensitiveEntries, findById, addPatient };
