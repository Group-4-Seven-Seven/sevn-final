import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainhomeComponent } from './mainhome/mainhome.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';



@NgModule({
  declarations: [
    MainhomeComponent
  ],
  imports: [
    CommonModule,
    SlickCarouselModule
  ],
  exports: [
    MainhomeComponent
  ]
})
export class HomepageModule { }
