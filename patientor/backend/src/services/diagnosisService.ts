import diagnoses from "../../data/diagnoses.ts";
import type { DiagnosisEntry } from "../types.ts";

const getDiagnoses = (): DiagnosisEntry[] => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default { getDiagnoses, addDiagnosis };
