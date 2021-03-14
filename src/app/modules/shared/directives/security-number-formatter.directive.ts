import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[appSecurityNumberFormatter]',
})
export class SecurityNumberFormatterDirective {
  actualValue: string = '';
  transformedValue = '';

  @Input() cardNumbers: string;
  @Output() valueChanged: EventEmitter<string> = new EventEmitter();
  currentSubscription: Subscription;
  constructor(private element: ElementRef) {
    fromEvent(element.nativeElement, 'input').subscribe(({ target }) => {
      this.transformValue(target.value);
    });
  }

  transformValue(value: string) {
    value = value.replace(/\s/g, '');
    if (value.length > this.actualValue.length) {
      this.actualValue =
        this.actualValue + value.slice(this.actualValue.length, value.length);
      this.valueChanged.emit(this.actualValue);
    } else {
      this.actualValue = this.actualValue.slice(0, value.length);
      this.valueChanged.emit(this.actualValue);
    }

    this.transformedValue = this.formatValue(this.actualValue);
    this.element.nativeElement.value = this.transformedValue;
  }

  formatValue(value: any) {
    const s = value
      .replace(/\s+/g, '')
      .replace(/([\w*]{4})/g, '$1 ')
      .trim();
    return s.replace(/\w/g, '*');
  }

  ngOnChanges(changes: SimpleChanges) {
    let cardNumbers = changes.cardNumbers;
    if (cardNumbers && cardNumbers.firstChange) {
      this.transformValue(this.cardNumbers);
    }
  }

  ngOnDestroy() {
    this.currentSubscription.unsubscribe();
  }
}
