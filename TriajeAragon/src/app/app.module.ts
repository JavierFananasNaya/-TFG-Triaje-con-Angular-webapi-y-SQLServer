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
// import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

//PRIME NG MODULES

import {ListboxModule} from 'primeng/listbox';

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    // LoginComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    ListboxModule
  ],
  providers: [PatientServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
