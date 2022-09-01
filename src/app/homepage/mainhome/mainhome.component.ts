import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.component.html',
  styleUrls: ['./mainhome.component.scss']
})
export class MainhomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   //Slider settings
   slideConfig = {"slidesToShow": 1, "slidesToScroll": 1} ;
}
