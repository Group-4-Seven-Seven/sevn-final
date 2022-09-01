import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '../../models/order';
import { Products } from '../../models/products';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() cartorder : any
  @Output() deleteorderEmitter = new EventEmitter<Products>();
  @Output() quantityActionEmitter = new EventEmitter()
  editFlag : boolean = false
  submitFlag: boolean = true
  quantity : any
  total : any 
  constructor() { }

  ngOnInit(): void {
    this.total = this.cartorder.price* this.cartorder.quantity
  }

  deleteOrder() {
    this.deleteorderEmitter.emit(this.cartorder);
  }

  editQuantity(){
    this.editFlag = !this.editFlag
  }

  submitQuantity(){
    console.log(this.quantity)
    console.log(this.cartorder)
    const addQuantity = {
      quantity : this.quantity
    }
    const finalResult = Object.assign(this.cartorder, addQuantity)
    
    this.quantityActionEmitter.emit(finalResult)
    this.editFlag = !this.editFlag
  }

  getTotal(){
    
    
  }
}