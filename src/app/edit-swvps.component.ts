import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SWVP } from './state/mo/models';
import { map } from 'rxjs';
import { NgForOf } from '@angular/common';
import { selectSWVPs } from './state/mo/selectors';
import { actionsSWVP } from './state/mo/actions';

type ViewModelPair = {
  swvp: SWVP;
  form: FormGroup<{ name: FormControl<string> }>;
};

type ViewModel = {
  data: ViewModelPair[];
};

@Component({
  selector: 'edit-swvps',
  standalone: true,
  imports: [LetModule, NgForOf, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>SWVPs</h3>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div *ngrxLet="{ vm: vm$ } as vm">
        <!-- Buttons-->
        <button (click)="add()">Add</button>

        <!-- Content-->
        <ul>
          <li *ngFor="let d of vm.vm.data">
            <button (click)="delete(d.swvp.id)">Delete</button>
            <span>{{ d.swvp.id }}</span>
            <button
              [disabled]="d.form.invalid || d.form.pristine"
              (click)="update(d)"
            >
              Update
            </button>
            <form [formGroup]="d.form">
              <input type="text" formControlName="name" />
            </form>
            <ul>
              <li *ngFor="let po of d.swvp.pos">
                <span>{{ po.id }} - {{ po.name }}</span>
                <button (click)="removePO(d.swvp.id, po.id)">Remove</button>
              </li>
            </ul>
            <br />
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class EditSWVPsComponent {
  #store = inject(Store);

  vm$ = this.#store
    .select(selectSWVPs)
    .pipe(map((swvps) => buildViewModel(swvps)));

  add() {
    const n = Math.floor(Math.random() * 100);
    this.#store.dispatch(actionsSWVP.create({ name: `some swvp name ${n}` }));
  }

  delete(swvpId: string) {
    this.#store.dispatch(actionsSWVP.delete({ swvpId }));
  }

  update(swvp: ViewModelPair) {
    const update = { ...swvp.swvp, ...swvp.form.value };
    this.#store.dispatch(actionsSWVP.update(update));
  }

  removePO(swvpId: string, poId: string) {
    this.#store.dispatch(actionsSWVP.remove_po({ swvpId, poId }));
  }
}

function buildViewModel(swvps: SWVP[]): ViewModel {
  const fb = new FormBuilder().nonNullable;
  return {
    data: swvps.map((swvp) => ({
      swvp,
      form: fb.group({
        name: fb.control(swvp.name, [Validators.required]),
      }),
    })),
  };
}
