import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {ModalComponent} from 'angular-custom-modal';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
// import { } from '@types/googlemaps';


@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.component.html',
  styleUrls: ['./editaddress.component.scss']
})
export class EditaddressComponent implements OnInit {
  signupFormModalName = new FormControl('', Validators.required);
  signupFormModalEmail = new FormControl('', Validators.email);
  signupFormModalPassword = new FormControl('', Validators.required);
  // modalRef2: BsModalRef;
  @ViewChild('editaddress') public modal: ModalComponent;
  optionsSelect: Array<any>;
  constructor(public modalRef: BsModalRef) { }

  // openModal() {

  // }

  ngOnInit() {
    this.optionsSelect = [
      { value: '1', label: 'Yes' },
      { value: '2', label: 'No' },
    ];
  }

}
