import axios from "axios";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import { useState, useEffect } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface Props {
  patientId: string;
}

const PatientPage = ({ patientId }: Props) => {
  const [patient, setPatient] = useState<Patient>();

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
    </div>
  );
};

export default PatientPage;
