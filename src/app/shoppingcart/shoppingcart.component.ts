import { Component, OnInit } from '@angular/core';
import { ShoppingcartServiceService } from '../_services/shoppingcart-service.service';
import { Observable } from 'rxjs';
import { AlertService } from '../_services/alert.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { SharedService } from '../_services/shared.service';
import { Cart, Checkout } from '../_models';
import { CheckoutService } from '../_services/checkout.service';
import { LoginService } from '../_services/login.service';
import { BigChainDBService } from '../_services/big-chain-db.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  columns: string[];
  cart: Cart[] = [];
  // total: number;
  cartDetail: any;
  loading = false;
  cartItemCount = 0;
  // tslint:disable-next-line:max-line-length
  constructor(private atService: ShoppingcartServiceService, private loginService: LoginService, private sharedService: SharedService, private alertService: AlertService, private checkoutService: CheckoutService, private router: Router, private httpClient: HttpClient, private route: ActivatedRoute, public bigchainService: BigChainDBService) { }
  get total() {
    let Total = 0;
    for (let i = 0; i < this.cartDetail.length; i++) {
      if (this.cartDetail[i].product.price) {
        Total += this.cartDetail[i].product.price * this.cartDetail[i].product.quantity;
      }
    }
    return Math.round(Total * 100) / 100;
  }

  ngOnInit() {
    this.columns = this.atService.getColumns();
    // this.cart = this.atService.getProduct();

    // this.total = 0;
    // tslint:disable-next-line:prefer-const
    let id = this.loginService.getCurrentUser().id;
    console.log(id);
    this.atService.getCartProduct(id).pipe(first()).subscribe(data => {
      this.cartDetail = data; console.log(this.cartDetail);
      this.loading = false;
      this.cartItemCount = this.cartDetail.length;
      this.sharedService.updateCartCount(this.cartItemCount);
      console.log(this.cartItemCount);
    },
      err => {
        console.log(err);
        this.alertService.error(err);
        this.loading = false;
      });
  }

  // this.atService.getCartProductsByUserID(id).pipe(first()).subscribe(data => {
  //       this.cartDetail = data; console.log(this.cartDetail);
  //       this.loading = false;
  //       this.cartItemCount = this.cartDetail.length;
  //       this.sharedService.updateCartCount(this.cartItemCount);
  //       console.log(this.cartItemCount);
  //     },
  //       err => {
  //         console.log(err);
  //         this.alertService.error(err);
  //         this.loading = false;
  //       });
  //   }


  clickDeleteCartItem(id) {
    this.loading = false;
    this.atService.deleteCartProduct(id).pipe(first()).subscribe(data => {
      this.cartDetail = data; console.log(this.cartDetail);
      this.ngOnInit();
      this.loading = false;
    },
      err => {
        console.log(err);
        this.alertService.error(err);
        this.loading = false;
      });
  }

  proceedToCheckout(cartDetail: Checkout) {
    this.loading = false;
    this.checkoutService.proceedCheckout(cartDetail).subscribe(data => {
      this.cartDetail = data.cartproduct; console.log(cartDetail.id);
      this.loading = false;
      this.router.navigateByUrl('home/shopping_cart/checkout');
    },
      err => {
        console.log(err);
        this.alertService.error(err);
        this.loading = false;
      });

    // this.bigchainService.createTransaction()._subscribe(data => {
    //   data = data;
    //   console.log(data);
    // },
    //   err => {
    //     console.log(err);
    //     this.alertService.error(err);
    //     this.loading = false;
    //   });














    // // checkout service
    // this.shoppingcartservice.addCartProduct(productDetail).pipe(first()).subscribe(data => {
    //   this.productDetail = data.product; console.log(productDetail.id);
    //   this.loading = false;
    //   this.router.navigateByUrl('home/shopping_cart');
    // },
    //   err => {
    //     console.log(err);
    //     this.alertService.error(err);
    //     this.loading = false;
    //   });

  }
}


