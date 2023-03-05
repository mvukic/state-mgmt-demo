import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'common-filter',
  standalone: true,
  template: `
    <fieldset>
      <legend>{{ label }}</legend>
      <input type="text" [value]="value" [placeholder]="placeholder" (keyup)="emit($any($event.target).value)" />
      <button (click)="reset()">Reset</button>
    </fieldset>
  `,
})
export class CommonFilterComponent {
  @Output()
  query = new EventEmitter<string>();

  @Input()
  value = '';

  @Input()
  label = '';

  @Input()
  placeholder = '';

  emit(value: string) {
    this.value = value;
    this.query.next(value);
  }

  reset() {
    this.emit('');
  }
}
