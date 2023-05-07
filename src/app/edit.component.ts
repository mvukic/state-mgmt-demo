import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { EditHouseComponent } from './edit-house.component';
import { EditPeopleComponent } from './edit-pos/edit-people.component';
import { EditRoomsComponent } from './edit-rooms/edit-rooms.component';
import { Store } from '@ngrx/store';
import { actionsHouse } from './state/house/actions';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [EditHouseComponent, EditPeopleComponent, EditRoomsComponent, CdkDropListGroup],
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
        <edit-rooms />
      </fieldset>
    </ng-container>
  `,
})
export default class EditComponent {
  #store = inject(Store);

  @Input({ required: true })
  set id(id: string) {
    this.#store.dispatch(actionsHouse.open({ id }));
  }
}
