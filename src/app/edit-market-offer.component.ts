import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MO } from './model/models';
import { actionsMO } from './state/mo/actions';
import { selectMO } from './state/mo/selectors';

interface ViewModel {
  mo: MO;
  form: FormGroup<{ name: FormControl<string> }>;
}

@Component({
  selector: 'edit-market-offer',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div>
        <!-- Buttons-->
        <button (click)="close()">Close</button>
        <button [disabled]="vm().form.invalid || vm().form.pristine" (click)="updateMO()">Update</button>

        <!-- Content-->
        <div style="display: flex; flex-direction: column;">
          <form [formGroup]="vm().form">
            <input type="text" formControlName="name" />
          </form>
        </div>
      </div>
    </div>
  `,
})
export class EditMarketOfferComponent {
  #store = inject(Store);
  #data = this.#store.selectSignal(selectMO);

  vm = computed(() => {
    const data = this.#data();
    return buildViewModel(data);
  });

  updateMO() {
    this.#store.dispatch(actionsMO.update({ name: this.vm().form.value.name!! }));
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
