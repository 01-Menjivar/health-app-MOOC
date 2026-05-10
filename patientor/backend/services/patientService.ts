import type { NonSensitivePatient, NewPatient, Patient, EntryWithoutId, Entry } from "../types.ts";
import patients from "../data/patients.ts";
import { v1 as uuid } from 'uuid';

const getPatients = () : NonSensitivePatient[] =>{
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatientById = (id: string): Patient | undefined =>{
    return patients.find(p => p.id === id);
};

const addPatient = (object: NewPatient): Patient =>{
    const id = uuid().toString();
    const newPatient: Patient = {
        id,
        ...object,
        entries: []
    };

    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patientId: string, entryWithoutId: EntryWithoutId): Entry | undefined => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return undefined;
    
    const newEntry: Entry = {
        id: uuid().toString(),
        ...entryWithoutId
    };
    
    patient.entries.push(newEntry);
    return newEntry;
};

export default{
    getPatients,
    addPatient,
    getPatientById,
    addEntry
};