import { Dispatch, SetStateAction } from "react";
import { InputLabel, MenuItem, Select } from "@mui/material";

interface Props {
  healthRating: string;
  setHealthRating: Dispatch<SetStateAction<string>>;
}

const HealthCheckForm = ({ healthRating, setHealthRating }: Props) => {
  const styledMargin = {
    marginBottom: 2,
  };

  return (
    <>
      <InputLabel id="health-check-label">Health Check Rating</InputLabel>
      <Select
        required
        labelId="health-check-label"
        id="health-check-select"
        fullWidth
        value={healthRating}
        onChange={({ target }) => setHealthRating(target.value)}
        sx={styledMargin}
      >
        <MenuItem value="Healthy">Healthy</MenuItem>
        <MenuItem value="LowRisk">Low Risk</MenuItem>
        <MenuItem value="HighRisk">High Risk</MenuItem>
        <MenuItem value="CriticalRisk">Critical Risk</MenuItem>
      </Select>
    </>
  );
};

export default HealthCheckForm;
