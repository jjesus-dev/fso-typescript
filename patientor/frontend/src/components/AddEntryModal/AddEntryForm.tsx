import { useState, SyntheticEvent, useEffect } from "react";
import {
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import axios from "axios";
import diagnosesService from "../../services/diagnoses";
import {
  DiagnosisEntry,
  EntryFormValues,
  EntryType,
  HealthCheckRating,
} from "../../types";
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
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthRating, setHealthRating] = useState("Healthy");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);
  const [diagnoses, setDiagnoses] = useState<DiagnosisEntry[]>();

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const diagnoses = await diagnosesService.getAll();
        //console.log("diags:", diagnoses);
        setDiagnoses(diagnoses);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace(
              "Something went wrong. Error: ",
              "",
            );
            console.error(message);
          } else {
            console.log("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
        }
      }
    };

    void fetchDiagnoses();
  }, []);

  const addEntry = (event: SyntheticEvent) => {
    const entryRating = healthRating as keyof typeof HealthCheckRating;

    event.preventDefault();

    switch (entryType) {
      case EntryType.HealthCheck:
        console.log("Submit HealthCheck");
        onSubmit({
          date,
          description,
          specialist,
          healthCheckRating: HealthCheckRating[entryRating],
          type: entryType,
          diagnosisCodes: diagnosisCodes,
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
          diagnosisCodes: diagnosisCodes,
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
          diagnosisCodes: diagnosisCodes,
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
            healthRating={healthRating}
            setHealthRating={setHealthRating}
          />
        );
      case EntryType.Hospital:
        return (
          <HospitalForm
            dischargeDate={dischargeDate}
            setDischargeDate={setDischargeDate}
            dischargeCriteria={dischargeCriteria}
            setDischargeCriteria={setDischargeCriteria}
          />
        );
      case EntryType.OccupationalHealthcare:
        return (
          <OccupationalHealthcareForm
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

  const handleMultipleChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>,
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
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

        <TextField
          required
          type="date"
          label="Date"
          id="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          sx={styledMargin}
          slotProps={{ inputLabel: { shrink: true } }}
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

        <FormControl fullWidth sx={styledMargin}>
          <Select
            id="diagnosis-codes-select"
            multiple
            displayEmpty
            value={diagnosisCodes}
            onChange={handleMultipleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Available Diagnoses</em>;
              }

              return selected.join(", ");
            }}
          >
            <MenuItem disabled value="">
              <em>Available Diagnoses</em>
            </MenuItem>
            {diagnoses?.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code} — {diagnosis.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
