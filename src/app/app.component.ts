import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { actionsAuth, selectorsAuthState } from '@state/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="background: black;color: white;display: flex">
      <span> {{ name() }}</span>
      <span style="flex: 1 1 auto"></span>
      <button [disabled]="!isLoggedIn()" (click)="logout()">Logout</button>
    </div>
    <router-outlet />
  `,
})
export class AppComponent {
  #store = inject(Store);
  name = this.#store.selectSignal(selectorsAuthState.selectName);
  isLoggedIn = this.#store.selectSignal(selectorsAuthState.selectLoggedIn);

  logout() {
    this.#store.dispatch(actionsAuth.logout());
  }
}
