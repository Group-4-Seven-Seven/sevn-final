import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/admin/models/product';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnInit {
  @Input() product : Product | undefined;
  @Output() addtocartEmitter = new EventEmitter<Product>();
 

  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }

  addtocart() {
    this.addtocartEmitter.emit(this.product);
  }

}