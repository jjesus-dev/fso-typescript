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
  employerName: string;
  setEmployerName: Dispatch<SetStateAction<string>>;
  sickLeaveStart: string;
  setSickLeaveStart: Dispatch<SetStateAction<string>>;
  sickLeaveEnd: string;
  setSickLeaveEnd: Dispatch<SetStateAction<string>>;
}

const OccupationalHealthcareForm = ({
  date,
  setDate,
  description,
  setDescription,
  specialist,
  setSpecialist,
  diagnosisCodes,
  setDiagnosisCodes,
  employerName,
  setEmployerName,
  sickLeaveStart,
  setSickLeaveStart,
  sickLeaveEnd,
  setSickLeaveEnd,
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
        required
        label="Employer Name"
        id="employer-name"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
        sx={styledMargin}
      />
      <TextField
        label="Sick Leave (Start Date)"
        id="sick-leave-start"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={sickLeaveStart}
        onChange={({ target }) => setSickLeaveStart(target.value)}
        sx={styledMargin}
      />
      <TextField
        label="Sick Leave (End Date)"
        id="sick-leave-end"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={sickLeaveEnd}
        onChange={({ target }) => setSickLeaveEnd(target.value)}
        sx={styledMargin}
      />
    </>
  );
};

export default OccupationalHealthcareForm;
