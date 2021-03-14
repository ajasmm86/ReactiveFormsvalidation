import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomerFormValidatorService {
  swedishPersonalNumberpattern = /^\d{6}(\d{2})?[+-]?\d{4}$/;
  swedishPhoneNumberRegex = /^(([+]46)\s*(7)|07)[02369]\s*(\d{4})\s*(\d{3})$/gm;
  constructor() {}

  personalNumberValidator: ValidatorFn = (control: FormControl) => {
    if (!control.value) return null;
    const val = this.isValid(control.value);
    return !this.isValid(control.value)
      ? {
          message: 'Enter a valid personal number',
        }
      : null;
  };

  phoneNumberValidator: ValidatorFn = (control: FormControl) => {
    if (!control.value) return null;

    let matchedGroup;
    let isMatched = false;

    while (
      (matchedGroup = this.swedishPhoneNumberRegex.exec(control.value)) !== null
    ) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (matchedGroup.index === this.swedishPhoneNumberRegex.lastIndex) {
        this.swedishPhoneNumberRegex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      matchedGroup.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${matchedGroup}`);
        isMatched = true;
      });
    }

    return !isMatched
      ? {
          message: 'Enter a valid phone number',
        }
      : null;
  };

  hasCorrectChecksum = (input: string) => {
    const sum = input
      .split('')
      .reverse()
      .map(Number)
      .map((x, i) => (i % 2 ? x * 2 : x))
      .map((x) => (x > 9 ? x - 9 : x))
      .reduce((x, y) => x + y);

    return sum % 10 === 0;
  };

  hasValidDate = (input: string) => {
    let [_, yearStr, monthStr, dayStr] = /^(\d{2})(\d{2})(\d{2})/.exec(input);

    const year = Number(yearStr);
    const month = Number(monthStr) - 1;
    let day = Number(dayStr);

    if (day > 60) {
      // coordination numbers ("samordningsnummer")
      day -= 60;
    }

    const date = new Date(year, month, day);

    const yearIsValid = String(date.getFullYear()).substr(-2) === yearStr;
    const monthIsValid = date.getMonth() === month;
    const dayIsValid = date.getDate() === day;

    return yearIsValid && monthIsValid && dayIsValid;
  };

  isValid = (input: string) => {
    if (!this.swedishPersonalNumberpattern.test(input)) {
      return false;
    }

    const cleaned = input.replace(/[+-]/, '').slice(-10);

    return this.hasCorrectChecksum(cleaned) && this.hasValidDate(cleaned);
  };
}
