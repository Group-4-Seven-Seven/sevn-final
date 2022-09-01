import { HttpClient } from '@angular/common/http';
import { Injectable, IterableDiffers } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { Product } from 'src/app/admin/models/product';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';
import { Pending } from '../models/pending';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  next(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
  productsurl = "http://localhost:3000/products";
  cartsurl = "http://localhost:3000/carts";

  products: Products[] = [];
  public cartItemList : any =[];
  public productList = new BehaviorSubject<any>([]);
  public checkOutList : any =[];
  public pendingOrdersList : any =[];
  public search = new BehaviorSubject<string>("");
  public refresh = new BehaviorSubject<boolean>(true)
  public userDetails: any = this.getUserFromLocalStorage();
  public userDetailsSubject = new BehaviorSubject<any>(this.userDetails);

  constructor(private http: HttpClient, private router : Router) { }
  userID = localStorage.getItem('userID')
  getProductItem(): Observable<Products[]> {
  return this.http.get<Products[]>(this.productsurl);
  }

  //-------------------for checkout--------------------------
  getCheckOutData(){
   let  userID = localStorage.getItem('userID')
    return this.http.get(`http://localhost:3000/checkouts/${userID}`)
  }

  getPendingOrder(){
    let  userID = localStorage.getItem('userID')
    return this.http.get(`http://localhost:3000/pendingOrders/${userID}`)
  }

  placeOrder(order : Order[]){
    let  userID = localStorage.getItem('userID')
    return this.http.put (`http://localhost:3000/pendingOrders/${userID}`, {pendingOrders : order })
  }

  deleteCheckout(){
    let  userID = localStorage.getItem('userID')
    return this.http.put(`http://localhost:3000/checkouts/${userID}`, {checkouts : []})
  }

  // NICA'S CHECKOUT
  getcartItem(){
    return this.cartItemList;
  }

  checkOut(cartItemList : Order[]){
    this.checkOutList.push(cartItemList);
    // this.cartItemList.next(this.checkOutList);
    console.log(this.checkOutList)
  }

  removeCheckOutItem(product: any){
    this.checkOutList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.checkOutList.splice(index,1);
      }
    })
    this.cartItemList.next(this.checkOutList);
  }
  //-------------for Cart---------------------

  getCartData(){
    let  userID = localStorage.getItem('userID')
    return this.http.get(`http://localhost:3000/carts/${userID}`)
  }

  getCheckOut(){
    let  userID = localStorage.getItem('userID')
    return this.http.get(`http://localhost:3000/checkouts/${userID}`)
  }

  checkout(order : Order[]){
    let  userID = localStorage.getItem('userID')
    return this.http.put(`http://localhost:3000/checkouts/${userID}`, {checkouts : order})
  }

  deleteCart(){
    let  userID = localStorage.getItem('userID')
    return this.http.put(`http://localhost:3000/carts/${userID}`,{carts:[]})
  }




  // NICA'S ADD TO CART

  //getter
  getProducts(){
    return this.productList.asObservable();
  }

  //setter
  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }


  addtoCart(product : any){
    // this.cartItemList.push(product);
    // this.productList.next(this.cartItemList);
    // this.getTotalPrice();
    // console.log(this.cartItemList)
    // return this.http.put(`${this.cartsurl}/${product.id}`, product);
    let  userID = localStorage.getItem('userID')
    return this.http.put(`${this.cartsurl}/${userID}`, { carts : product});
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  //FOR PENDING ORDERS
// getcheckOutItems() {
//   return this.checkOutList;
// }

// pendingOrders(checkOutList : Pending[]){
//   this.pendingOrdersList.push(checkOutList);
//   console.log(this.pendingOrdersList);
// }
getPendingOrders(){
  let  userID = localStorage.getItem('userID')
  return this.http.get(`http://localhost:3000/pendingOrders/${userID}`)
}

//------------Grand Total------------

getGrandTotal(products : Products[]) : number{
  let itemTotalPrice : number = 0
  for(let item of products){
    //itemTotalPrice += item.price*item.quantity
    itemTotalPrice += item.price*item.quantity
  }
  return itemTotalPrice
}

//------------Sold Items---------------

setSoldItems(items : any){
  let  userID = localStorage.getItem('userID')
 return this.http.put(`http://localhost:3000/soldItems/${userID}`, {topSellers: items})
}

getSoldItems(){
  return this.http.get("http://localhost:3000/soldItems")
}

writeSoldItems(item : any){
  return this.http.post("http://localhost:3000/soldItems", item)
}

//-------auto refresh---------
reloadCurrentRoute() {
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}

loadUserDetails(username: string, password: string) {
  this.http.get<any>(`${environment.url}/post`).subscribe((res) => {
    for (let x of res) {
      if (x.username === username && x.password === password) {
        this.userDetails = {
          id: x.id,
          // username: x.username,
          password: x.password,
          firstname: x.firstname,
          // middlename: x.middlename,
          lastname: x.lastname,
          email: x.email,
          gender: x.gender
          // mobilenumber: x.mobilenumber,
          // address: x.address,
        };
        this.userDetailsSubject.next(this.userDetails);
        const userJson = JSON.stringify(this.userDetails);
        localStorage.setItem('User', userJson);
      }
    }
  });
}

getUserDetails() {
  return this.userDetailsSubject.asObservable();
}

getUserFromLocalStorage() {
  const userJson = localStorage.getItem('User');
  return userJson ? JSON.parse(userJson) : [];
}

getUser(email: string) {
  return this.http.get("http://localhost:3000/users").pipe(map((users:any)=>{
    return users.filter((user:any)=> user.email == email)
  }))


}
}




