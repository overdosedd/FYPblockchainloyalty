import { Component, ViewChild, OnInit } from '@angular/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalComponent } from 'angular-custom-modal';
import { LoginComponent } from './login/login.component';
import { FormControl, Validators } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SignupComponent } from './signup/signup.component';
import { AuthenticationService } from './_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from './_services/shared.service';
import { LoginService } from './_services/login.service';
import { AlertService } from './_services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Trollee';
  Details: any;
  loggedIn = false;
  showFiller = false;
  loading = false;

  cartItemCount: number = 0;

  // tslint:disable-next-line:max-line-length
  constructor(private sharedService: SharedService, public loginService: LoginService, public authenticate: AuthenticationService, private alertService: AlertService, private router: Router, private route: ActivatedRoute) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.sharedService.currentMessage.subscribe(msg => this.cartItemCount = msg);

  }

  logout() {
   return  this.loginService.loggedout();
    // this.loginService.loggedInemail = '';
  }

  clickSearch() {
    this.router.navigateByUrl('/home/product_category');
  }
  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  }

  toProfile() {
    // let id = this.route.snapshot.paramMap.get('id');

    // this.loginService.getCurrentUser();
    this.router.navigate(['home/profile', this.loginService.getCurrentUser().id]);
  }
}
