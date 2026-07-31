import { useState, SyntheticEvent } from "react";
import { Grid, Button, Select, MenuItem, InputLabel } from "@mui/material";
import { EntryFormValues, EntryType, HealthCheckRating } from "../../types";
import HealthCheckForm from "../EntryPages/HealthCheckForm";
import HospitalForm from "../EntryPages/HospitalForm";
import OccupationalHealthcareForm from "../EntryPages/OccupationalHealthcareForm";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthRating, setHealthRating] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);

  const addEntry = (event: SyntheticEvent) => {
    const entryRating = parseInt(healthRating) as HealthCheckRating;

    event.preventDefault();

    switch (entryType) {
      case EntryType.HealthCheck:
        console.log("Submit HealthCheck");
        onSubmit({
          date,
          description,
          specialist,
          healthCheckRating: entryRating,
          type: entryType,
        });
        break;
      case EntryType.Hospital:
        console.log("Submit Hospital");
        onSubmit({
          date,
          description,
          specialist,
          discharge: {
            criteria: dischargeCriteria,
            date: dischargeDate,
          },
          type: entryType,
        });
        break;
      case EntryType.OccupationalHealthcare:
        console.log("Submit OccupationalHealthcare");
        onSubmit({
          date,
          description,
          specialist,
          employerName,
          sickLeave: {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd,
          },
          type: entryType,
        });
        break;
    }
  };

  const styledMargin = {
    marginBottom: 2,
  };

  const displayEntryForm = (entry: EntryType) => {
    switch (entry) {
      case EntryType.HealthCheck:
        return (
          <HealthCheckForm
            date={date}
            setDate={setDate}
            description={description}
            setDescription={setDescription}
            specialist={specialist}
            setSpecialist={setSpecialist}
            healthRating={healthRating}
            setHealthRating={setHealthRating}
            diagnosisCodes={diagnosisCodes}
            setDiagnosisCodes={setDiagnosisCodes}
          />
        );
      case EntryType.Hospital:
        return (
          <HospitalForm
            date={date}
            setDate={setDate}
            description={description}
            setDescription={setDescription}
            specialist={specialist}
            setSpecialist={setSpecialist}
            diagnosisCodes={diagnosisCodes}
            setDiagnosisCodes={setDiagnosisCodes}
            dischargeDate={dischargeDate}
            setDischargeDate={setDischargeDate}
            dischargeCriteria={dischargeCriteria}
            setDischargeCriteria={setDischargeCriteria}
          />
        );
      case EntryType.OccupationalHealthcare:
        return (
          <OccupationalHealthcareForm
            date={date}
            setDate={setDate}
            description={description}
            setDescription={setDescription}
            specialist={specialist}
            setSpecialist={setSpecialist}
            diagnosisCodes={diagnosisCodes}
            setDiagnosisCodes={setDiagnosisCodes}
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeaveStart={sickLeaveStart}
            setSickLeaveStart={setSickLeaveStart}
            sickLeaveEnd={sickLeaveEnd}
            setSickLeaveEnd={setSickLeaveEnd}
          />
        );
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel id="entry-type-label">Entry Type</InputLabel>
        <Select
          labelId="entry-type-label"
          id="entry-type-select"
          fullWidth
          value={entryType}
          onChange={({ target }) => setEntryType(target.value)}
          sx={styledMargin}
        >
          <MenuItem value={EntryType.HealthCheck}>HealthCheck</MenuItem>
          <MenuItem value={EntryType.Hospital}>Hospital</MenuItem>
          <MenuItem value={EntryType.OccupationalHealthcare}>
            OccupationalHealthcare
          </MenuItem>
        </Select>

        {displayEntryForm(entryType)}

        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
