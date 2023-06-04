import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '@state/auth';
import { actionsHouse } from '@state/house';

@Component({
  selector: 'create-house',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <form #form="ngForm">
      <input [(ngModel)]="vm.name" required name="name" [disabled]="!isLoggedIn()" /> <br />
      <button [disabled]="!isLoggedIn() || form.invalid" (click)="create()">Create</button>
      <button [disabled]="!isLoggedIn() || form.invalid" (click)="open()">Open</button>
    </form>
  `,
})
export default class HouseCreateCmp {
  #store = inject(Store);
  #router = inject(Router);

  vm = buildViewModel();

  isLoggedIn = this.#store.selectSignal(selectIsLoggedIn);

  create() {
    this.#store.dispatch(actionsHouse.create({ name: this.vm.name! }));
  }

  open() {
    this.#router.navigateByUrl(`edit/${this.vm.name}`);
  }
}

function buildViewModel(): ViewModel {
  return { name: '' };
}

type ViewModel = { name: string };
