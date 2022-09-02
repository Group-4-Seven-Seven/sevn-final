import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  soldItemsData : any
  soldItems: any
  public sortedItems : any[] = []
  constructor(private adminService : AdminService,
    private router : Router) { }

  ngOnInit(): void {
    this.adminService.getSoldItems().subscribe(data =>{
      console.log(data)
      this.soldItemsData = data
      console.log(this.soldItemsData)
      this.soldItems = this.soldItemsData[0].topSellers
      console.log(this.soldItems)
      this.soldItems.sort(function(a : any, b: any){
        return b.quantity - a.quantity
      })
      console.log(this.soldItems)
     
      for(let i = 0; i<5; i++){
        this.sortedItems.push(this.soldItems[i])
      }
      console.log(this.sortedItems)
    })

  
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
