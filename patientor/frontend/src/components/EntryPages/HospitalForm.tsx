import { Dispatch, SetStateAction } from "react";
import { TextField } from "@mui/material";

interface Props {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  specialist: string;
  setSpecialist: Dispatch<SetStateAction<string>>;
  diagnosisCodes: string;
  setDiagnosisCodes: Dispatch<SetStateAction<string>>;
  dischargeDate: string;
  setDischargeDate: Dispatch<SetStateAction<string>>;
  dischargeCriteria: string;
  setDischargeCriteria: Dispatch<SetStateAction<string>>;
}

const HospitalForm = ({
  date,
  setDate,
  description,
  setDescription,
  specialist,
  setSpecialist,
  diagnosisCodes,
  setDiagnosisCodes,
  dischargeDate,
  setDischargeDate,
  dischargeCriteria,
  setDischargeCriteria,
}: Props) => {
  const styledMargin = {
    marginBottom: 2,
  };

  return (
    <>
      <TextField
        required
        label="Date"
        id="date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
        sx={styledMargin}
      />
      <TextField
        required
        label="Description"
        id="description"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        sx={styledMargin}
      />
      <TextField
        required
        label="Specialist"
        id="specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        sx={styledMargin}
      />
      <TextField
        label="Diagnosis Codes (comma-separated)"
        id="diagnosis-codes"
        fullWidth
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
        sx={styledMargin}
      />
      <TextField
        label="Discharge Date"
        id="discharge-date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
        sx={styledMargin}
      />
      <TextField
        label="Discharge Criteria"
        id="discharge-criteria"
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
        sx={styledMargin}
      />
    </>
  );
};

export default HospitalForm;
