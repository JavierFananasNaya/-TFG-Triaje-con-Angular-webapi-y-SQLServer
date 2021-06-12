import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';
import { PatientServiceService } from './patient-service.service';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [PatientServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
