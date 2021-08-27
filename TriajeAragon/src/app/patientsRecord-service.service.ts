import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { SpecialityListPatient } from 'src/app/models/SpecialityListPatient';
import { PatientsRecordData } from './models/patientsRecordData';

@Injectable({
  providedIn: 'root'
})
export class PatientsRecordServiceService {

  readonly APiUrl = "https://localhost:44388/api";

  constructor(private http:HttpClient) {}
    getPatientList():Observable<any[]>{
      return this.http.get<PatientsRecordData[]>(this.APiUrl+'/patientsrecord');
    }

    addPatientToMedicalSpeciality(patientToAdd:PatientsRecordData){
      return this.http.put(this.APiUrl+'/patientsrecord',patientToAdd);
    }
}
