import axios from "axios";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { DiagnosisEntry, EntryFormValues, Patient } from "../../types";
import { useState, useEffect } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EntryList from "./EntryList";
import { Button } from "@mui/material";
import AddEntryModal from "../AddEntryModal";

interface Props {
  patientId: string;
}

const PatientPage = ({ patientId }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<DiagnosisEntry[]>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    // Check if `patient` exists to get rid of `undefined` warning
    if (!patient) return;

    try {
      const entry = await patientService.createEntry(patientId, values);
      const newEntries = patient?.entries.concat(entry);
      const newPatient = { ...patient, entries: newEntries };
      //console.log("new Patient", newPatient);
      setPatient(newPatient);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong (Submit). Error: ",
            "",
          );
          console.error(message);
          setError(message);
        } else if (e?.response?.data && typeof e?.response?.data === "object") {
          const errors = e.response?.data;
          //console.log(errors);

          let message = "";
          for (const err of errors.error) {
            message += `${err.path}: ${err.message}; `;
            //console.error(message);
          }

          setError(message);
        } else {
          setError("Unrecognized axios error (Submit)");
        }
      } else {
        console.error("Unknown error (Submit)", e);
        setError("Unknown error (Submit)");
      }
    }
  };

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const selectedPatient = await patientService.getById(patientId || "_");
        //console.log("selected Patient:", selectedPatient);
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

      {patient?.entries && patient.entries.length >= 1 && (
        <div>
          <h3>Entries:</h3>
          <ul>
            {patient?.entries.map((e) => (
              <EntryList key={e.id} entry={e} diagnoses={diagnoses!} />
            ))}
          </ul>
        </div>
      )}

      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
      <Button variant="contained" type="button" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
