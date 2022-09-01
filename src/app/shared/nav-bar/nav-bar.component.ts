import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public searchTerm !: string;
  public totalItem : number = 0;

  constructor(private userService: UserService,
              public sharedService : SharedService) { }

  ngOnInit(): void {
    this.cartbadge();

  }

  search(event:any){
    this.searchTerm = (event.target).value;
    console.log(this.searchTerm);
    this.userService.search.next(this.searchTerm);
  }

  //TO STORE QUANTITY TO CART BADGE
  cartbadge() {
    this.userService.getProducts()
    .subscribe(cart => {
      this.totalItem = cart.length;
    })
  }
}
