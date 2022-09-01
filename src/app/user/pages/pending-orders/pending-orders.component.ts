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
    // this.checkoutOrders = this.userService.getcheckOutItems();
    // this.grandTotal = this.userService.getTotalPrice();

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
        console.log(data)
        this.soldItemData = data
        console.log(this.soldItemData[0])
        this.soldItems = this.soldItemData[0].topSellers
        console.log(this.pendingOrders)
        console.log(this.soldItems)
        tempPendingOrders = this.pendingOrders
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
       
       console.log(this.soldItems)
       return this.userService.setSoldItems(this.soldItems)
      //return EMPTY
      }),
      switchMap((data)=>{
        return EMPTY
      })
    ).subscribe()
  }
}
