import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() controlName: string;
  @Input() placeHolder: string;
  @Input() errorMsg: string;
  constructor() {}

  ngOnInit(): void {}
}
