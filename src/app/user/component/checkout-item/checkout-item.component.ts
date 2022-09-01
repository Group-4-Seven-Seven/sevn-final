import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '../../models/order';
import { Products } from '../../models/products';

@Component({
  selector: 'app-checkout-item',
  templateUrl: './checkout-item.component.html',
  styleUrls: ['./checkout-item.component.scss']
})
export class CheckoutItemComponent implements OnInit {
  @Input() checkout : Order | undefined
  @Output() deleteOrderActionEmitter = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  
  deleteOrder(){
    this.deleteOrderActionEmitter.emit(this.checkout)
  }
}

