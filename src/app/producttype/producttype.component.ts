import { Component, OnInit } from '@angular/core';
import { isObject } from 'util';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Product, Cart } from '../_models';
import { ProductService } from '../_services/product.service';
import { AlertService } from '../_services/alert.service';
import { ShoppingcartServiceService } from '../_services/shoppingcart-service.service';
import { SharedService } from '../_services/shared.service';
import { LoginService } from '../_services/login.service';
import { BigChainDBService } from '../_services/big-chain-db.service';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-producttype',
  templateUrl: './producttype.component.html',
  styleUrls: ['./producttype.component.scss']
})
export class ProducttypeComponent implements OnInit {
  [x: string]: any;
  submitted: boolean = false;
  loading = true;
  data: Product[] = [];
  productDetail: any;
  cartDetail: any;
  userID: number;


  checkbox = ['100% Warranty', '7 Days Return', 'Local Singapore manufacturer warranty of 1 year'];

  slides: any = [[]];
  chunk(arr, chunkSize) {
    const R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  // tslint:disable-next-line:max-line-length
  constructor(private datePipe: DatePipe, private productService: ProductService, private sharedService: SharedService, private userService: LoginService, private shoppingcartservice: ShoppingcartServiceService, private router: Router, private alertService: AlertService, private httpClient: HttpClient, public bigchainService: BigChainDBService, private route: ActivatedRoute) { }
  ngOnInit() {

    // this.slides = this.chunk(this.data[0].img, 3);
    // console.log(this.data.img);

    this.loading = true;
    // tslint:disable-next-line:prefer-const
    let id = this.route.snapshot.paramMap.get('id');
    // tslint:disable-next-line:max-line-length
    this.productService.getProduct(id).subscribe(data => {
      this.productDetail = data; console.log(this.productDetail);
      this.slides = this.chunk(this.productDetail.img, 3);
      this.loading = false;
    },
      err => {
        console.log(err);
        this.alertService.error(err);
        this.loading = false;
      });
    console.log(id);

  }

  // addtoCart() {
  //   this.submitted = true;
  //   this.loading = true;
  //   // console.log(productData);
  //   this.shoppingcartservice.addCartProduct(this.productDetail).subscribe(data => {
  //       this.productDetail = data;
  //       // data.products_id = this.productDetail.id;
  //       console.log(this.productDetail);
  //       this.router.navigateByUrl('home/shopping_cart');
  //     }, (err) => {
  //       console.log(err);
  //       this.isLoadingResults = false;
  //     });
  // }


  addtoCart(productDetail: Cart) {
    let legends: any = [];
    this.bigchainService.searchTransaction('"' + 'TrolleeLegend' + '"').subscribe(data => {
      const result: any = data;
      legends = result[0].data.loyaltySystem.action;
    });

    let counter = 0;
    console.log('=============== ADD TO CART START =================');
    this.email = this.userService.getCurrentUser().email;
    this.bigchainService.searchTransaction('"' + this.email + '"').subscribe(data => {
      // tslint:disable-next-line:prefer-const
      let result: any = data;
      // console.log(result);
      const todayDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
      for (let i = 0; i < result.length; i++) {
        // tslint:disable-next-line:quotemark
        if (result[i].data.email === this.email && result[i].data.type === "testLoyalty6") {
          const actionDate = this.datePipe.transform(result[i].data.date, 'yyyy-MM-dd');
          if (result[i].data.action === 'Add to Cart' && todayDate === actionDate) {
            counter++;
          }
          // this.loyaltyDetails.push(result[i].data);
        }
      }
      if (counter < 5) {
        let pointsAllocated: number = 0;
        // tslint:disable-next-line:prefer-const
        legends.forEach(legend => {
          if (legend.action_name === 'Add to Cart') {
            pointsAllocated = legend.action_point;

          }
          console.log(pointsAllocated);
        });
        // tslint:disable-next-line:prefer-const
        let json = {
          'email': this.userService.getCurrentUser().email,
          'action': 'Add to Cart',
          'type': 'testLoyalty6',
          'date': Date.now(),
          'points': pointsAllocated

        };

        let count = 0;
        this.productDetail.option.forEach(option => {
          if (option.selected !== '') {
            count = count + 1;
          }
          console.log(option.selected);
        });

        if (count === this.productDetail.option.length) {
          this.shoppingcartservice.addCartProduct(productDetail).pipe(first()).subscribe(data2 => {
            this.productDetail = data2.product; console.log(productDetail.id);

            console.log(json);
            this.bigchainService.createPurchase(json, this.userService.getCurrentUser().key).subscribe(res => {
            });
            this.loading = false;
            this.router.navigateByUrl('home/shopping_cart/');
          },
            err => {
              console.log(err);
              this.alertService.error(err);
              this.loading = false;
            });
          console.log('Sucessfully added to cart');
        } else {
          console.log('Select all product option');
        }

      } else {
        console.log('FAILED ADD TO CART POINTS ALLOCATION');

        console.log(Date.now());
        // tslint:disable-next-line:prefer-const
        let json = {
          'email': this.userService.getCurrentUser().email,
          'action': 'Add to Cart',
          'type': 'testLoyalty6',
          'date': Date.now(),
          'points': 0

        };

        let count = 0;
        this.productDetail.option.forEach(option => {
          if (option.selected !== '') {
            count = count + 1;
          }
          console.log(option.selected);
        });

        if (count === this.productDetail.option.length) {
          this.shoppingcartservice.addCartProduct(productDetail).pipe(first()).subscribe(data3 => {
            this.productDetail = data3.product; console.log(productDetail.id);

            console.log(json);
            this.bigchainService.createPurchase(json, this.userService.getCurrentUser().key).subscribe(res => {
            });
            this.loading = false;
            this.router.navigateByUrl('home/shopping_cart/');
          },
            err => {
              console.log(err);
              this.alertService.error(err);
              this.loading = false;
            });
          console.log('Sucessfully added to cart');
        } else {
          console.log('Select all product option');
        }
      }

    });




    console.log('=============== ADD TO CART END =================');
  }

}
