import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CustomerFormService } from '../../../../services/customer-form.service';
import { UserFields } from '../../../../config';
import { UserField } from '../../../../interfaces/user-detail-interfaces';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  controlsArray = [];
  get group(): AbstractControl {
    return this.customerFormService.form.get('customerDetails');
  }
  get UserFields(): UserField[] {
    return UserFields;
  }

  constructor(private customerFormService: CustomerFormService) {}

  ngOnInit(): void {
    //Needed to avoid template load for get controls
    UserFields.forEach(userField => {
      this.controlsArray[userField.control] = this.group.get(userField.control);
    }) 
  }

  reset() {
    this.customerFormService.resetForm();
  }
}