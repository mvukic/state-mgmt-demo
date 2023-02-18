import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PO } from './state/mo/models';
import { map } from 'rxjs';
import { NgForOf } from '@angular/common';
import { selectPOs } from './state/mo/selectors';
import { actionsPO } from './state/mo/actions';

type ViewModelPair = {
  po: PO;
  form: FormGroup<{ name: FormControl<string> }>;
};

type ViewModel = {
  data: ViewModelPair[];
};

@Component({
  selector: 'edit-pos',
  standalone: true,
  imports: [LetModule, NgForOf, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>POs</h3>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div *ngrxLet="{ vm: vm$ } as vm">
        <!-- Buttons-->
        <button (click)="add()">Add</button>

        <!-- Content-->
        <ul>
          <li *ngFor="let d of vm.vm.data">
            <button (click)="delete(d.po.id)">Delete</button>
            <span>{{ d.po.id }}</span>
            <button [disabled]="d.form.invalid || d.form.pristine" (click)="update(d)">Update</button>
            <form [formGroup]="d.form">
              <input formControlName="name" />
            </form>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class EditPOsComponent {
  #store = inject(Store);

  vm$ = this.#store.select(selectPOs).pipe(map((pos) => buildViewModel(pos)));

  add() {
    const n = Math.floor(Math.random() * 100);
    this.#store.dispatch(actionsPO.create({ name: `some po name ${n}` }));
  }

  delete(poId: string) {
    this.#store.dispatch(actionsPO.delete({ poId }));
  }

  update(po: ViewModelPair) {
    const update = { ...po.po, ...po.form.value };
    this.#store.dispatch(actionsPO.update(update));
  }
}

function buildViewModel(pos: PO[]): ViewModel {
  const fb = new FormBuilder().nonNullable;
  return {
    data: pos.map((po) => ({
      po,
      form: fb.group({
        name: fb.control(po.name, [Validators.required]),
      }),
    })),
  };
}
