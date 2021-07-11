import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../models/patient';

@Component({
  selector: 'triaje-form',
  templateUrl: './triaje-form.component.html',
  styleUrls: ['./triaje-form.component.css'],
})
export class TriajeFormComponent implements OnInit {
  @Input() patient: Patient;

  quickQuestions: boolean;
  step: number;
  breathing: boolean;
  conscious: boolean;
  accident: boolean;

  questions: any[];

  constructor() {
    this.patient = new Patient();
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
    this.step = 0;
  }

  nextStep(answer: boolean) {
    console.log(this.step);
    switch (this.step) {
      case 0: {
        // Breathing
        if (answer === true) {
          this.breathing = true;
          this.step = 1;
          console.log(this.step);
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
    if(this.step > 0){
      if(this.step === 4){ // Controla que de la pregunta de la agresión pase a la pregunta del accidente y no a las causas del accidente
        this.step = 2;
      }else{
        this.step--;
      }
    }
  }

  sendTovitalDepartment() {
    console.log('Patient goes to vital department');
  }
}
