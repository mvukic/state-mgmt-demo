import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf } from '@angular/common';

let nextId = 0;

@Component({
  selector: 'person-sort-by-attribute-options',
  standalone: true,
  imports: [NgForOf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset style="width: 170px">
      <legend>Choose sorting attribute</legend>
      <input
        type="radio"
        [attr.name]="name"
        [attr.id]="firstNameId"
        (click)="attribute.next('firstName')"
        [checked]="value === 'firstName'"
      />
      <label [attr.for]="firstNameId">First name</label>
      <input
        type="radio"
        [attr.name]="name"
        [attr.id]="lastNameId"
        (click)="attribute.next('lastName')"
        [checked]="value === 'lastName'"
      />
      <label [attr.for]="lastNameId">Last name</label>
    </fieldset>
  `,
})
export class PersonSortByAttributeOptionsCmp {
  readonly name = `${nextId++}`;
  readonly firstNameId = `${nextId++}`;
  readonly lastNameId = `${nextId++}`;

  @Input({ required: true })
  value!: 'firstName' | 'lastName' | undefined;

  @Output()
  attribute = new EventEmitter<'firstName' | 'lastName' | undefined>();
}
