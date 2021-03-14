import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormInputComponent } from '../shared/components/form-input/form-input.component';
import { SecurityNumberFormatterDirective } from '../shared/directives/security-number-formatter.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormInputComponent, SecurityNumberFormatterDirective],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, MaterialModule, FormInputComponent],
})
export class SharedModule {}
