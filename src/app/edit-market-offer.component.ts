import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MO } from './model/models';
import { map } from 'rxjs';
import { actionsMO } from './state/mo/actions';
import { selectMO } from './state/mo/selectors';

interface ViewModel {
  mo: MO;
  form: FormGroup<{ name: FormControl<string> }>;
}

@Component({
  selector: 'edit-market-offer',
  standalone: true,
  imports: [LetModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div *ngrxLet="{ vm: vm$ } as vm">
        <!-- Buttons-->
        <button (click)="close()">Close</button>
        <button [disabled]="vm.vm.form.invalid || vm.vm.form.pristine" (click)="updateMO(vm.vm)">Update</button>

        <!-- Content-->
        <div style="display: flex; flex-direction: column;">
          <form [formGroup]="vm.vm.form">
            <input type="text" formControlName="name" required />
          </form>
        </div>
      </div>
    </div>
  `,
})
export class EditMarketOfferComponent {
  #store = inject(Store);

  vm$ = this.#store.select(selectMO).pipe(map((mo) => buildViewModel(mo)));

  updateMO(vm: ViewModel | undefined) {
    if (!vm) {
      return;
    }
    this.#store.dispatch(actionsMO.update({ name: vm.form.value.name!! }));
  }

  close() {
    this.#store.dispatch(actionsMO.close());
  }
}

function buildViewModel(mo: MO): ViewModel {
  const fb = new FormBuilder().nonNullable;
  return {
    mo,
    form: fb.group({
      name: fb.control<string>(mo.name, [Validators.required]),
    }),
  };
}
