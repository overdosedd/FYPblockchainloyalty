import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  images = [
    'assets/images/carousel/daily.png',
    'assets/images/carousel/electronics.png',
    'assets/images/carousel/fashion.png',
    'assets/images/carousel/homekitchen.png',
    'assets/images/carousel/beautyfragrance.png',
    'assets/images/carousel/babykid.png',
  ];
  dailydeals = [
    {
      title: 'Iphone 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a2.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Versace Dragon',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a3.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'bumbleBee Gucci ',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a4.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Louis Vuitton Bag',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a5.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Samsung 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a6.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Hua Wei 8s',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a7.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7 Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a8.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 6s Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a9.jpg',
      tag: 'assets/images/new.png'
    },
  ];

  mobiletoppicks = [
    {
      title: 'Iphone 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a7.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a8.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Versace Dragon',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a9.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'bumbleBee Gucci ',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a10.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Louis Vuitton Bag',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a11.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Samsung 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a12.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Hua Wei 8s',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a13.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7 Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a14.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 6s Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a15.jpg',
      tag: 'assets/images/new.png'
    },
  ];

  electronics = [
    {
      title: 'Iphone 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a8.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a9.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Versace Dragon',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a10.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'bumbleBee Gucci ',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a11.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Louis Vuitton Bag',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a12.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Samsung 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a13.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Hua Wei 8s',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a14.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7 Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a15.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 6s Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/b1.jpg',
      tag: 'assets/images/new.png'
    },
  ];

  women = [
    {
      title: 'Iphone 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a8.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a9.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Versace Dragon',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a10.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'bumbleBee Gucci ',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a11.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Louis Vuitton Bag',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a12.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Samsung 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a13.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Hua Wei 8s',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a14.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7 Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a15.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 6s Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/b1.jpg',
      tag: 'assets/images/new.png'
    },
  ];

  men = [
    {
      title: 'Iphone 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a8.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a9.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Versace Dragon',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a10.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'bumbleBee Gucci ',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a11.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Louis Vuitton Bag',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a12.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Samsung 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a13.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Hua Wei 8s',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a14.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7 Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a15.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 6s Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/b1.jpg',
      tag: 'assets/images/new.png'
    },
  ];
  home = [
    {
      title: 'Iphone 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a8.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a9.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Versace Dragon',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a10.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'bumbleBee Gucci ',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a11.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Louis Vuitton Bag',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a12.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Samsung 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a13.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Hua Wei 8s',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a14.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7 Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a15.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 6s Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/b1.jpg',
      tag: 'assets/images/new.png'
    },
  ];



  kitchen = [
    {
      title: 'Iphone 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a8.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a9.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Versace Dragon',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a10.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'bumbleBee Gucci ',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a11.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Louis Vuitton Bag',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a12.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Samsung 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a13.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Hua Wei 8s',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a14.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7 Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a15.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 6s Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/b1.jpg',
      tag: 'assets/images/new.png'
    },
  ];

  baby = [
    {
      title: 'Iphone 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a8.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a9.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Versace Dragon',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a10.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'bumbleBee Gucci ',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a11.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Louis Vuitton Bag',
      price:  2000,
      buttonText: 'View',
      img: 'assets/images/products/a12.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Samsung 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a13.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Hua Wei 8s',
      price:  2000,
      buttonText: 'View',
      img: 'assets/images/products/a14.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7 Gold',
      price:  2000,
      buttonText: 'View',
      img: 'assets/images/products/a15.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 6s Gold',
      price:  2000,
      buttonText: 'View',
      img: 'assets/images/products/b1.jpg',
      tag: 'assets/images/new.png'
    },
  ];

  bestseller = [
    {
      title: 'Iphone 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a8.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a9.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Versace Dragon',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a10.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'bumbleBee Gucci ',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a11.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Louis Vuitton Bag',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a12.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Samsung 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a13.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Hua Wei 8s',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a14.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7 Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a15.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 6s Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/b1.jpg',
      tag: 'assets/images/new.png'
    },
  ];


  games = [
    {
      title: 'Iphone 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a8.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a9.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Versace Dragon',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a10.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'bumbleBee Gucci ',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a11.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Louis Vuitton Bag',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a12.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Samsung 8',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a13.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Hua Wei 8s',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a14.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 7 Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/a15.jpg',
      tag: 'assets/images/new.png'
    },
    {
      title: 'Iphone 6s Gold',
      price: 2000,
      buttonText: 'View',
      img: 'assets/images/products/b1.jpg',
      tag: 'assets/images/new.png'
    },
  ];



  // customOptions: any = {
  //   loop: true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 2
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 4
  //     }
  //   },
  //   nav: true
  // };
  // dailydeals = [
  //   {
  //     product: 'Iphone7',
  //     price: 'SGD $2100',
  //     view: 'View',
  //     image: './assets/images/products/2.jpg'
  //   },
  //   {
  //     product: 'Samsung Note 8',
  //     price: 'SGD $2100',
  //     view: 'View',
  //     image: 'assets/images/products/2.jpg'
  //   },
  //   {
  //     product: 'Oppo R11',
  //     price: 'SGD $2100',
  //     view: 'View',
  //     image: 'assets/images/products/3.jpg'
  //   },
  //   {
  //     product: 'Huawei p12',
  //     price: 'SGD $2100',
  //     view: 'View',
  //     image: 'assets/images/products/4.jpg'
  //   },
  //   {
  //     product: 'Iphone 8s',
  //     price: 'SGD $2100',
  //     view: 'View',
  //     image: 'assets/images/products/5.jpg'
  //   },
  //   {
  //     product: 'Iphone6s',
  //     price: 'SGD $2100',
  //     view: 'View',
  //     image: 'assets/images/products/6.jpg'
  //   },
  //   {
  //     product: 'Iphone5s',
  //     price: 'SGD $2100',
  //     view: 'View',
  //     image: 'assets/images/products/7.jpg'
  //   },
  //   {
  //     product: 'Iphon 4s',
  //     price: 'SGD $2100',
  //     view: 'View',
  //     image: 'assets/images/products/8.jpg'
  //   },
  //   {
  //     product: 'Iphone3s',
  //     price: 'SGD $2100',
  //     view: 'View',
  //     image: 'assets/images/products/9.jpg'
  //   },

  // ];
  slides: any = [[]];
  slides2: any = [[]];
  slides3: any = [[]];
  slides4: any = [[]];
  slides5: any = [[]];
  slides6: any = [[]];
  slides7: any = [[]];
  slides8: any = [[]];
  slides9: any = [[]];
  slides10: any = [[]];
  chunk(arr, chunkSize) {
    const R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }


  constructor() { }

  ngOnInit() {
    this.slides = this.chunk(this.dailydeals, 5);
    this.slides2 = this.chunk(this.mobiletoppicks, 5);
    this.slides3 = this.chunk(this.electronics, 5);
    this.slides4 = this.chunk(this.women, 5);
    this.slides5 = this.chunk(this.men, 5);
    this.slides6 = this.chunk(this.home, 5);
    this.slides7 = this.chunk(this.kitchen, 5);
    this.slides8 = this.chunk(this.baby, 5);
    this.slides9 = this.chunk(this.bestseller, 5);
    this.slides10 = this.chunk(this.games, 5);
  }

}
