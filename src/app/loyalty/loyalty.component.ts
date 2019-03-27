import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

import { BigChainDBService } from '../_services/big-chain-db.service';
import { LoginService } from '../_services/login.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-loyalty',
  templateUrl: './loyalty.component.html',
  styleUrls: ['./loyalty.component.scss']
})
export class LoyaltyComponent implements OnInit {
  loyaltyDetails: any = [];
  email: String;
  legends: any = [];
  totalpoints: number = 0;
  constructor(public bigchainService: BigChainDBService, public userService: LoginService, private datePipe: DatePipe) {
  }

  createloyaltytransact() {
    this.bigchainService.createTransaction();
  }


  ngOnInit() {
    this.bigchainService.searchTransaction('"' + this.userService.getCurrentUser().email + '"').subscribe(data => {
      // tslint:disable-next-line:prefer-const
      let result: any = data;
      result.forEach(item => {
        if (item.data.email === this.userService.getCurrentUser().email && item.data.type === 'testLoyalty6') {
          this.loyaltyDetails.push(item);
          this.totalpoints += item.data.points;
        }
      });
      console.log(this.loyaltyDetails);
      console.log(this.totalpoints);
      // for (let i = 0; i < result.length; i++) {

      //   if (result[i].data.email === this.email && result[i].data.type === 'testLoyalty6') {
      //     this.loyaltyDetails.push(result[i].data);

      //   }
      // }

    });
  }

}
