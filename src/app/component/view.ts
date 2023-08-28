import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { actionsHouse, selectHouseState } from '@state/house';
import { HouseCmp } from './house/house.cmp';
import { PeopleCmp } from './person/people.cmp';
import { RoomsCmp } from './room/rooms.cmp';

@Component({
  selector: 'house-view-cmp',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HouseCmp, PeopleCmp, RoomsCmp, CdkDropListGroup, NgIf],
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  template: `
    <ng-container *ngIf="isSet()">
      <button (click)="close()">Close</button>
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
    </ng-container>
    <ng-container *ngIf="!isSet()">
      <div style="display: grid; height: 100%; place-items: center;">
        <span>Loading house ...</span>
      </div>
    </ng-container>
  `,
})
export default class HouseViewCmp {
  #store = inject(Store);

  readonly isSet = this.#store.selectSignal(selectHouseState.selectIsSet);

  close() {
    this.#store.dispatch(actionsHouse.close());
  }
}
