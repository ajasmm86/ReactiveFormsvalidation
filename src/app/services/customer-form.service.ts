import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerFormValidatorService } from './customer-form-validator.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerFormService {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerFormValidatorService: CustomerFormValidatorService
  ) {
    this.form = this.fb.group(
      {
        customerDetails: this.fb.group({
          firstName: '',
          lastName: '',
          email: ['', Validators.email],
          phoneNumber: [
            '',
            this.customerFormValidatorService.phoneNumberValidator,
          ],
          personalNumber: [
            '',
            customerFormValidatorService.personalNumberValidator,
          ],
        }),
      },
      { updateOn: 'blur' }
    );
  }

  resetForm() {
    this.form.reset();
  }
}
