import { NewPatientSchema, type NewPatientEntry } from "./types.ts";

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  return NewPatientSchema.parse(object);
};

export default parseNewPatientEntry;
