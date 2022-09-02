import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.component.html',
  styleUrls: ['./mainhome.component.scss']
})
export class MainhomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

   logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  admin(){
    this.router.navigate(['/admin'])
  }

  adminDash(){
    this.router.navigate(['/admin/dashboard'])
  }

  adminProd(){
    this.router.navigate(['/admin/product'])
  }

  home(){
    this.router.navigate(['/home'])
  }

  user(){
    this.router.navigate(['/user'])
  }

  userOrder(){
    this.router.navigate(['/user/pending-orders'])
  }

  profile(){
    this.router.navigate(['/user/profile'])
  }
}
