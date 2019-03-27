import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { AddressbookService } from '../_services/addressbook.service';
import { Observable, of } from 'rxjs';
import { AlertService } from '../_services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Addresses, Orders } from '../_models';
import { CheckoutService } from '../_services/checkout.service';
import { first } from 'rxjs/operators';
import { LoginService } from '../_services/login.service';
import { ShoppingcartServiceService } from '../_services/shoppingcart-service.service';
import { OrdersService } from '../_services/orders.service';

import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';

declare let paypal: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewChecked {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  id = '';
  firstname;
  lastname;
  address;
  postalcode;
  state;
  columns: string[];
  columnproduct: string[];
  addressbook: Observable<any[]>;
  addressDetail: any;
  loading = false;
  cartDetail: any;
  checked = true;
  disabled = true;
  editAddressForm: FormGroup;
  addAddressForm: FormGroup;

  totalAmt: number;

  // public payPalConfig?: PayPalConfig;

  //  initConfig(): void {
  //   this.payPalConfig = new PayPalConfig(
  //     PayPalIntegrationType.ClientSideREST,
  //     PayPalEnvironment.Sandbox,
  //     {
  //       commit: true,
  //       client: {
  //         sandbox:
  //           'AYQGslSaDsZ7V4bypZK0HopaVSMhZ-dyA9E2dR9bfd5shSrzD-8iWQMDEUqQyAvWHywA0des2V4v7Ws_',
  //         production: 'access_token$production$yz7xznfd3wm6ztd2$068d251838898c4df62876b0211d1457'
  //       },
  //       button: {
  //         label: 'paypal',
  //         layout: 'vertical'
  //       },
  //       onAuthorize: (data, actions) => {
  //         console.log('Authorize');
  //         return of(undefined);
  //       },
  //       onPaymentComplete: (data, actions) => {
  //         console.log('OnPaymentComplete');
  //       },
  //       onCancel: (data, actions) => {
  //         console.log('OnCancel');
  //       },
  //       onError: err => {
  //         console.log('OnError');
  //       },
  //       onClick: () => {
  //         console.log('onClick');
  //       },
  //       validate: (actions) => {
  //         console.log(actions);
  //       },
  //       experience: {
  //         noShipping: true,
  //         brandName: 'Angular PayPal'
  //       },
  //       transactions: [
  //         {
  //           amount: {

  //             total: this.totalAmt + 0.11,
  //             currency: 'SGD',
  //             details: {
  //               subtotal: this.totalAmt,
  //               tax: 0.07,
  //               shipping: 0.03,
  //               handling_fee: 1.00,
  //               shipping_discount: -1.00,
  //               insurance: 0.01
  //             }
  //           },
  // custom: 'Custom value',
  // item_list: {
  //   items: [
  //     {
  //       name: 'hat',
  //       description: 'Brown hat.',
  //       quantity: 5,
  //       price: 3,
  //       tax: 0.01,
  //       sku: '1',
  //       currency: 'SGD'
  //     },
  //     {
  //       name: 'handbag',
  //       description: 'Black handbag.',
  //       quantity: 1,
  //       price: 15,
  //       tax: 0.02,
  //       sku: 'product34',
  //       currency: 'SGD'
  //     }],
  //   shipping_address: {
  //     recipient_name: 'Brian Robinson',
  //     line1: '4th Floor',
  //     line2: 'Unit #34',
  //     city: 'San Jose',
  //     country_code: 'US',
  //     postal_code: '95131',
  //     phone: '011862212345678',
  //     state: 'CA'
  //   },
  // },
  //         }
  //       ],
  //       note_to_payer: 'Contact us if you have troubles processing payment'
  //     }
  //   );
  // }



  // paypal config

  addScript: boolean = false;
  paypalLoad: boolean = true;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AYQGslSaDsZ7V4bypZK0HopaVSMhZ-dyA9E2dR9bfd5shSrzD-8iWQMDEUqQyAvWHywA0des2V4v7Ws_',
      production: ''
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: {
                total: this.totalAmt,
                currency: 'SGD',
              },
              // custom: 'Custom value',
              // let json = {
              //   title: this.cartDetar
              // }
            }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        // Do something when payment is successful.
        this.loading = false;
        this.orderService.proceedtoOrder(this.cartDetail).subscribe(res => {

          this.cartDetail = res.products; console.log(this.cartDetail.id);
          this.loading = false;
          this.router.navigateByUrl('home/orders');
        },
          err => {
            console.log(err);
            this.alertService.error(err);
            this.loading = false;
          });
      });
    },


    onError: (err) => {
      console.log('OnError');
    },

  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button-container');
        this.paypalLoad = false;
      });
    }
  }


  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:prefer-const
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }






  // tslint:disable-next-line:max-line-length
  constructor(private _formBuilder: FormBuilder, public cartService: ShoppingcartServiceService, public loginService: LoginService, private atService: AddressbookService, private router: Router, private alertService: AlertService, private route: ActivatedRoute, public checkoutService: CheckoutService, public orderService: OrdersService) { }
  get total() {
    let Total = 0;
    for (let i = 0; i < this.cartDetail[0].cartproduct.length; i++) {
      if (this.cartDetail[0].cartproduct[i].product.price) {
        Total += this.cartDetail[0].cartproduct[i].product.price * this.cartDetail[0].cartproduct[i].product.quantity;
      }
    }
    this.totalAmt = Total;

    return Math.round(this.totalAmt * 100) / 100;
  }
  ngOnInit() {
    const totalamt = this.totalAmt;
    // this.initConfig();

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.columns = this.atService.getColumn();
    this.columnproduct = this.checkoutService.getColumns();
    // tslint:disable-next-line:prefer-const
    let id = this.loginService.getCurrentUser().id;
    this.atService.getAddressbyUserID(id).subscribe(data => {
      this.addressDetail = data; console.log(this.addressDetail);
      this.loading = false;
    },
      err => {
        console.log(err);
        this.alertService.error(err);
        this.loading = false;
      });

    this.checkoutService.getCheckoutProducts().pipe(first()).subscribe(data => {
      this.cartDetail = data; console.log(this.cartDetail);
      this.loading = false;
    },
      err => {
        console.log(err);
        this.alertService.error(err);
        this.loading = false;
      });


    this.editAddressForm = this._formBuilder.group({
      fullName: ['', Validators.required],
      streetAddress1: ['', Validators.required],
      streetAddress2: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      default: 'Yes',
      userId: this.loginService.getCurrentUser().id

    });

    this.addAddressForm = this._formBuilder.group({
      fullName: ['', Validators.required],
      streetAddress1: ['', Validators.required],
      streetAddress2: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      default: 'Yes',
      userId: this.loginService.getCurrentUser().id

    });


  }

  get f() { return this.editAddressForm.controls; }

  editAddress(form: NgForm) {
    this.loading = false;
    // tslint:disable-next-line:prefer-const
    let id = this.loginService.getCurrentUser().id;
    console.log(this.addressDetail[0].id);
    this.atService.updateAddress(this.addressDetail[0].id, form).subscribe(data => {
      if (data) {
        this.atService.getAddressbyUserID(id).subscribe(res => {
          this.addressDetail = res; console.log(this.addressDetail);
          this.loading = false;


        },
          err => {
            console.log(err);
            this.alertService.error(err);
            this.loading = false;
          });
      }
      // this.addressDetail = data;
      console.log(data);
      console.log(this.addressDetail);
      this.loading = false;

      // this.atService.updateAddress()
    },
      err => {
        console.log(err);
        this.alertService.error(err);
        this.loading = false;
      });
  }

  addNewAddress(form: NgForm) {
    this.loading = false;
    // tslint:disable-next-line:prefer-const
    let id = this.loginService.getCurrentUser().id;
    this.atService.addAddress(form).pipe(first()).subscribe(data => {
      // this.addressDetail = data; console.log(data);
      if (data) {
        this.atService.getAddressbyUserID(id).subscribe(res => {
          this.addressDetail = res; console.log(this.addressDetail);
          this.loading = false;


        },
          err => {
            console.log(err);
            this.alertService.error(err);
            this.loading = false;
          });
      }
      this.loading = false;
      // this.router.navigate(['home/profile', this.loginService.getCurrentUser().id]);
    },
      err => {
        console.log(err);
        this.alertService.error(err);
        this.loading = false;
      });
  }


  deleteAddress() {
    this.loading = false;
    // tslint:disable-next-line:prefer-const
    let id = this.loginService.getCurrentUser().id;
    this.atService.deleteAddress(this.addressDetail[0].id).subscribe(data => {

      if (data) {
        this.atService.getAddressbyUserID(id).subscribe(res => {
          this.addressDetail = res; console.log(this.addressDetail);
          this.loading = false;


        },
          err => {
            console.log(err);
            this.alertService.error(err);
            this.loading = false;
          });
      }
    });
  }


  addToOrder(cartDetail: Orders) {
    this.loading = false;

    this.orderService.proceedtoOrder(cartDetail).subscribe(data => {

      this.cartDetail = data.products; console.log(cartDetail.id);
      this.loading = false;
      this.router.navigateByUrl('home/orders');
    },
      err => {
        console.log(err);
        this.alertService.error(err);
        this.loading = false;
      });
  }

  deleteCheckout(id){
    this.loading = false;
    this.checkoutService.deleteCheckoutProduct(id).pipe(first()).subscribe(data => {
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

}
