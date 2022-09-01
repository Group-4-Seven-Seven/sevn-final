import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { User } from 'src/app/user/models/user';
import { CartComponent } from 'src/app/user/pages/cart/cart.component';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm : FormGroup
  constructor(private fb : FormBuilder, private signupservice : SignupService, private router: Router) {

    this.signUpForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      gender: [''],
      email : [''],
      password: [''],
      userType : ['user'],
      active: [true]
    })
   }

  ngOnInit(): void {
  }

  signup(){
    const signup = this.signUpForm.value as User
    let res : any
    console.log(signup)
    let res1 = this.signupservice.signup(signup)
    let res2 = this.signupservice.openCart()
    let res3 = this.signupservice.openCheckOut()
    let res4 = this.signupservice.openPendingOrders()
    let res5 = this.signupservice.openActivation()
    forkJoin([res1,res2,res3,res4, res5]).subscribe(data =>{
      res = data[0]

      if(res.status == 201){
        alert("Your account is successfully created.")
        this.router.navigate(["/login"])
        this.signUpForm.reset()

      }
    },
    (error) => {
        alert("Something went wrong!")
        this.signUpForm.reset()
    })

        
  }

  LogIn() {
    this.router.navigate(['login']);
  }
}

