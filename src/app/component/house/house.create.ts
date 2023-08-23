import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
        input {
            width: 300px
        }
      }
    `,
  ],
  template: `
    <form #form="ngForm">
      <input [(ngModel)]="name" required name="name" [disabled]="!isLoggedIn()" />
      <button [disabled]="!isLoggedIn() || form.invalid" (click)="create()">Create</button>
      <button [disabled]="!isLoggedIn() || form.invalid" (click)="load()">Load by id</button>
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

  load() {
    this.#store.dispatch(actionsHouse.load({ id: this.name }));
  }
}
