import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { NgIf } from '@angular/common';
import { selectAuthLoggedIn, selectAuthName } from './state/auth/selectors';
import { actionsAuth } from './state/auth/actions';

@Component({
  selector: 'app-root',
  template: `
    <div style="background: black;color: white;" *ngrxLet="{ name: name$, isLoggedIn: isLogged$ } as vm">
      <span> {{ vm.name }}</span>
      <button (click)="login()" *ngIf="!vm.isLoggedIn">Login</button>
      <button (click)="logout()" *ngIf="vm.isLoggedIn">Logout</button>
    </div>
    <router-outlet></router-outlet>
  `,
  imports: [RouterOutlet, LetModule, NgIf],
  standalone: true,
})
export class AppComponent {
  #store = inject(Store);
  name$ = this.#store.select(selectAuthName);
  isLogged$ = this.#store.select(selectAuthLoggedIn);

  logout() {
    this.#store.dispatch(actionsAuth.logout());
  }

  login() {
    this.#store.dispatch(
      actionsAuth.login({
        name: '@user_name',
      })
    );
  }
}
