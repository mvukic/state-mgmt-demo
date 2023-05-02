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
      <input type="text" [value]="value || ''" [placeholder]="placeholder" (keyup)="emit($any($event.target).value)" />
      <button (click)="this.emit('')">Reset</button>
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
}

@Component({
  selector: 'query-filter-logic',
  standalone: true,
  template: `
    <fieldset>
      <legend>Filter logic</legend>
      <input type="radio" [attr.name]="name" [attr.id]="andId" [checked]="value" (click)="logic.next(true)" />
      <label [attr.for]="andId">And</label>
      <input type="radio" [attr.name]="name" [attr.id]="orId" [checked]="!value" (click)="logic.next(false)" />
      <label [attr.for]="orId">Or</label>
    </fieldset>
  `,
})
export class FilterLogicComponent {
  protected name = Math.random();
  protected orId = `or-${Math.random()}`;
  protected andId = `and-${Math.random()}`;

  @Input({ required: true })
  value!: boolean;

  @Output()
  logic = new EventEmitter<boolean>();
}
