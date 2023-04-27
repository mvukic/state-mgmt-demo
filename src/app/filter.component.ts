import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'common-query-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <fieldset>
      <legend>{{ label }}</legend>
      <input type="text" [value]="value" [placeholder]="placeholder" (keyup)="emit($any($event.target).value)" />
      <button (click)="this.emit('')">Reset</button>
    </fieldset>
  `,
})
export class CommonFilterComponent implements OnChanges {
  @Output()
  query = new EventEmitter<string | undefined>();

  @Input()
  value: string | undefined = '';

  @Input()
  label = '';

  @Input()
  placeholder = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.emit(changes['value'].currentValue);
    }
  }

  emit(value?: string) {
    this.value = value;
    this.query.next(value);
  }
}
