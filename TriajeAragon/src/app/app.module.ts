import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';
import { PatientServiceService } from './patient-service.service';
import { AppComponent } from './app.component';

import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientListComponent } from './patient-list/patient-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    HttpClient,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [PatientServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
