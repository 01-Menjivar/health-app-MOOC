import express, {type Response, type Request, type NextFunction} from 'express';
import patientService from '../services/patientService.ts';
import type { NonSensitivePatient, NewPatient, Patient, Entry, EntryWithoutId } from '../types.ts';
import {z} from 'zod';
import { NewPatientSchema, EntryWithoutIdSchema } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res:Response<NonSensitivePatient[]>) => {
    return res.send(patientService.getPatients());
});

router.get('/:id', (req, res:Response<Patient>) => {
    const patient = patientService.getPatientById(req.params.id);
    if(patient){
        res.send(patient);
    }else{
      res.status(404).send();
    }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) =>{
  try{
    NewPatientSchema.parse(req.body);
    next();
  }catch(error: unknown){
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) =>{
  if(error instanceof z.ZodError){
    res.status(400).send({error: error.issues});
  }else{
    next(error);
  }
};

router.post('/',newPatientParser,(req:Request<unknown, unknown, NewPatient>, res:Response<Patient>) =>{
        const addedPatient = patientService.addPatient(req.body);
        res.json(addedPatient);
});

const newEntryParser = (req: Request, _res: Response, next: NextFunction) =>{
  try{
    EntryWithoutIdSchema.parse(req.body);
    next();
  }catch(error: unknown){
    next(error);
  }
};

router.post('/:id/entries', newEntryParser, (req: Request<{id: string}, unknown, EntryWithoutId>, res: Response<Entry>) => {
  const addedEntry = patientService.addEntry(req.params.id, req.body);
  if(addedEntry) {
    res.json(addedEntry);
  } else {
    res.status(404).send();
  }
});

router.use(errorMiddleware);

export default router;