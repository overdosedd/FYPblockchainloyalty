import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormGroupDirective } from '@angular/forms';
import { LoginService } from '../_services/login.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';
import { MustMatch } from 'src/app/must-match.validator';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import {BigChainDBService} from '../_services/big-chain-db.service';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  loading = false;
  userDetail: any;
  key = this.bigchainService.getKeypair();

  firstName: '';
  lastName: '';
  email: '';
  password: '';
  password2: '';
  username: '';

  loginFormModalEmail = new FormControl('', Validators.required);
  loginFormModalUsername = new FormControl('', Validators.required);
  loginFormModalFirstname = new FormControl('', Validators.required);
  loginFormModalLastname = new FormControl('', Validators.required);
  loginFormModalPassword = new FormControl('', Validators.required);
  loginFormModalPassword2 = new FormControl('', Validators.required);
  // tslint:disable-next-line:max-line-length
  constructor(private _loginService: LoginService, private alertService: AlertService, private router: Router, private httpClient: HttpClient, private formBuilder: FormBuilder, private authenticationService: AuthenticationService, public bigchainService: BigChainDBService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', Validators.required],
    },
      {
        validator: MustMatch('password', 'password2')
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }


  //  public Register() {
  //     // this.submitted = true;
  //     // this.loading = true;
  //     console.log(this.signupForm);
  //     // stop here if form is invalid
  //     if (this.signupForm.invalid) {
  //       return;
  //     }
  //     this._loginService.Register(this.signupForm);
  //   }

  onFormSubmit(form: NgForm) {
    this.submitted = true;
    this.loading = true;
    if (this.signupForm.invalid) {
      return;
    }
    console.log(this._loginService.Register);
    console.log(form);
    this._loginService.Register(form).pipe(first())
      .subscribe(data => {
        this.userDetail = data;
        console.log(data);
        // const id = res['_id'];
        this.loading = false;
        this.router.navigateByUrl('home/login');
        // this.router.navigate(['/login', id]);
      }, (err) => {
        console.log(err);
        this.loading = false;
      });
  }
}
