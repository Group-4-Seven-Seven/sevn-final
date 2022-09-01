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
    // this.loginService.login(login.email, login.password).subscribe(res => {
    //   body = {...res.body}
    //   status = res.status
    // if(status === 200){
    //   alert("Login successful")
    //   localStorage.setItem('token', body.accessToken)
    // //   this.loginService.getUser(login.email).subscribe(data => {account = data})
    // // //this.loginService.getUser(login.email).subscribe(data => console.log(data))
    // //   // localStorage.setItem('userType', account.userType)
    // //  console.log(account)
    // }
    // },
    // (error) => {
    //   if(error.status === 400){
    //     alert("Wrong Email or Password. Please Try again!")
    //   }
    //   else{
    //     alert("Something went wrong")
    //   }
    // }

    // )
    // if(localStorage.getItem('token')){
    //   let account
    //   this.loginService.getUser(login.email).subscribe(data => console.log(data))

    // }

    this.loginService.login(login.email, login.password).pipe(
      switchMap((res)=>{
        body = {...res.body}
         status = res.status
         console.log(status)
          // localStorage.setItem('token', body.accessToken)
          // return this.loginService.getUser(login.email)

          if(status == 200){
          //  localStorage.setItem('token', body.accessToken)
             return this.loginService.getUser(login.email)
          }




        return EMPTY
      }),
      switchMap((data) =>{
        account = data


        //localStorage.setItem('userType', account[0].userType)
          localStorage.setItem('userID', JSON.stringify(account[0].id))
          localStorage.setItem('account', account[0].email)
        //  this.router.navigate(["user"])



        return this.loginService.getActiveStatus(account[0].id)
      }),
      switchMap((data)=>{
        activeStatus = data
        if(activeStatus.active){
          localStorage.setItem('token', body.accessToken)
          localStorage.setItem('userType', account[0].userType)
          this.router.navigate(["user"])
        }else{
          alert("Your account is temporarily deacctivated!")
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
