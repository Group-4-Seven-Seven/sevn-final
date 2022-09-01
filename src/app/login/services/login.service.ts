import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, filter, map, Observable, throwError } from 'rxjs';
import { User } from 'src/app/user/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }
  login(email : String, password:string){
    return this.http.post("http://localhost:3000/login", {email, password}, {observe :'response'})
    
    
  }

  getUser(email: string) {
    return this.http.get("http://localhost:3000/users").pipe(map((users:any)=>{
      return users.filter((user:any)=> user.email == email)
    }))
  
  
    
  }

getActiveStatus(userID:any){
  return this.http.get(`http://localhost:3000/activation/${userID}`)
}
 
} 

