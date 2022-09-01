import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  constructor(private authService : AuthService, private router : Router){}
  canActivate(){

    if(this.authService.isUser()){
      return true
    }else{
      alert("You cannot access this page!")
      this.router.navigate(["admin"])
      return false
    }
    
    
  }
  
}
