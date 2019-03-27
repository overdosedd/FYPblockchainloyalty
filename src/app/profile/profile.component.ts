import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalComponent } from 'angular-custom-modal';
import { AddressbookService } from '../_services/addressbook.service';
import { Observable } from 'rxjs';

import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { EditaddressComponent } from '../editaddress/editaddress.component';
import { LoginService } from '../_services/login.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Addresses } from '../_models';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id = '';
  firstname;
  lastname;
  address;
  postalcode;
  state;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  columns: string[];
  addressbook: Observable<any[]>;
  addressDetail: any;
  loading = false;
  userDetail: any;
  editAddressForm: FormGroup;
  addAddressForm: FormGroup;
  checked = true;
  disabled = true;
  profileForm: FormGroup;
  changepasswordForm: FormGroup;
  passwordDetail: any;

  payment: 'Paypal';
  delivery: 'Utrust';


  currid = this.loginService.getCurrentUser().id;


  @ViewChild('changepassword') public modal: ModalComponent;
  // tslint:disable-next-line:max-line-length
  constructor(private atService: AddressbookService, private router: Router, public loginService: LoginService, private formBuilder: FormBuilder, private alertService: AlertService, private route: ActivatedRoute) {
    this.id = '';
    this.firstname = '';
    this.lastname = '';
    this.address = '';
    this.postalcode = '';
    this.state = '';


  }


  ngOnInit() {
    this.columns = this.atService.getColumn();
    console.log(this.columns);
    // tslint:disable-next-line:prefer-const
    // let id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    this.editAddressForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      streetAddress1: ['', Validators.required],
      streetAddress2: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      default: ['', Validators.required],
      userId: this.loginService.getCurrentUser().id

    });

    this.addAddressForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      streetAddress1: ['', Validators.required],
      streetAddress2: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      default: ['', Validators.required],
      userId: this.loginService.getCurrentUser().id

    });

    this.changepasswordForm = this.formBuilder.group({
      newpassword: ['', Validators.required],
      newpassword2: ['', Validators.required],
      id: this.loginService.getCurrentUser().id

    });

    // this.profileForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   email: ['', Validators.required],
    //   password: ['', Validators.required],
    //   firstName:['', Validators.required],
    //   lastName: ['', Validators.required],
    //   dob: ['', Validators.required],
    //   gender: ['', Validators.required],
    //   defaultBillingAddress: ['', Validators.required],
    //   defaultShippingAddress: ['', Validators.required],
    //  id: this.loginService.getCurrentUser().id

    // });


    this.userDetail = this.loginService.getCurrentUser();
    console.log(this.userDetail);



    // tslint:disable-next-line:prefer-const
    let id = this.loginService.getCurrentUser().id;
    console.log(id);
    this.atService.getAddressbyUserID(id).subscribe(data => {
      this.addressDetail = data; console.log(this.addressDetail);
      this.loading = false;
    },
      err => {
        console.log(err);
        this.alertService.error(err);
        this.loading = false;
      });


    // this.userService.getUser(id).pipe(first()).subscribe()
    // console.log(this.addressbook);
  }

  updatePassword(form: NgForm) {
    this.loading = false;
    // tslint:disable-next-line:prefer-const
    let id = this.loginService.getCurrentUser().id;

    this.loginService.updateUser(this.addressDetail[0].id, form).subscribe(data => {
      if (data) {
        this.loginService.getUser(id).subscribe(res => {
          this.passwordDetail = res; console.log(this.addressDetail);
          this.loading = false;
        },
          err => {
            console.log(err);
            this.alertService.error(err);
            this.loading = false;
          });
      }
      console.log(data);
      console.log(this.passwordDetail);
      this.loading = false;
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
  toProfile() {
    // let id = this.route.snapshot.paramMap.get('id');

    // this.loginService.getCurrentUser();
    this.router.navigate(['home/profile', this.loginService.getCurrentUser().id]);
  }




  // saveProfile(form: NgForm) {
  //   this.loading = false;
  //   // tslint:disable-next-line:prefer-const
  //   let id = this.loginService.getCurrentUser().id;
  //   this.loginService.updateUser(id, form).subscribe(data => {
  //     if (data) {
  //       this.loginService.getUser(id).subscribe(res => {
  //         this.userDetail = res; console.log(this.addressDetail);
  //         this.loading = false;
  //       },
  //         err => {
  //           console.log(err);
  //           this.alertService.error(err);
  //           this.loading = false;
  //         });
  //     }
  //     console.log(data);
  //     console.log(this.userDetail);
  //     this.loading = false;
  //   });
  // }
}
