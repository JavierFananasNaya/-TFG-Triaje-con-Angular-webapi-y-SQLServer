import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { SpecialityListPatient } from 'src/app/models/SpecialityListPatient';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {

  readonly APiUrl = "https://localhost:44388/api";

  constructor(private http:HttpClient) {}
    getPatientList():Observable<any[]>{
      return this.http.get<Patient[]>(this.APiUrl+'/patient');
    }

    getRandomPatient():Observable<any[]>{
      return this.http.get<Patient[]>(this.APiUrl+'/SinglePatient');
    }

    addPatient(patient:any){
      return this.http.post(this.APiUrl+'/patient',patient);
    }

    updatePatient(patient:any){
      return this.http.put(this.APiUrl+'/patient',patient);
    }

    deletePatient(patientId:any){
      return this.http.delete(this.APiUrl+'/patient',patientId);
    }
}
