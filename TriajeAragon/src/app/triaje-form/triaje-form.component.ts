import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Patient } from '../models/patient';
import { PatientVariables } from '../models/patientVariables';
import { SpecialityListPatient } from '../models/SpecialityListPatient';
import { PatientServiceService } from '../patient-service.service';


@Component({
  selector: 'triaje-form',
  templateUrl: './triaje-form.component.html',
  styleUrls: ['./triaje-form.component.css'],
})
export class TriajeFormComponent implements OnInit {
  @Input() patient: Patient;
  @Output() closeEvent = new EventEmitter<boolean>();
  @Output() deletePatientFromList = new EventEmitter<number>();

  quickQuestions: boolean;
  finalResponse: boolean;
  evaScale:boolean;
  step: number;

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

  patientVariables: PatientVariables;

  constructor( private confirmationService: ConfirmationService, private patientService: PatientServiceService) {
    this.patient = new Patient();
    this.specialityListPatient = new SpecialityListPatient(); // Usaremos este objeto para registrar al paciente en la lista
    this.patientVariables = new PatientVariables();

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
          { label: 'Física', value: true },
          { label: 'Sexual', value: true },
        ],
      },
    ];
  }

  ngOnInit(): void {
    this.quickQuestions = true;
    this.finalResponse = false;
    this.evaScale = false;
    this.closeForm = false;

    this.evaScaleValue = 0;
    this.patientLevel = this.urgencyLevels[this.urgencyLevels.length - 1];
    this.step = 0;
    this.destination = '';
  }

  nextStep(answer: boolean) {
    switch (this.step) {
      case 0: {
        // Breathing
        if (answer === true) {
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
        if (answer === true) {
          this.conscious = true;
          this.step = 2;
          break;
        } else {
          this.conscious = false;
          this.sendTovitalDepartment();
          break;
        }
      }
      case 2: {
        // Accident
        if (answer === true) {
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
        break;
      }
      case 4: {
        // Agression
        if (answer === true) {
          this.accident = true;
          this.step = 5; // type of agression
          break;
        } else {
          this.accident = false;
          this.quickQuestions = false; // Start of normal triaje
          break;
        }
      }
    }
  }

  previousStep() {
    if (this.step > 0) {
      if (this.step === 4) {
        // Controla que de la pregunta de la agresión pase a la pregunta del accidente y no a las causas del accidente
        this.step = 2;
      } else {
        this.step--;
      }
    }
  }

  sendTovitalDepartment() {
    this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 1)];
    this.destination = 'Vitales';
    this.quickQuestions = false;
    this.finalResponse = true;
  }

  checkVariables(){
    this.destination = 'Especialidad Médica';

    if(this.patientVariables.temperature){
      if((this.patientVariables.temperature > 37) && (this.patientVariables.temperature < 38)){
        this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 3)];
      }else if(this.patientVariables.temperature > 39){
        this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 2)];
      }
    }

    if(this.patientVariables.oSaturation && this.patientVariables.oSaturation < 95 && this.patientLevel.level > 2){
      this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 2)];
    }

    if(this.patientVariables.heartRate && this.patientVariables.heartRate > 120 && this.patientLevel.level > 2){
      this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 2)];
    }

    if(this.patientVariables.sistolePreasure && this.patientVariables.diastolePreasure){
      if((this.patientVariables.sistolePreasure < 80 && this.patientVariables.diastolePreasure < 60) && this.patientLevel.level > 3){
        this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 3)];
      }else if((this.patientVariables.sistolePreasure >= 160 && this.patientVariables.sistolePreasure < 180) && (this.patientVariables.diastolePreasure >= 100 && this.patientVariables.diastolePreasure < 180) && this.patientLevel.level > 2){
        this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 2)];
      }else if(this.patientVariables.sistolePreasure >= 180 && this.patientVariables.diastolePreasure > 110 && this.patientLevel.level > 1){
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
        this.finalResponse = true;
        this.evaScale = false;
        return;
      }
      if (this.evaScaleValue >= 7 && this.evaScaleValue <= 8) {
        //Nivel de urgencia urgente
        this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 3)];
        this.finalResponse = true;
        this.evaScale = false;
        return;
      }
      if(this.evaScaleValue > 8) {
        //Nivel de urgencia muy urgente
        this.patientLevel = this.urgencyLevels[this.urgencyLevels.findIndex(x => x.level === 2)];
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
    this.destination = '';
  }

  endTriaje(){
    this.specialityListPatient.urgencyLevel = this.patientLevel.level;
    this.specialityListPatient.patient_id = this.patient.id;
    this.specialityListPatient.arrivalTime = new Date();
    console.log(this.specialityListPatient);
    // Comprobamos si se le envía a especialidad médica o a vitales
    if(this.destination === "Especialidad Médica"){
      this.patientService.addPatientToMedicalSpeciality(this.specialityListPatient).subscribe();
    }else if(this.destination === "Vitales"){
      this.patientService.addPatientToVital(this.specialityListPatient).subscribe();
    }
    this.deletePatientFromList.emit(this.patient.id);
    this.closeFormFunction();
    console.log('PROGRAMAR EL FINAL DE TRIAJE. Añadir a la lista de espera correspondiente PERRO');
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
}
