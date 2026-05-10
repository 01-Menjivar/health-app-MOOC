import { useState } from "react";
import { type EntryWithoutId, Diagnosis } from "../types";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, Alert } from "@mui/material";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";

interface Props {
    addEntry: (entry: EntryWithoutId) => void;
    diagnoses: Diagnosis[];
    error?: string;
    onCancel: () => void;
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

export default function EntryForm({ addEntry, diagnoses, error, onCancel }: Props) {
    const [entryType, setEntryType] = useState<EntryType>("HealthCheck");

    return (
        <Box sx={{ border: '2px dotted black', padding: 2, marginTop: 2, marginBottom: 2 }}>
            <Typography variant="h6" style={{ marginBottom: '1em' }}>New Entry</Typography>
            {error && <Alert severity="error" style={{ marginBottom: '1em' }}>{error}</Alert>}
            <FormControl fullWidth margin="normal">
                <InputLabel id="entry-type-label">Entry Type</InputLabel>
                <Select
                    labelId="entry-type-label"
                    value={entryType}
                    label="Entry Type"
                    onChange={(e) => setEntryType(e.target.value as EntryType)}
                >
                    <MenuItem value="HealthCheck">Health Check</MenuItem>
                    <MenuItem value="Hospital">Hospital</MenuItem>
                    <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
                </Select>
            </FormControl>

            {entryType === "HealthCheck" && <HealthCheckEntryForm addEntry={addEntry} diagnoses={diagnoses} onCancel={onCancel} />}
            {entryType === "Hospital" && <HospitalEntryForm addEntry={addEntry} diagnoses={diagnoses} onCancel={onCancel} />}
            {entryType === "OccupationalHealthcare" && <OccupationalHealthcareEntryForm addEntry={addEntry} diagnoses={diagnoses} onCancel={onCancel} />}
        </Box>
    );
}