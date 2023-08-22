import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectorsAuthState } from '@state/auth';
import { actionsHouse } from '@state/house';

@Component({
  selector: 'house-create-or-open-cmp',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  styles: [
    `
      :host {
        height: 100%;
        display: grid;
        place-items: center;
      }
    `,
  ],
  template: `
    <form #form="ngForm">
      <input [(ngModel)]="name" required name="name" [disabled]="!isLoggedIn()" />
      <button [disabled]="!isLoggedIn() || form.invalid" (click)="create()">Create</button>
      <button [disabled]="!isLoggedIn() || form.invalid" (click)="open()">Open</button>
    </form>
  `,
})
export default class HouseCreateOrOpenCmp {
  #store = inject(Store);

  name = '';

  isLoggedIn = this.#store.selectSignal(selectorsAuthState.selectIsLoggedIn);

  create() {
    this.#store.dispatch(actionsHouse.create({ name: this.name }));
  }

  open() {
    this.#store.dispatch(actionsHouse.open({ id: this.name }));
  }
}
