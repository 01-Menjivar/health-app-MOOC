import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import SinglePatientView from "./components/SinglePatientView";
import entriesService from "./services/entries";
import { type EntryWithoutId } from "./types"; 

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);
  
  const addEntry = async (entry: EntryWithoutId, id: string) => {
    const response = await entriesService.addEntry(entry, id);
    setPatients(patients.map(patient => patient.id === id ? {...patient, entries: [...(patient.entries || []), response]} : patient));
  };

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<SinglePatientView addEntry={addEntry} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
