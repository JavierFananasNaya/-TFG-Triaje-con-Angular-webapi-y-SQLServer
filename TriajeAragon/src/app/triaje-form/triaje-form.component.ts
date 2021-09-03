import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Patient } from '../models/patient';
import { PatientVariables } from '../models/patientVariables';
import { PatientsRecordData } from '../models/patientsRecordData';
import { SpecialityListPatient } from '../models/SpecialityListPatient';
import { PatientServiceService } from '../patient-service.service';
import { VitalServiceService } from '../vital-service.service';
import { MedicalSpecialityServiceService } from '../medicalSpeciality-service.service';
import { PatientsRecordServiceService } from '../patientsRecord-service.service';
import { PatientInfoComponent } from '../patient-info/patient-info.component';


@Component({
  selector: 'triaje-form',
  templateUrl: './triaje-form.component.html',
  styleUrls: ['./triaje-form.component.css'],
})
export class TriajeFormComponent implements OnInit {
  @Input() patient: Patient;
  @Output() closeEvent = new EventEmitter<boolean>();
  @Output() deletePatientFromList = new EventEmitter<number>();
  @ViewChild('infoComponent') infoComponent: PatientInfoComponent;

  quickQuestions: boolean;
  finalResponse: boolean;
  evaScale:boolean;
  displayPatientInfo: boolean;
  step: number;
  reason: string; // La razón por la que el paciente ha acudido a urgencias.

  // booleans to control the decision over the quick questions
  breathing: boolean;
  conscious: boolean;
  accident: boolean;
  closeForm: boolean;

  destination: string;
  urgencyLevels: any[];
  patientLevel: any;
  questions: any[];
  evaScaleValue: number;
  evaScaleOptions: any[];
  specialityListPatient: SpecialityListPatient;
  recordsPatient: PatientsRecordData;

  patientVariables: PatientVariables;

  constructor( private confirmationService: ConfirmationService, private patientService: PatientServiceService, private vitalServiceService: VitalServiceService, private medicalSpecialityServiceService: MedicalSpecialityServiceService, private patientsRecordServiceService: PatientsRecordServiceService) {
    this.patient = new Patient();
    this.specialityListPatient = new SpecialityListPatient(); // Usaremos este objeto para registrar al paciente en la lista
    this.patientVariables = new PatientVariables();
    this.recordsPatient = new PatientsRecordData();
    this.evaScaleOptions = [
      {name:'0', value: 0},
      {name:'1', value: 1},
      {name:'2', value: 2},
      {name:'3', value: 3},
      {name:'4', value: 4},
      {name:'5', value: 5},
      {name:'6', value: 6},
      {name:'7', value: 7},
      {name:'8', value: 8},
      {name:'9', value: 9},
      {name:'10', value: 10}
    ];

    this.urgencyLevels = [
      { label: 'ASISTENCIA INMEDIATA', level: 1, color: '#d92f23'},
      { label: 'MUY URGENTE', level: 2, color: '#de5f2d' },
      { label: 'URGENTE', level: 3, color: '#f6ca22' },
      { label: 'Urgencia menor', level: 4, color: '#009444' },
      { label: 'Sin Urgencia', level: 5, color: '#354a96' },
    ];

    this.questions = [
      {
        question: '¿El paciente respira con normalidad?',
        options: [
          { label: 'Sí', value: true },
          { label: 'No', value: false },
        ],
      },
      {
        question: '¿El paciente se encuentra consciente?',
        options: [
          { label: 'Sí', value: true },
          { label: 'No', value: false },
        ],
      },
      {
        question: '¿El paciente ha sufrido algún tipo de accidente?',
        options: [
          { label: 'Sí', value: true },
          { label: 'No', value: false },
        ],
      },
      {
        question: '¿Qué tipo de accidente ha sufrido el paciente?',
        options: [
          { label: 'Politraumatismo', value: true },
          { label: 'Gran Quemado', value: true },
          { label: 'Atragantamiento', value: true },
          { label: 'Hemorragia masiva', value: true },
        ],
      },
      {
        question: '¿El paciente ha sufrido algún tipo de agresión?',
        options: [
          { label: 'Sí', value: true },
          { label: 'No', value: false },
        ],
      },
      {
        question: '¿Qué tipo de agresión ha sufrido el paciente?',
        options: [
          { label: 'Herida de arma de fuego', value: true },
          { label: 'Herida de arma blanca', value: true },
          { label: 'Agresión física', value: false },
          { label: 'Agresión sexual', value: false },
        ],
      },
    ];
  }

  ngOnInit(): void {
    this.quickQuestions = true;
    this.finalResponse = false;
    this.evaScale = false;
    this.closeForm = false;
    this.displayPatientInfo = false;
    this.reason = '';

    this.evaScaleValue = 0;
    this.patientLevel = this.urgencyLevels[this.urgencyLevels.length - 1];
    this.step = 0;
    this.destination = '';
  }

  nextStep(question: any) {
    switch (this.step) {
      case 0: {
        // Breathing
        if (question.value === true) {
          this.breathing = true;
          this.step = 1;
          break;
        } else {
          this.breathing = false;
          this.step = 1;
          break;
        }
      }
      case 1: {
        // Conscious
        if (question.value === true) {
          this.conscious = true;
          this.step = 2;
          break;
        } else {
          this.conscious = false;
          this.sendTovitalDepartment();
          this.updateReason(question);
          break;
        }
      }
      case 2: {
        // Accident
        if (question.value === true) {
          this.accident = true;
          this.step = 3; // Cause of the accident screen
          break;
        } else {
          this.accident = false;
          this.step = 4; // agression question
          break;
        }
      }
      case 3: {
        // Cause of the accident
        this.sendTovitalDepartment();
        this.updateReason(question);
        break;
      }
      case 4: {
        // Agression
        if (question.value === true) {
          this.accident = true;
          this.step = 5; // agression question
          break;
        } else {
          this.accident = false;
          this.quickQuestions = false; // Start of normal triaje
          break;
        }
      }
      case 5: {
        // Type of agression
        if(question.value === true){
          this.sendTovitalDepartment();
          this.updateReason(question);
        }else{
          this.sendToMedicalSpeciallityUrgent();
          this.updateReason(question);
        }
      }
    }
  }

  updateReason(question: any) { // Actualiza la razón de acudir a urgencia antes de derivar al paciente
    if(this.breathing === false){
      this.reason += 'El paciente no respira con normalidad. ';
    }
    if( this.conscious === false){
      this.reason += 'El paciente no se encuentra consciente. ';
    }
    // Después de comprobar su estado se añade la causa
    if(this.patientLevel.level <= 3){
      if(this.conscious === true){
        this.reason += question.label+'.';
      }
    }else{
      this.reason += 'Molestia general menor.'
    }
    console.log(this.reason);
  }

  previousStep() {
    if (this.step > 0) {
      if (this.step === 4) {
        // Controla que de la pregunta de la agresión pase a la pregunta del accidente y no a las causas del accidente
        this.step = 2;
      } else {
        this.step--;
        switch (this.step){
          case 1:{
            this.conscious = false;
            break;
          }
          case (3 || 5): {
            this.reason = '';
            break;
          }
        }
      }

    }
  }

  sendTovitalDepartment() {
    this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 1)];
    this.destination = 'Vitales';
    this.quickQuestions = false;
    this.finalResponse = true;
  }

  sendToMedicalSpeciallityUrgent(){
    this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 3)];
    this.destination = 'Especialidad Médica';
    this.quickQuestions = false;
    this.finalResponse = true;
  }

  checkVariables(){
    this.destination = 'Especialidad Médica';

    if(this.patientVariables.temperature){
      if((this.patientVariables.temperature > 37) && (this.patientVariables.temperature < 38)){
        this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 3)];
        this.reason += 'Fiebre. ';
      }else if(this.patientVariables.temperature > 39){
        this.reason += 'Fiebre  excesivamente alta. ';
        this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 2)];
      }
    }

    if(this.patientVariables.oSaturation && this.patientVariables.oSaturation < 95 && this.patientLevel.level > 2){
      this.reason += 'Baja saturación de oxígeno en sangre. ';
      this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 2)];
    }

    if(this.patientVariables.heartRate && this.patientVariables.heartRate > 120 && this.patientLevel.level > 2){
      this.reason += 'Frecuencia cardiaca alta. ';
      this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 2)];
    }

    if(this.patientVariables.sistolePreasure && this.patientVariables.diastolePreasure){
      if((this.patientVariables.sistolePreasure < 80 && this.patientVariables.diastolePreasure < 60) && this.patientLevel.level > 3){
        this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 3)];
        this.reason += 'Presión sanguínea atípica. ';
      }else if((this.patientVariables.sistolePreasure >= 160 && this.patientVariables.sistolePreasure < 180) && (this.patientVariables.diastolePreasure >= 100 && this.patientVariables.diastolePreasure < 180) && this.patientLevel.level > 2){
        this.reason += 'Presión sanguínea alarmante. ';
        this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 2)];
      }else if(this.patientVariables.sistolePreasure >= 180 && this.patientVariables.diastolePreasure > 110 && this.patientLevel.level > 1){
        this.reason += 'Presión sanguínea excesivamente urgente. ';
        this.sendTovitalDepartment();
      }
    }

    // Después de comprobar todas las constantes abriremos la pantalla de escala EVA de dolor
    // unicamente si el nivel de urgencia es amarillo (urgente) o inferior
    if(this.patientLevel.level >= 3){
      //Activamos valorar escala EVA
      this.evaScale = true;
    }else{
      this.finalResponse = true;
    }
  }

  checkEvaScale(){
      if(this.evaScaleValue < 7){
        let evaQuestion = {label: 'Molestia general menor.', value: true};
        this.updateReason(evaQuestion);
        this.finalResponse = true;
        this.evaScale = false;
        return;
      }
      if (this.evaScaleValue >= 7 && this.evaScaleValue <= 8) {
        //Nivel de urgencia urgente
        this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 3)];
        let evaQuestion = {label: 'Molestia moderada', value: true};
        this.updateReason(evaQuestion);
        this.finalResponse = true;
        this.evaScale = false;
        return;
      }
      if(this.evaScaleValue > 8) {
        //Nivel de urgencia muy urgente
        let evaQuestion = {label: 'Molestia aguda', value: true};
        this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 2)];
        this.updateReason(evaQuestion);
        this.finalResponse = true;
        this.evaScale = false;
        return;
      }
  }

  backToTriaje(){
    this.ngOnInit();
  }

  closeFormFunction(){
    this.resetTriaje();
    this.closeForm = true;
    this.closeEvent.emit(this.closeForm);
  }

  resetTriaje(){
    this.quickQuestions = true;
    this.finalResponse = false;
    this.evaScale = false;
    this.evaScaleValue = 0;
    this.specialityListPatient = new SpecialityListPatient();
    this.patientVariables = new PatientVariables();
    this.patientLevel = this.urgencyLevels[this.urgencyLevels.length - 1];
    this.step = 0;
    this.reason = '';
    this.destination = '';
  }

  endTriaje(){
    this.buildRecordPatient();
    this.addPatientToRecord();
    this.specialityListPatient.urgencyLevel = this.patientLevel.level;
    this.specialityListPatient.patient_id = this.patient.id;
    this.specialityListPatient.arrivalTime = new Date();
    // Comprobamos si se le envía a especialidad médica o a vitales
    if(this.destination === "Especialidad Médica"){
      this.medicalSpecialityServiceService.addPatientToMedicalSpeciality(this.specialityListPatient).subscribe();
    }else if(this.destination === "Vitales"){
      this.vitalServiceService.addPatientToVital(this.specialityListPatient).subscribe();
    }
    this.deletePatientFromList.emit(this.patient.id);
    this.closeFormFunction();
  }

  addPatientToRecord(){
    this.buildRecordPatient();
    this.patientsRecordServiceService.addPatientToMedicalSpeciality(this.recordsPatient).subscribe(result =>{
      this.resetTriaje();
    });
  }

  buildRecordPatient(){
    this.recordsPatient.patient_id = this.patient.id;
    this.recordsPatient.urgency_level = this.patientLevel.level;
    this.recordsPatient.arrivalTime = new Date();
    this.recordsPatient.cause = this.reason;
    if(this.patientVariables.oSaturation && (typeof this.patientVariables.oSaturation !== 'undefined')){
      this.recordsPatient.oSaturation = this.patientVariables.oSaturation;
    }else{
      this.recordsPatient.oSaturation = null;
    }
    if(this.patientVariables.temperature && (typeof this.patientVariables.temperature !== 'undefined')){
      this.recordsPatient.temperature = this.patientVariables.temperature;
    }else{
      this.recordsPatient.temperature = null;
    }
    if(this.patientVariables.sistolePreasure && (typeof this.patientVariables.sistolePreasure !== 'undefined')){
      this.recordsPatient.sistolePreasure = this.patientVariables.sistolePreasure;
    }else{
      this.recordsPatient.sistolePreasure = null;
    }
    if(this.patientVariables.diastolePreasure && (typeof this.patientVariables.diastolePreasure !== 'undefined')){
      this.recordsPatient.diastolePreasure = this.patientVariables.diastolePreasure;
    }else{
      this.recordsPatient.diastolePreasure = null;
    }
    console.log(this.recordsPatient);
  }
  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target,
        message: '¿Desea abandonar el triaje de este paciente?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.closeFormFunction();
        },
        reject: () => {
           return;
        }
    });
  }
  showPatientInfo(){
    this.displayPatientInfo = true;
    this.infoComponent.getPatientInfo();
  }
}
