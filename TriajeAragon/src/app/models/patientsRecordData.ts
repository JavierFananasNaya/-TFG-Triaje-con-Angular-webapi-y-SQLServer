import { PatientVariables } from "./patientVariables";

export class PatientsRecordData extends PatientVariables{
  id?: number;
  cause: string;
  patient_id: number;
  urgency_level: number;
  arrivalTime: Date;
}
