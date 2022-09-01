import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user/models/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http : HttpClient) { }

  signup(user : User){
    return this.http.post("http://localhost:3000/register",user, {observe : 'response'} )
  }

  openCart(){
    return this.http.post("http://localhost:3000/carts", {carts:[]})
  }
  openCheckOut(){
    return this.http.post("http://localhost:3000/checkouts", {checkouts:[]})
  }
  openPendingOrders(){
    return this.http.post("http://localhost:3000/pendingOrders", {pendingOrders:[]})
  }

  openActivation(){
    return this.http.post("http://localhost:3000/activation", {active:true})
  }
}
