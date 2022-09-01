import { Component, OnInit } from '@angular/core';
import { EMPTY, switchMap } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { Order } from '../../models/order';
import { Pending } from '../../models/pending';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {
  pendingData : any
  public pendingOrders : Pending[] = [];
  public grandTotal: number = 0;
  soldItemData: any
  soldItems : any

  
  constructor(private userService : UserService,
    private sharedService : SharedService) { }

  ngOnInit(): void {
    this.sharedService.show();
    //get pending orders from database and display it on the page 
    this.userService.getPendingOrder().subscribe(data => {
      this.pendingData = data
      this.pendingOrders = this.pendingData.pendingOrders
      this.executeSoldItems()
    })
  }

  executeSoldItems(){
    this.userService.getSoldItems().pipe(
      switchMap((data)=>{
        let tempPendingOrders
        this.soldItemData = data
        this.soldItems = this.soldItemData[0].topSellers
        tempPendingOrders = this.pendingOrders

       //to avoid duplication on the soldItems list 
       if(tempPendingOrders.length !==0){
          tempPendingOrders.forEach((order:any) =>{
            this.soldItems.forEach((item:any)=>{
              if(order.id == item.id){
                item.quantity += order.quantity
              }
            })
          })
       }
       tempPendingOrders = []
       return this.userService.setSoldItems(this.soldItems)
    
      }),
      switchMap((data)=>{
        return EMPTY
      })
    ).subscribe()
  }
}
