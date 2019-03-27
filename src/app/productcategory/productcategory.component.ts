import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Product, Category } from 'src/app/_models';
import { AlertService } from '../_services/alert.service';
import { ProductService } from '../_services/product.service';
import { ProductCategoryService } from '../_services/product-category.service';
import { ShoppingcartServiceService } from '../_services/shoppingcart-service.service';
import { PagerService } from '../_services/pager.service';
// import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.scss']
})
export class ProductcategoryComponent implements OnInit {
  data: Product[] = [];
  data2: Category[] = [];
  loading = false;
  productDetails: any[];
  categoryDetails: any[];
  productDetail: any;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];


  images = [
    'assets/images/carousel/daily.png',
    'assets/images/carousel/electronics.png',
    'assets/images/carousel/fashion.png',
    'assets/images/carousel/homekitchen.png',
    'assets/images/carousel/beautyfragrance.png',
    'assets/images/carousel/babykid.png',
  ];
  showDirectionLinks = true;


  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    step: 50,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };





  colors = [{ color: 'color1', href: '#white' },
  { color: 'color2', href: '#white' },
  { color: 'color3', href: '#white' },
  { color: 'color4', href: '#white' },
  { color: 'color5', href: '#white' },
  { color: 'color6', href: '#white' },
  { color: 'color7', href: '#white' },
  { color: 'color8', href: '#white' },
  { color: 'color9', href: '#white' },
  { color: 'color10', href: '#white' },
  ];


  brands = [{ name: 'Nike', href: '#' },
  { name: 'Adidas', href: '#' },
  { name: 'Puma', href: '#' },
  { name: 'River Island', href: '#' },
  { name: 'Zara', href: '#' },
  { name: 'Topshop', href: '#' },

  ];


  // -------------------------------------
  slides: any = [[]];
  chunk(arr, chunkSize) {
    const R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }


  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private alertService: AlertService, private shoppingcartservice: ShoppingcartServiceService, private httpClient: HttpClient, private productService: ProductService, private productcategoryService: ProductCategoryService, private pagerService: PagerService, private route: ActivatedRoute) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.productcategoryService.getCategories().subscribe(data2 => { this.categoryDetails = data2; console.log(this.categoryDetails); this.loading = false; },
      err => {
        console.log(err);
        this.alertService.error(err);
        this.loading = false;
      });

    console.log(this.productcategoryService.getCategories());

    // tslint:disable-next-line:max-line-length
    this.productService.getProducts().subscribe(data => {
      this.productDetails = data; console.log(this.productDetails); this.setPage(1); this.slides = this.chunk(this.productDetails, 3);
      this.loading = false;
    },
      err => {
        console.log(err);
        this.alertService.error(err);
        this.loading = false;
      });

    // this.productService.getProducts().subscribe(data => { this.data = data; console.log(this.data); this.loading = false; },
    //   err => {
    //     console.log(err);
    //     this.alertService.error(err);
    //     this.loading = false;
    //   });

  }


  public clickView(id) {

    console.log(['home/product_category/product_type', id]);
    this.router.navigate(['home/product_category/product_type', id]).then((e) => {
      console.log(id);
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
    });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.productDetails.length, page);

    // get current page of items
    this.pagedItems = this.productDetails.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


}


