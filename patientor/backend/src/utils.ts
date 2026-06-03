import type { NewPatientEntry } from "./types.ts";
import { Gender } from "./types.ts";

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseText(object.name, "name"),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseText(object.ssn, "ssn"),
      gender: parseGender(object.gender),
      occupation: parseText(object.occupation, "occupation"),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing!");
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseText = (text: unknown, field: string): string => {
  // `!text` for empty strings
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing '${field}' value`);
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }

  return date;
};

const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: '${gender}'`);
  }

  return gender;
};

export default parseNewPatientEntry;
