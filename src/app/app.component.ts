import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';
import { selectAuthLoggedIn, selectAuthName } from './state/auth/selectors';
import { actionsAuth } from './state/auth/actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="background: black;color: white;">
      <span> {{ name() }}</span>
      <button (click)="login()" *ngIf="!isLoggedIn()">Login</button>
      <button (click)="logout()" *ngIf="isLoggedIn()">Logout</button>
    </div>
    <router-outlet />
  `,
})
export class AppComponent {
  #store = inject(Store);
  name = this.#store.selectSignal(selectAuthName);
  isLoggedIn = this.#store.selectSignal(selectAuthLoggedIn);

  logout() {
    this.#store.dispatch(actionsAuth.logout());
  }

  login() {
    this.#store.dispatch(actionsAuth.login({ name: '@user_name' }));
  }
}
