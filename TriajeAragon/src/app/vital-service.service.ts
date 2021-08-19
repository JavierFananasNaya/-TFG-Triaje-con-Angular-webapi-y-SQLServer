import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { SpecialityListPatient } from 'src/app/models/SpecialityListPatient';

@Injectable({
  providedIn: 'root'
})
export class VitalServiceService {

  readonly APiUrl = "https://localhost:44388/api";

  constructor(private http:HttpClient) {}
    getPatientList():Observable<any[]>{
      return this.http.get<Patient[]>(this.APiUrl+'/vital');
    }

    addPatientToVital(patientToAdd:SpecialityListPatient){
      return this.http.post(this.APiUrl+'/vital',patientToAdd);
    }
}
