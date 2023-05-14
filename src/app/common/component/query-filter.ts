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
  selector: 'query-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <fieldset>
      <legend>{{ label }}</legend>
      <input type="text" [value]="value || ''" [placeholder]="placeholder" (keyup)="onKeyUp($event)" />
      <button (click)="this.emit(undefined)">Reset</button>
    </fieldset>
  `,
})
export class QueryFilterComponent implements OnChanges {
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

  onKeyUp(event: KeyboardEvent) {
    const element = event.target as HTMLInputElement;
    const value = element.value as string | undefined;
    if (value !== undefined && value.trim.length > 0) {
      this.emit(value);
    } else {
      this.emit(undefined);
    }
  }
}
