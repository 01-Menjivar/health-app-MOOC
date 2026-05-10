import { useState, SyntheticEvent } from "react";
import { TextField, Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Box, OutlinedInput } from '@mui/material';
import { EntryWithoutId, Diagnosis } from "../types";

interface Props {
    addEntry: (entry: EntryWithoutId) => void;
    diagnoses: Diagnosis[];
    onCancel: () => void;
}

export default function HospitalEntryForm({ addEntry, diagnoses, onCancel }: Props) {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
    const [dischargeDate, setDischargeDate] = useState("");
    const [dischargeCriteria, setDischargeCriteria] = useState("");

    const onDiagnosisChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const { target: { value } } = event;
        setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
    };

    const submit = (event: SyntheticEvent) => {
        event.preventDefault();
        addEntry({
            type: "Hospital",
            description,
            date,
            specialist,
            diagnosisCodes,
            discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria
            }
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
                <InputLabel>Discharge</InputLabel>
                <Grid container spacing={2}>
                    <Grid size={{xs: 12, sm: 6}}>
                        <TextField
                            label="Discharge Date"
                            type="date"
                            fullWidth
                            value={dischargeDate}
                            onChange={({ target }) => setDischargeDate(target.value)}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid size={{xs: 12, sm: 6}}>
                        <TextField
                            label="Discharge Criteria"
                            fullWidth
                            value={dischargeCriteria}
                            onChange={({ target }) => setDischargeCriteria(target.value)}
                            margin="normal"
                            required
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
