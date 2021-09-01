import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Patient } from '../models/patient';
import { PatientsRecordData } from '../models/patientsRecordData';
import { PatientsRecordServiceService } from '../patientsRecord-service.service';

@Component({
  selector: 'patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit, OnChanges {

  @Input() patient: Patient;
  patientRecord: PatientsRecordData[];
  recordsCols: any[];

  constructor(private patientsRecordService: PatientsRecordServiceService) {
    this.patient = new Patient();
    this.recordsCols = [
      { field: 'arrivalTime', header: 'Fecha' },
      { field: 'cause', header: 'Motivo' },
      { field: 'urgency_level', header: 'Nivel de urgencia' },
      { field: 'temperatura', header: 'Temperatura' },
      { field: 'oSaturation', header: 'Saturación de oxígeno' },
      { field: 'sistolePreasure', header: 'Presión sistólica' },
      { field: 'diastolePreasure', header: 'Presión diastólica' }
    ]
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if(changes.patient.currentValue !== null && changes.patient.currentValue.id){
      this.patientsRecordService.getRecordFromPatient(this.patient).subscribe(result =>{
        this.patientRecord = result;
        console.log(this.patientRecord);
      });
    }
  }

}
