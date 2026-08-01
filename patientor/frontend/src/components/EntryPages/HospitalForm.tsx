import { Dispatch, SetStateAction } from "react";
import { TextField } from "@mui/material";

interface Props {
  dischargeDate: string;
  setDischargeDate: Dispatch<SetStateAction<string>>;
  dischargeCriteria: string;
  setDischargeCriteria: Dispatch<SetStateAction<string>>;
}

const HospitalForm = ({
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
        type="date"
        label="Discharge Date"
        id="discharge-date"
        fullWidth
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
        sx={styledMargin}
        slotProps={{ inputLabel: { shrink: true } }}
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
