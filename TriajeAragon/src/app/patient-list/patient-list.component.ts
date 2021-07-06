import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientServiceService } from '../patient-service.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  patientList: Patient[];
  selectedPatient: Patient;

  constructor(private patientService: PatientServiceService) {
    this.patientList = [];
    this.selectedPatient = null;
    this.patientService.getRandomPatient().subscribe((result) => {
      this.patientList = result;
    });
  }

  getSinglePatient(){
    this.patientService.getRandomPatient().subscribe((result) =>{
      result.forEach(pat => {
        console.log('a');
        let newPat:Patient = pat;
        this.patientList.push(newPat);
      });
      console.log(this.patientList);
    });
  }

  ngOnInit(): void {}
}
