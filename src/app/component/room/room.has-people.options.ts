import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'room-filter-has-people-options',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset style="width: 200px">
      <legend>Has people</legend>
      <input
        type="radio"
        [attr.name]="name"
        [attr.id]="yesId"
        (click)="hasPeople.next(true)"
        [checked]="value === true"
      />
      <label [attr.for]="yesId">Yes</label>
      <input
        type="radio"
        [attr.name]="name"
        [attr.id]="noId"
        (click)="hasPeople.next(false)"
        [checked]="value === false"
      />
      <label [attr.for]="noId">No</label>
      <input
        type="radio"
        [attr.name]="name"
        [attr.id]="noneId"
        (click)="hasPeople.next(undefined)"
        [checked]="value === undefined"
      />
      <label [attr.for]="noneId">None</label>
    </fieldset>
  `,
})
export class RoomHasPeopleFilterOptionsCmp {
  readonly name = crypto.randomUUID();
  readonly yesId = `yes-${this.name}`;
  readonly noId = `no-${this.name}`;
  readonly noneId = `none-${this.name}`;

  @Input({ required: true })
  value!: boolean | undefined;

  @Output()
  hasPeople = new EventEmitter<boolean | undefined>();
}
