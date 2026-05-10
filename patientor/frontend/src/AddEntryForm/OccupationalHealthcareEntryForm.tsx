import { useState, SyntheticEvent } from "react";
import { TextField, Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Box, OutlinedInput } from '@mui/material';
import { EntryWithoutId, Diagnosis } from "../types";

interface Props {
    addEntry: (entry: EntryWithoutId) => void;
    diagnoses: Diagnosis[];
    onCancel: () => void;
}

export default function OccupationalHealthcareEntryForm({ addEntry, diagnoses, onCancel }: Props) {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
    const [employerName, setEmployerName] = useState("");
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

    const onDiagnosisChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const { target: { value } } = event;
        setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
    };

    const submit = (event: SyntheticEvent) => {
        event.preventDefault();
        
        const entry: EntryWithoutId = {
            type: "OccupationalHealthcare",
            description,
            date,
            specialist,
            diagnosisCodes,
            employerName
        };

        if (sickLeaveStartDate || sickLeaveEndDate) {
            entry.sickLeave = {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate
            };
        }

        addEntry(entry);
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
            <TextField
                label="Employer Name"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
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
                <InputLabel>Sick Leave (Optional)</InputLabel>
                <Grid container spacing={2}>
                    <Grid size={{xs: 12, sm: 6}}>
                        <TextField
                            label="Start Date"
                            type="date"
                            fullWidth
                            value={sickLeaveStartDate}
                            onChange={({ target }) => setSickLeaveStartDate(target.value)}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid size={{xs: 12, sm: 6}}>
                        <TextField
                            label="End Date"
                            type="date"
                            fullWidth
                            value={sickLeaveEndDate}
                            onChange={({ target }) => setSickLeaveEndDate(target.value)}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                </Grid>
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
