import { Component, OnInit } from '@angular/core';
import { OrdersService, } from '../_services/orders.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  columns: string[];
  order: Observable<any[]>;
  // total: Number;
  status: string[];
  loading = false;
  orderDetail: any;

  currid = this.loginService.getCurrentUser().id;
  // tslint:disable-next-line:max-line-length
  constructor(private atService: OrdersService, private alertService: AlertService, private loginService: LoginService, private router: Router) { }
  get total() {
    let Total = 0;
    for (let i = 0; i < this.orderDetail.length; i++) {
      if (this.orderDetail[i].product.price) {
        Total += this.orderDetail[i].product.price * this.orderDetail[i].product.quantity;
      }
    }
    return Math.round(Total * 100) / 100;
  }

  ngOnInit() {
    this.columns = this.atService.getColumns();
    const id = this.loginService.getCurrentUser().id;
    this.atService.getOrderProducts().pipe(first()).subscribe(data => {
      this.orderDetail = data; console.log(this.orderDetail);
      this.loading = false;
    },
      err => {
        console.log(err);
        this.alertService.error(err);
        this.loading = false;
      });
  }

  toProfile() {
    // let id = this.route.snapshot.paramMap.get('id');

    // this.loginService.getCurrentUser();
    this.router.navigate(['home/profile', this.loginService.getCurrentUser().id]);
  }

    // this.order = this.atService.getOrder();
    // this.total = this.atService.getTotal();
    // this.status = this.atService.getStatus();

    // console.log(this.order);


}
