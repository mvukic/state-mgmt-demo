import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

let nextId = 0;

@Component({
  selector: 'room-sort-by-attribute-options',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset style="width: 200px">
      <legend>Choose sorting attribute</legend>
      <input
        type="radio"
        [attr.name]="name"
        [attr.id]="roomNameId"
        (click)="attribute.next('name')"
        [checked]="value === 'name'"
      />
      <label [attr.for]="roomNameId">Name</label>
      <input
        type="radio"
        [attr.name]="name"
        [attr.id]="roomDesignationId"
        (click)="attribute.next('designation')"
        [checked]="value === 'designation'"
      />
      <label [attr.for]="roomDesignationId">Designation</label>
    </fieldset>
  `,
})
export class RoomSortByAttributeOptionsCmp {
  readonly name = `${nextId++}`;
  readonly roomNameId = `${nextId++}`;
  readonly roomDesignationId = `${nextId++}`;

  @Input({ required: true })
  value!: 'name' | 'designation' | undefined;

  @Output()
  attribute = new EventEmitter<'name' | 'designation' | undefined>();
}
