import { Component, OnInit } from '@angular/core';
import { Products } from '../../models/products';
import { UserService } from '../../services/user.service';
import { Tile } from '../../models/tile';
import { SharedService } from 'src/app/shared/shared.service';
import { Product } from 'src/app/admin/models/product';
import { Order } from '../../models/order';
import { catchError, EMPTY, forkJoin, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public products: Products[] = [];
  searchKey: string = "";
  brand = '';
  SearchBrand: string = '';
  SortbyParam = '';
  SortDirection = 'asc';
  cartData : any;
  cartOrder : any[] = [];

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 2, color: 'lightblue'},
    {text: "Two", cols: 1, rows: 4, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 2, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 2, color: 'black'},
  ];

  constructor(private userService : UserService,
              private sharedService : SharedService,
              private router : Router) { }

  ngOnInit(): void {
    this.sharedService.show();
    this.getAllProducts();

    this.userService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })


    
  }

  getAllProducts() {
    this.userService.getProductItem().subscribe(products => {
      this.products = products
      // console.log(this.products);

      //FUNCTION TO ADD QUANTITY AND TOTAL TO PRODUCT
      this.products.forEach((x: any) => {
        Object.assign(x,{quantity: x.quantity, total: x.price});
      });
    });
  }
  
 //FILTER FUNCTIONS
  onBrandFilter() {
    this.SearchBrand = this.brand;
  }

  onBrandFilterClear() {
    this.SearchBrand = '';
    this.brand = '';
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
  
  //END OF FILTER FUNCTIONS

  //ADD TO CART FUNCTIONS
  executeAddtoCart(product:Product) {
      this.userService.getCartData().pipe(
        switchMap((data) => {
        let newCart: any
        let addedItem : any[] = []
        let isDuplicate : boolean = false
        addedItem.push(product)
        console.log(addedItem[0].id)
        this.cartData = data
        this.cartOrder = this.cartData.carts
          if(this.cartOrder.length !== 0){
            newCart = this.cartOrder
            addedItem.forEach(order =>{
              //----to avoid add to cart duplication---
              newCart.forEach((data:any) =>{
                if(order.id == data.id){
                  data.quantity += 1;
                  isDuplicate = true
                }  
              })
              if(!isDuplicate){
                newCart.push(order)
              }
              //------------------
            })  
          }else{
            newCart = addedItem
          
          }
       return this.userService.addtoCart(newCart)
      
        }),
        switchMap(data =>{
          return EMPTY
        })
      ).subscribe()
  }
  //END OF ADD TO CART FUNCTIONS

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

}
