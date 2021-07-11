import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AppRoutingModule } from './app-routing.module';

import { PatientServiceService } from './patient-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationService} from 'primeng/api';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//PRIME NG MODULES

import {ListboxModule} from 'primeng/listbox';
import {DialogModule} from 'primeng/dialog';
import { TriajeFormComponent } from './triaje-form/triaje-form.component';
import {ConfirmPopupModule} from 'primeng/confirmpopup';

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    // LoginComponent,
    HomeComponent,
    TriajeFormComponent,

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
    ConfirmPopupModule
  ],
  providers: [PatientServiceService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
