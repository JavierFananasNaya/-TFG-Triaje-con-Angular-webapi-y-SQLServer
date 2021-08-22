import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import {HomeComponent} from "./home/home.component";
import { LogInComponent } from './log-in/log-in.component';
// import {LoginComponent} from "./login/login.component";

// , canActivate: [ AuthorizatedGuard ]

const routes: Routes = [
  {path:'patients', component: PatientListComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LogInComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home'}

];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


