import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { LoginService } from '../_services/login.service';
import { AlertService } from '../_services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SignupComponent } from '../signup/signup.component';

import { User } from 'src/app/_models';
import { AuthenticationService } from '../_services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  loading = true;
  returnUrl: string;
  data: User[] = [];
  Detail: any;
  loggedIn = false;



  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private authenticate: AuthenticationService, private _loginService: LoginService, private alertService: AlertService, private httpClient: HttpClient) {


  }
  get f() { return this.loginForm.controls; }


  async onSubmit() {
    console.log(this.loginForm.controls.email.value);
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this._loginService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value);

  }



  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    console.log(this.loginForm.controls.email.status);

  }

}
