import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { Patient } from 'src/app/models/patient';
import { MedicalSpecialityServiceService } from '../medicalSpeciality-service.service';
import { SpecialityListPatient } from '../models/SpecialityListPatient';
import { User } from '../models/user';
import { PatientServiceService } from '../patient-service.service';
import { VitalServiceService } from '../vital-service.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {

  currentUser: User;

  specificListOfPatients: SpecialityListPatient[] = [];
  patientList: Patient[];
  selectedPatient: Patient;
  displayTriaje: boolean = false;
  displaySpecificList: boolean = false;
  typeOfList: number = -1;

  constructor(private patientService: PatientServiceService, private vitalServiceService: VitalServiceService, private medicalSpecialityServiceService:MedicalSpecialityServiceService, private router: Router, private confirmationService: ConfirmationService) {
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
        if(this.patientList.findIndex(x => x.id === newPat.id) !== -1){
          this.getSinglePatient();
        }else{
          this.patientList.push(newPat);
        }
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

  openSpecificPatientList(typeNumber: number){
    if(typeNumber === 0){
      this.vitalServiceService.getPatientList().subscribe(result =>{
        this.specificListOfPatients = result;
        this.displaySpecificList = true;
      })
    }else if(typeNumber === 1){
      this.medicalSpecialityServiceService.getPatientList().subscribe(result => {
        this.specificListOfPatients = result;
        this.displaySpecificList = true;
      })
    }
  }
  closeSpecificPatientList(){
    this.typeOfList = -1;
    this.displaySpecificList = false;
  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser === null){
      this.router.navigate(['/login']);
    }
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target,
        message: '¿Desea cerrar sesión?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.logout();
        },
        reject: () => {
           return;
        }
    });
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
