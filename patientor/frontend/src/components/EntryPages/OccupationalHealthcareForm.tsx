import { Dispatch, SetStateAction } from "react";
import { TextField } from "@mui/material";

interface Props {
  employerName: string;
  setEmployerName: Dispatch<SetStateAction<string>>;
  sickLeaveStart: string;
  setSickLeaveStart: Dispatch<SetStateAction<string>>;
  sickLeaveEnd: string;
  setSickLeaveEnd: Dispatch<SetStateAction<string>>;
}

const OccupationalHealthcareForm = ({
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
        label="Employer Name"
        id="employer-name"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
        sx={styledMargin}
      />
      <TextField
        type="date"
        label="Sick Leave (Start Date)"
        id="sick-leave-start"
        fullWidth
        value={sickLeaveStart}
        onChange={({ target }) => setSickLeaveStart(target.value)}
        sx={styledMargin}
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField
        type="date"
        label="Sick Leave (End Date)"
        id="sick-leave-end"
        fullWidth
        value={sickLeaveEnd}
        onChange={({ target }) => setSickLeaveEnd(target.value)}
        sx={styledMargin}
        slotProps={{ inputLabel: { shrink: true } }}
      />
    </>
  );
};

export default OccupationalHealthcareForm;
