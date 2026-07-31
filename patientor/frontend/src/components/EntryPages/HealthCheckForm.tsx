import { Dispatch, SetStateAction } from "react";
import { TextField } from "@mui/material";

interface Props {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  specialist: string;
  setSpecialist: Dispatch<SetStateAction<string>>;
  healthRating: string;
  setHealthRating: Dispatch<SetStateAction<string>>;
  diagnosisCodes: string;
  setDiagnosisCodes: Dispatch<SetStateAction<string>>;
}

const HealthCheckForm = ({
  date,
  setDate,
  description,
  setDescription,
  specialist,
  setSpecialist,
  healthRating,
  setHealthRating,
  diagnosisCodes,
  setDiagnosisCodes,
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
        required
        label="Health Check Rating (0-3)"
        id="health-check-rating"
        fullWidth
        value={healthRating}
        onChange={({ target }) => setHealthRating(target.value)}
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
    </>
  );
};

export default HealthCheckForm;
