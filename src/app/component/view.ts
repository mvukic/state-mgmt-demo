import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { HouseEditCmp } from './house/house.edit';
import { PeopleEditCmp } from './person/people.edit';
import { RoomsEditCmp } from './room/rooms.edit';
import { Store } from '@ngrx/store';
import { actionsHouse } from '@state/house';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [HouseEditCmp, PeopleEditCmp, RoomsEditCmp, CdkDropListGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset>
      <legend>House details</legend>
      <edit-house />
    </fieldset>
    <ng-container cdkDropListGroup>
      <fieldset>
        <legend>People details</legend>
        <edit-people />
      </fieldset>
      <fieldset>
        <legend>Rooms details</legend>
<!--        <edit-rooms />-->
      </fieldset>
    </ng-container>
  `,
})
export default class HouseViewCmp {
  #store = inject(Store);

  @Input({ required: true })
  set id(id: string) {
    this.#store.dispatch(actionsHouse.open({ id }));
  }
}
