import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AppRoutingModule } from './app-routing.module';

import { PatientServiceService } from './patient-service.service';
import { VitalServiceService } from './vital-service.service';
import { MedicalSpecialityServiceService } from './medicalSpeciality-service.service';
import { UserServiceService } from './users-service.service';
import { PatientsRecordServiceService } from './patientsRecord-service.service';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationService} from 'primeng/api';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TriajeFormComponent } from './triaje-form/triaje-form.component';
import { SpecificListComponent } from './specific-list/specific-list.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
// import { TriajeCovidFormComponent } from './triaje-covid-form/triaje-covid-form.component';


//PRIME NG MODULES

import {ListboxModule} from 'primeng/listbox';
import {DialogModule} from 'primeng/dialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {InputNumberModule} from 'primeng/inputnumber';
import {SliderModule} from 'primeng/slider';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TableModule} from 'primeng/table';
import { LogInComponent } from './log-in/log-in.component';
import {CardModule} from 'primeng/card';
import {PasswordModule} from 'primeng/password';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    // LoginComponent,
    HomeComponent,
    TriajeFormComponent,
    SpecificListComponent,
    LogInComponent,
    PatientInfoComponent,
    // TriajeCovidFormComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    ListboxModule,
    DialogModule,
    BrowserAnimationsModule,
    ConfirmPopupModule,
    InputNumberModule,
    SliderModule,
    RadioButtonModule,
    TableModule,
    CardModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    TooltipModule
  ],
  providers: [PatientServiceService,VitalServiceService, ConfirmationService, MedicalSpecialityServiceService, UserServiceService, PatientsRecordServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
