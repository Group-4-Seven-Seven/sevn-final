import { Component, Input, OnInit } from '@angular/core';

interface Banner {
  imageSrc : string;
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  images = [
    {
      imageSrc: "https://puls-img.chanel.com/1657270308494-01readytoweardesktop1jpg_856x2416.jpg"
    },
    {
      imageSrc: "https://www.chanel.com/images/q_auto,f_auto,fl_lossy,dpr_auto/w_2560/FSH-1649174590596-desktopwp01.png"
    },
    {
      imageSrc: "https://www.chanel.com/images/q_auto,f_auto,fl_lossy,dpr_auto/w_2560/FSH-1646820630589-desktoplrd01.png"
    },
    {
      imageSrc: "https://balenciaga.dam.kering.com/m/779f49594a2b5a3a/Large-35735_SMI_Balenciaga_060_11_V03_2200x1100.jpg"
    },
    {
      imageSrc: "https://balenciaga.dam.kering.com/m/2009910cee35fba8/Large-35408_SMI_Balenciaga_012_15_RGB_V02_2200x1100.jpg"
    },
  ]
  
  @Input() indicators = true;
  
  selectedIndex = 0;

  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;

  constructor() {
  }

  ngOnInit(): void {
    if(this.autoSlide) {
      this.autoSlideImages();
    }
  }

  autoSlideImages() : void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  selectedImage(index: number) : void {
    this.selectedIndex = index;
  }

  onPrevClick() : void {
    if(this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick() : void {
    if(this.selectedIndex = this.images.length - 1) {
      this.selectedIndex= 0;
    } else {
      this.selectedIndex++;
    }
  }

}
