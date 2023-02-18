import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { actionsMO } from './state/mo/actions';
import { selectAuthNotLoggedIn } from './state/auth/selectors';
import { AsyncPipe } from '@angular/common';
import { LetModule } from '@ngrx/component';

@Component({
  selector: 'create-market-offer',
  template: `
    <div *ngrxLet="isNotLogged$ as isNotLogged">
      <input [disabled]="isNotLogged" type="text" [(ngModel)]="name" />
      <button [disabled]="isNotLogged" (click)="create()">Create</button>
    </div>
  `,
  imports: [FormsModule, AsyncPipe, LetModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateMarketOfferComponent {
  #store = inject(Store);

  isNotLogged$ = this.#store.select(selectAuthNotLoggedIn);

  name: string = '';

  create() {
    this.#store.dispatch(actionsMO.create({ name: this.name }));
  }
}
