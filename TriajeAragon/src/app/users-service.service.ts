import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { SpecialityListPatient } from 'src/app/models/SpecialityListPatient';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  readonly APiUrl = "https://localhost:44388/api";

  constructor(private http:HttpClient) {}

    checkUser(userToCheck: User){
      return this.http.post<User[]>(this.APiUrl+'/users',userToCheck);
    }

}
