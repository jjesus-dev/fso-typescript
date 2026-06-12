import { Box, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

import { DiagnosisEntry, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: DiagnosisEntry[];
}

const EntryList = ({ entry, diagnoses }: Props) => {
  const getTypeIcon = (entryType: string | undefined) => {
    switch (entryType) {
      case "HealthCheck":
        return <MonitorHeartIcon />;
      case "Hospital":
        return <LocalHospitalIcon />;
      default:
        return <MedicalServicesIcon />;
    }
  };

  const getRatingIcon = (rating: number) => {
    switch (rating) {
      case 0:
        return <DeviceThermostatIcon sx={{ color: "#6a4c93" }} />;
      case 1:
        return <DeviceThermostatIcon sx={{ color: "#44bba4" }} />;
      case 2:
        return <DeviceThermostatIcon sx={{ color: "#ffca3a" }} />;
      default:
        return <DeviceThermostatIcon sx={{ color: "#e4572e" }} />;
    }
  };

  const getDiagnoses = () => {
    return (
      <ul>
        {entry.diagnosisCodes?.map((dia, index) => (
          <li key={index}>
            {dia} - {diagnoses?.find((d) => d.code === dia)?.name}
          </li>
        ))}
      </ul>
    );
  };

  const EntryDetails = () => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <Box>
            <Typography variant="body2" gutterBottom>
              Rating: {getRatingIcon(entry.healthCheckRating)}
            </Typography>
            {entry.diagnosisCodes && <div>Diagnoses: {getDiagnoses()}</div>}
          </Box>
        );
      case "Hospital":
        return (
          <Box>
            {entry.discharge && (
              <Typography variant="body2" gutterBottom>
                Discharge: {entry.discharge.date}, {entry.discharge.criteria}
              </Typography>
            )}

            {entry.diagnosisCodes && <div>Diagnoses: {getDiagnoses()}</div>}
          </Box>
        );
      default:
        return (
          <Box>
            <Typography variant="body2" gutterBottom>
              Employer: {entry.employerName}
            </Typography>
            {entry.sickLeave && (
              <Typography variant="body2" gutterBottom>
                Sick Leave from: {entry.sickLeave.startDate} to:{" "}
                {entry.sickLeave.endDate}
              </Typography>
            )}
            {entry.diagnosisCodes && <div>Diagnoses: {getDiagnoses()}</div>}
          </Box>
        );
    }
  };

  return (
    <Box
      component="section"
      sx={{
        borderLeft: 2,
        borderColor: "#1982C4",
        marginBottom: 3,
        padding: 1.5,
      }}
    >
      <Typography variant="body1" gutterBottom>
        {entry.date} {getTypeIcon(entry.type)}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {entry.description}
        <br />
        <strong>Diagnose by:</strong> {entry.specialist}
      </Typography>
      {EntryDetails()}
    </Box>
  );
};

export default EntryList;
