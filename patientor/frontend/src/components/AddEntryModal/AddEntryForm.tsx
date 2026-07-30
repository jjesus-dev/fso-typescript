import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button } from "@mui/material";
import { EntryFormValues, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthRating, setHealthRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    const entryRating = parseInt(healthRating) as HealthCheckRating;

    event.preventDefault();
    onSubmit({
      date,
      description,
      specialist,
      healthCheckRating: entryRating,
      type: "HealthCheck",
    });
    console.log("Submit");
  };

  const styledMargin = {
    marginBottom: 2,
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          required
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          sx={styledMargin}
        />
        <TextField
          required
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={styledMargin}
        />
        <TextField
          required
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          sx={styledMargin}
        />
        <TextField
          required
          label="Health Check Rating (0-3)"
          fullWidth
          value={healthRating}
          onChange={({ target }) => setHealthRating(target.value)}
          sx={styledMargin}
        />
        <TextField
          label="Diagnosis Codes (comma-separated)"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
          sx={styledMargin}
        />

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
