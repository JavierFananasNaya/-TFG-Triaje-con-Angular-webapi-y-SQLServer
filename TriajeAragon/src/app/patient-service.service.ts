import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {

  readonly APiUrl = "https://localhost:44388/api";

  constructor(private http:HttpClient) {}
    getPatientList():Observable<any[]>{
      return this.http.get<any>(this.APiUrl+'/patient');
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
