import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { actionsMO } from './state/mo/actions';
import { selectAuthNotLoggedIn } from './state/auth/selectors';
import { LetModule } from '@ngrx/component';
import { tap } from "rxjs";
import { Router } from "@angular/router";

type ViewModel = {
  form: FormGroup<{ name: FormControl<string> }>;
};

@Component({
  selector: 'create-market-offer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LetModule, ReactiveFormsModule],
  template: `
    <div *ngrxLet="isNotLogged$ as isNotLogged">
      <form [formGroup]="vm.form">
        <input type="text" formControlName="name" />
      </form>
      <button [disabled]="isNotLogged || vm.form.invalid" (click)="create()">Create</button>
      <button [disabled]="isNotLogged || vm.form.invalid" (click)="open()">Open</button>
    </div>
  `,
})
export default class CreateMarketOfferComponent {
  #store = inject(Store);
  #router = inject(Router);

  vm = buildViewModel();

  isNotLogged$ = this.#store.select(selectAuthNotLoggedIn)
    .pipe(tap((v) => v ? this.vm.form.disable() : this.vm.form.enable()));

  create() {
    this.#store.dispatch(actionsMO.create({ name: this.vm.form.value.name! }));
  }

  open() {
    this.#router.navigateByUrl(`edit/${this.vm.form.value.name}`)
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
