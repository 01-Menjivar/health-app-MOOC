import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Diagnosis, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Entry } from "../../types";
import diagnosisService from "../../services/diagnoses";
import EntryDetails from "../EntryDetails";
import { Button } from "@mui/material";
import { EntryWithoutId } from "../../types";
import EntryForm from "../../AddEntryForm/EntryForm";

interface Props {
  addEntry: (entry: EntryWithoutId, id: string) => void;
}

export default function SinglePatientView({ addEntry }: Props) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string>("");

  const { id } = useParams();

  useEffect(() => {
    const fetchPatientById = async () => {
      if (id) {
        const patientData = await patientService.getById(id);
        setPatient(patientData);
      }
    };
    fetchPatientById();
  }, [id]);

  useEffect(() => {
    const fetchDiagnosisCodes = async () => {
      const diagnosisData = await diagnosisService.getAll();
      setDiagnosisCodes(diagnosisData);
    };

    fetchDiagnosisCodes();
  }, []);

  const submitEntry = async (entry: EntryWithoutId) => {
    if (id) {
      try {
        await addEntry(entry, id);
        const updatedPatient = await patientService.getById(id);
        setPatient(updatedPatient);
        setShowForm(false);
        setError("");
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e.response?.data && typeof e.response.data === "string") {
            setError(
              e.response.data.replace("Something went wrong. Error: ", ""),
            );
          } else if (e.response?.data?.error) {
            if (Array.isArray(e.response.data.error)) {
              setError(
                e.response.data.error
                  .map((err: { message?: string; code?: string }) =>
                    String(err.message || err.code),
                  )
                  .join(", "),
              );
            } else {
              setError(String(e.response.data.error));
            }
          } else {
            setError("An unknown error occurred.");
          }
        } else if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred.");
        }
        console.error(e);
      }
    }
  };

  if (patient) {
    return (
      <div>
        <h1>
          {patient.name}{" "}
          {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
        </h1>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>entries</h3>
        {patient.entries.map((entry: Entry) => (
          <EntryDetails
            key={entry.id}
            entry={entry}
            diagnosisCodes={diagnosisCodes}
          />
        ))}
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
          >
            ADD NEW ENTRY
          </Button>
        )}
        {showForm && (
          <EntryForm
            addEntry={submitEntry}
            diagnoses={diagnosisCodes}
            error={error}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    );
  } else {
    return <h1>Patient not found</h1>;
  }
}
