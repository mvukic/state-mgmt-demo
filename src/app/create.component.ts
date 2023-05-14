import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { actionsHouse } from './state/house/actions';
import { selectIsLoggedIn } from './state/auth/selectors';
import { Router } from '@angular/router';

type ViewModel = {
  form: FormGroup<{ name: FormControl<string> }>;
};

@Component({
  selector: 'create-house',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <div>
      <form [formGroup]="vm.form">
        <input type="text" formControlName="name" />
      </form>
      <button [disabled]="!isLoggedIn() || vm.form.invalid" (click)="create()">Create</button>
      <button [disabled]="!isLoggedIn() || vm.form.invalid" (click)="open()">Open</button>
    </div>
  `,
})
export default class CreateHouseComponent {
  #store = inject(Store);
  #router = inject(Router);

  vm = buildViewModel();

  isLoggedIn = this.#store.selectSignal(selectIsLoggedIn);

  constructor() {
    effect(() => {
      this.isLoggedIn() ? this.vm.form.enable() : this.vm.form.disable();
    });
  }

  create() {
    this.#store.dispatch(actionsHouse.create({ name: this.vm.form.value.name! }));
  }

  open() {
    this.#router.navigateByUrl(`edit/${this.vm.form.value.name}`);
  }
}

function buildViewModel(): ViewModel {
  const fb = new FormBuilder().nonNullable;
  return {
    form: fb.group({
      name: fb.control('', [Validators.required]),
    }),
  };
}
