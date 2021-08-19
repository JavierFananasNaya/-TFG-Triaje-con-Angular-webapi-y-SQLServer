import { Component, OnInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';
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
  displayTriaje: boolean = false;

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
        let newPat:Patient = pat;
        this.patientList.push(newPat);
      });
    });
  }

  openTriajeModal(){
    this.displayTriaje = true;
  }

  maximizeDialog(dialog: Dialog){
    dialog.maximize();
  }

  closeTriajeForm(event){
    this.displayTriaje = false;
    this.selectedPatient = null;
  }

  deletePatient(event: number){
    let newPatientList = [];
    this.patientList.forEach(patient => {
      if(patient.id !== event){
        newPatientList.push(patient);
      }
    });
    this.patientList = newPatientList;
  }

  ngOnInit(): void {}
}
