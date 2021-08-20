import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SpecialityListPatient } from '../models/SpecialityListPatient';
import { VitalServiceService } from '../vital-service.service';
import { MedicalSpecialityServiceService } from '../medicalSpeciality-service.service';

@Component({
  selector: 'specific-list',
  templateUrl: './specific-list.component.html',
  styleUrls: ['./specific-list.component.css'],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SpecificListComponent implements OnInit {
@Input() typeOfList: number = -1;
@Input() listOfPatients: SpecialityListPatient[] = [];
selectedPatient: SpecialityListPatient;

patientListCols: any[];

  constructor() {

    this.patientListCols = [
      { field: 'surname', header: 'Apellidos' },
      { field: 'name', header: 'Nombre' },
      { field: 'arrival_time', header: 'Hora de llegada' },
      { field: 'urgency_level', header: 'Nivel de urgencia' }
    ]
   }

  ngOnInit(): void {

  }

  closeModal(){
    this.listOfPatients = [];
  }


}
