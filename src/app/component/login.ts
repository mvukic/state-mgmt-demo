import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { actionsAuth } from '@state/auth';

@Component({
  selector: 'login-cmp',
  standalone: true,
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
    <div>
      <input type="text" [(ngModel)]="name" />
      <button [disabled]="name.length === 0" (click)="login()">Login</button>
    </div>
  `,
})
export default class LoginCmp {
  #store = inject(Store);

  name = '';

  login() {
    this.#store.dispatch(actionsAuth.login({ name: this.name }));
  }
}
