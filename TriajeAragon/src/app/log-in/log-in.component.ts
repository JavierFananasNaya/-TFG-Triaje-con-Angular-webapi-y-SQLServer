import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserServiceService } from '../users-service.service';
import { Config } from '../utils/config';
import * as CryptoJS from "crypto-js"


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user : User;
  passwordInput: string;
  error: string = '';



  constructor(private userServiceService: UserServiceService, private router: Router) {
    this.user = new User();


   }

  ngOnInit(): void {
  }

  logIn(loginForm: NgForm){

    if(!loginForm.valid){
      return;
    }else{
      // this.user.password = this.encryptPassword(this.passwordInput);
      this.checkUser();
    }
  }

  checkUser(){
    this.userServiceService.checkUser(this.user).subscribe(result =>{
      if(result.length > 0){
        if(this.checkPassword(result[0].password)){
          localStorage.setItem('currentUser', JSON.stringify(result[0]));
        this.router.navigate(['/patients']);
        this.error = '';
        }else{
          this.error = 'Usuario o contraseña incorrectos. Por favor, revise sus datos e intentelo de nuevo.'
        }
      }else{ // Si el usuario no existe también debemos sacar el error.
        this.error = 'Usuario o contraseña incorrectos. Por favor, revise sus datos e intentelo de nuevo.'
      }
    });
  }

  checkPassword(passwordToCheck: string):boolean{
    let decryptedPassword = CryptoJS.AES.decrypt(passwordToCheck.trim(), Config.encryptKey.trim()).toString(CryptoJS.enc.Utf8);
    if(decryptedPassword === this.passwordInput){
      return true;
    }else{
      return false;
    }
  }

}
