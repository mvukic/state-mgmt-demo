import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { HouseCmp } from './house/house.cmp';
import { PeopleCmp } from './person/people.cmp';
import { RoomsCmp } from './room/rooms.cmp';
import { Store } from '@ngrx/store';
import { actionsHouse } from '@state/house';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  selector: 'house-view-cmp',
  standalone: true,
  imports: [HouseCmp, PeopleCmp, RoomsCmp, CdkDropListGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset>
      <legend>House details</legend>
      <house-cmp />
    </fieldset>
    <ng-container cdkDropListGroup>
      <fieldset>
        <legend>People details</legend>
        <people-cmp />
      </fieldset>
      <fieldset>
        <legend>Rooms details</legend>
        <rooms-cmp />
      </fieldset>
    </ng-container>
  `,
})
export default class HouseViewCmp {
  #store = inject(Store);

  @Input()
  set id(id: string) {
    this.#store.dispatch(actionsHouse.open({ id }));
  }
}
