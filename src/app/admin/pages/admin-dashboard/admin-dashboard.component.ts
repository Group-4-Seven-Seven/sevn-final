import { Component, OnInit } from '@angular/core';
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
  constructor(private adminService : AdminService) { }

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

}
