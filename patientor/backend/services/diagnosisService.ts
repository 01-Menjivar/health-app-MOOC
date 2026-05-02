import data from "../data/diagnoses.ts";
import type { Diagnosis } from "../types.ts";

const getDiagnoses = (): Diagnosis[] =>{
    return data;
};

export default{
    getDiagnoses
};