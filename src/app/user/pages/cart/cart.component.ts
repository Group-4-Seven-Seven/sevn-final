import { isNgTemplate, ThisReceiver } from '@angular/compiler';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, forkJoin, switchMap } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { Order } from '../../models/order';
import { Products } from '../../models/products';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  //EJ Variables
  cartData : any
  public cartOrder: Order[] = []
  currentCheckOutData : any
  currentCheckOutOrders : any
  refresh = new BehaviorSubject<boolean>(true)
  //Nica Variables
  public product: Products[] = [];
  public grandTotal: number = 0;
 
  constructor(private userService : UserService, private router : Router,
    private sharedService : SharedService) { }

  ngOnInit(): void {
    this.sharedService.show();
    

    //TO SUBSCRIBE TO PRODUCT GETTER
    // this.userService.getProducts()
    // .subscribe(res => {
    //   this.product = res;
    //   this.grandTotal = this.userService.getTotalPrice();
    // });


    this.userService.getCartData().subscribe((data) =>{
      this.cartData = data
      this.cartOrder = this.cartData.carts
      console.log(this.cartOrder)
      this.grandTotal = this.userService.getGrandTotal(this.cartOrder)
    })

    
      
  }//closing brace for ngOnInit


  //TO REMOVE ALL ITEMS ON CART
  emptycart(){
   
  this.userService.deleteCart().subscribe()
  this.userService.reloadCurrentRoute()
  
  }

  //TO REMOVE ONE ITEM ON CART
  executeDeleteOrder(item : Products) {
   // this.userService.removeCartItem(item);
   let newQuantity : any
   newQuantity = this.cartOrder
   newQuantity = newQuantity.filter((data : Order) =>{
    if(data.id !== item.id){
      return data
    }
   })
   let res1 = this.userService.addtoCart(newQuantity)
   let res2 = this.userService.getCartData()
   forkJoin([res1, res2]).subscribe(data => {
    this.cartData = data[1]
    this.cartOrder = this.cartData.carts
   })
   this.userService.reloadCurrentRoute()
  }

  //EJ's CHECKOUT FUNCTION
  checkout(){
    let res1 = this.userService.getCartData()
    let res2 = this.userService.getCheckOut()
    forkJoin([res1, res2]).pipe(
      switchMap((data) =>{
        let newCheckouts : any
        this.cartData = data[0]
        this.cartOrder = this.cartData.carts
        this.currentCheckOutData = data[1]
        this.currentCheckOutOrders = this.currentCheckOutData.checkouts
        console.log(this.currentCheckOutOrders)
        console.log(this.cartOrder)
        if(this.currentCheckOutOrders.length !== 0){
          newCheckouts = this.currentCheckOutOrders
          this.cartOrder.forEach((order) =>{
            newCheckouts.push(order)
          })
          
        }else{
          newCheckouts = this.cartOrder
          console.log(newCheckouts)
        }
       return this.userService.checkout(newCheckouts)
      }),
      switchMap((data: any) =>{
        return this.userService.deleteCart()
      }),
      switchMap((data) =>{
        return EMPTY
      })
    ).subscribe()

    this.router.navigate(["user/checkout"])
  }

  editQuantity(quantity : Order){
   console.log(quantity.id)
   let newQuantity : any
   newQuantity = this.cartOrder
   newQuantity.map((data : Order) =>{
    if(data.id == quantity.id){
      data = quantity
    }
    return newQuantity
   })
   console.log(this.cartOrder)
   console.log(newQuantity)
   this.userService.addtoCart(newQuantity).subscribe()
   this.userService.reloadCurrentRoute()
  }

  //Nica's CHECKOUT FUNCTION

  // checkout(cartorder : Order[]) {
  //   this.userService.checkOut(cartorder);
  //   this.router.navigate(["user/checkout"])
  // }

}
