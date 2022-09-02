import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, switchMap } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

import { User } from 'src/app/user/models/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loginForm : FormGroup
  constructor(private fb : FormBuilder,
              private loginService : LoginService,
              private sharedService : SharedService,
              private router : Router) {

    this.loginForm = this.fb.group({
    email : ['',[Validators.compose([Validators.required, Validators.email])]],
    password : ['',[Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
    this.sharedService.hide();
  }

  login(){
    const login = this.loginForm.value as User
    console.log(login)
    let body :any
    let headers : any
    let status : any
    let account : User[]
    let activeStatus: any
    //calling the login API with user credentials
    this.loginService.login(login.email, login.password).pipe(
      switchMap((res)=>{
        body = {...res.body}
         status = res.status
          if(status == 200){
            //getting user details
             return this.loginService.getUser(login.email)
          }
        return EMPTY
      }),
      switchMap((data) =>{
        account = data
        //stored userID to be retreived by the service
          localStorage.setItem('userID', JSON.stringify(account[0].id))
        //stored user email to be retreived by the profile page
          localStorage.setItem('account', account[0].email)
          return this.loginService.getActiveStatus(account[0].id)
      }),
      switchMap((data)=>{
        activeStatus = data
        //check if the user is deactivated by the admin
        if(activeStatus.active && account[0].userType == "user"){
          localStorage.setItem('token', body.accessToken)
          localStorage.setItem('userType', account[0].userType)
          this.router.navigate(["user"])
        }else if(account[0].userType == "admin"){
          localStorage.setItem('token', body.accessToken)
          localStorage.setItem('userType', account[0].userType)
          this.router.navigate(["home"])
        }
        else{
          alert("Your account is temporarily deactivated!")
        }
        return EMPTY
      }),
      catchError((err) => {
           if(err.status === 400){
        alert("Wrong Email or Password. Please Try again!")
      }
      else{
        alert("Something went wrong")
      }
      return EMPTY
      })

    ).subscribe()
  }

  signUp() {
    this.router.navigate(['signup']);
  }
  
}
