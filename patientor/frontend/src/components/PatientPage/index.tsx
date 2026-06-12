import axios from "axios";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { DiagnosisEntry, Patient } from "../../types";
import { useState, useEffect } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface Props {
  patientId: string;
}

const PatientPage = ({ patientId }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<DiagnosisEntry[]>();

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const selectedPatient = await patientService.getById(patientId);
        //console.log("patient:", selectedPatient);
        setPatient(selectedPatient);
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

    void fetchPatientInfo();
  }, [patientId]);

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

  const getGenderIcon = (gender: string | undefined) => {
    switch (gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default:
        return <MoreHorizIcon />;
    }
  };

  return (
    <div>
      <h2>
        {patient?.name} {getGenderIcon(patient?.gender)}
      </h2>
      <p>SSN: {patient?.ssn}</p>
      <p>Occupation: {patient?.occupation}</p>
      <p>Date of Birth: {patient?.dateOfBirth}</p>

      <div>
        <h3>Entries:</h3>
        <ul>
          {patient?.entries.map((e) => (
            <li key={e.id}>
              {e.date} - <em>{e.description}</em>
              <ul>
                {e.diagnosisCodes?.map((dia, index) => (
                  <li key={index}>
                    {dia} - {diagnoses?.find((d) => d.code === dia)?.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientPage;
