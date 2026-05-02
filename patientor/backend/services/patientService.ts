import type { PatientFiltered, NewPatient, Patient } from "../types.ts";
import patients from "../data/patients.ts";
import { v1 as uuid } from 'uuid';

const getPatients = () : PatientFiltered[] =>{
    return patients.map(p =>({
        id: p.id,
        name: p.name,
        dateOfBirth: p.dateOfBirth,
        gender: p.gender,
        occupation: p.occupation
    }));
};

const addPatient = (object: NewPatient): Patient =>{
    const id = uuid();
    const newPatient: Patient = {
        id,
        ...object
    };

    patients.push(newPatient);
    return newPatient;
};

export default{
    getPatients,
    addPatient
};