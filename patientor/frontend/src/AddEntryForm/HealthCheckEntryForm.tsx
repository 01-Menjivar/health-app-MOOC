import { useState, SyntheticEvent } from "react";
import { TextField, Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Box, OutlinedInput } from '@mui/material';
import { EntryWithoutId, Diagnosis, HealthCheckRating } from "../types";

interface Props {
    addEntry: (entry: EntryWithoutId) => void;
    diagnoses: Diagnosis[];
    onCancel: () => void;
}

const healthCheckRatingOptions = [
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.LowRisk, label: "Low Risk" },
    { value: HealthCheckRating.HighRisk, label: "High Risk" },
    { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

export default function HealthCheckEntryForm({ addEntry, diagnoses, onCancel }: Props) {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

    const onDiagnosisChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const { target: { value } } = event;
        setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
    };

    const submit = (event: SyntheticEvent) => {
        event.preventDefault();
        addEntry({
            type: "HealthCheck",
            description,
            date,
            specialist,
            diagnosisCodes,
            healthCheckRating
        });
    };

    return (
        <form onSubmit={submit}>
            <TextField
                label="Description"
                fullWidth
                value={description}
                onChange={({ target }) => setDescription(target.value)}
                margin="normal"
                required
            />
            <TextField
                label="Date"
                type="date"
                fullWidth
                value={date}
                onChange={({ target }) => setDate(target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
            />
            <TextField
                label="Specialist"
                fullWidth
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
                margin="normal"
                required
            />
            <Box marginY={2}>
                <InputLabel id="diagnoses-label">Diagnosis Codes</InputLabel>
                <Select
                    labelId="diagnoses-label"
                    multiple
                    fullWidth
                    value={diagnosisCodes}
                    onChange={onDiagnosisChange}
                    input={<OutlinedInput label="Diagnosis Codes" />}
                >
                    {diagnoses.map((d) => (
                        <MenuItem key={d.code} value={d.code}>
                            {d.code} - {d.name}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Box marginY={2}>
                <InputLabel id="rating-label">Health Check Rating</InputLabel>
                <Select
                    labelId="rating-label"
                    fullWidth
                    value={healthCheckRating}
                    onChange={(e) => setHealthCheckRating(e.target.value as HealthCheckRating)}
                >
                    {healthCheckRatingOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
                <Grid size="auto">
                    <Button onClick={onCancel} variant="contained" color="error" type="button">
                        Cancel
                    </Button>
                </Grid>
                <Grid size="auto">
                    <Button type="submit" variant="contained" color="primary">
                        Add
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
