import { Entry, Diagnosis, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from "../types";
import { assertNever } from "../utils";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';

const style = {
    border: '1px solid black',
    borderRadius: '5px',
    padding: '5px',
    marginBottom: '10px'
};

const DiagnosisList = ({ entry, diagnosisCodes }: { entry: Entry, diagnosisCodes: Diagnosis[] }) => {
    if (!entry.diagnosisCodes || entry.diagnosisCodes.length === 0) return null;
    return (
        <ul>
            {entry.diagnosisCodes.map(code => {
                const diagnosis = diagnosisCodes.find(d => d.code === code);
                return <li key={code}>{code} {diagnosis?.name}</li>;
            })}
        </ul>
    );
};

const HealthCheckEntryDetails = ({ entry, diagnosisCodes }: { entry: HealthCheckEntry, diagnosisCodes: Diagnosis[] }) => {
    const getHealthCheckIconColor = (rating: number) => {
        switch (rating) {
            case 0: return "green";
            case 1: return "yellow";
            case 2: return "orange";
            case 3: return "red";
            default: return "black";
        }
    };

    return (
        <div style={style}>
            <p>{entry.date} <MedicalServicesIcon /></p>
            <p style={{ fontStyle: 'italic' }}>{entry.description}</p>
            <FavoriteIcon style={{ color: getHealthCheckIconColor(entry.healthCheckRating) }} />
            <DiagnosisList entry={entry} diagnosisCodes={diagnosisCodes} />
            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};

const OccupationalHealthcareEntryDetails = ({ entry, diagnosisCodes }: { entry: OccupationalHealthcareEntry, diagnosisCodes: Diagnosis[] }) => {
    return (
        <div style={style}>
            <p>{entry.date} <WorkIcon /> <em>{entry.employerName}</em></p>
            <p style={{ fontStyle: 'italic' }}>{entry.description}</p>
            {entry.sickLeave && <p>Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>}
            <DiagnosisList entry={entry} diagnosisCodes={diagnosisCodes} />
            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};

const HospitalEntryDetails = ({ entry, diagnosisCodes }: { entry: HospitalEntry, diagnosisCodes: Diagnosis[] }) => {
    return (
        <div style={style}>
            <p>{entry.date} <LocalHospitalIcon /></p>
            <p style={{ fontStyle: 'italic' }}>{entry.description}</p>
            {entry.discharge && <p>Discharge: {entry.discharge.criteria} ({entry.discharge.date})</p>}
            <DiagnosisList entry={entry} diagnosisCodes={diagnosisCodes} />
            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};

export default function EntryDetails({ entry, diagnosisCodes }: { entry: Entry, diagnosisCodes: Diagnosis[] }) {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheckEntryDetails entry={entry} diagnosisCodes={diagnosisCodes} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryDetails entry={entry} diagnosisCodes={diagnosisCodes} />;
        case "Hospital":
            return <HospitalEntryDetails entry={entry} diagnosisCodes={diagnosisCodes} />;
        default:
            return assertNever(entry);
    }
}
