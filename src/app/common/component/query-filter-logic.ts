import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  protected name = crypto.randomUUID();
  protected orId = `or-${this.name}`;
  protected andId = `and-${this.name}`;

  @Input({ required: true })
  value!: boolean;

  @Output()
  logic = new EventEmitter<boolean>();
}
