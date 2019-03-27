import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { InputsModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { PasswordValidation } from '../password-validation';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  validationForm: FormGroup;
  successMessage = 'Custom success message';
  errorMessage = 'Custom error message';


  constructor(public modalRef: BsModalRef, private fb: FormBuilder) {

    this.validationForm = fb.group({
      emailFormEx: [null, [Validators.required, Validators.email]],
      passwordFormEx: [null, Validators.required],
      noValidation: [null, Validators.required],
      noSuccessValidation: [null, Validators.required],
      noErrorValidation: [null, Validators.required],
      customMessages: [null, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]

    },
    { validator: PasswordValidation.MatchPassword}
    );
  }

  ngOnInit() {
  }

}
