import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { House } from '@domain/house/model';
import { Store } from '@ngrx/store';
import { actionsHouse, selectHouse } from '@state/house';

@Component({
  selector: 'edit-house',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div>
        <!-- Buttons-->
        <button (click)="close()">Close</button>
        <button [disabled]="vm().form.invalid || vm().form.pristine" (click)="updateHouse()">Update</button>

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
export class HouseEditCmp {
  #store = inject(Store);
  #data = this.#store.selectSignal(selectHouse);

  vm = computed(() => {
    const data = this.#data();
    return buildViewModel(data);
  });

  updateHouse() {
    this.#store.dispatch(actionsHouse.update({ name: this.vm().form.value.name!! }));
  }

  close() {
    this.#store.dispatch(actionsHouse.close());
  }
}

function buildViewModel(house: House): ViewModel {
  const fb = new FormBuilder().nonNullable;
  return {
    house,
    form: fb.group({
      name: fb.control<string>(house.name, [Validators.required]),
    }),
  };
}

interface ViewModel {
  house: House;
  form: FormGroup<{ name: FormControl<string> }>;
}
