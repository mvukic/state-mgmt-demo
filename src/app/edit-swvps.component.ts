import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SWVP } from './model/models';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { NgForOf } from '@angular/common';
import { actionsSWVP } from './state/mo/swvp/actions';
import { selectSWVPs } from './state/mo/swvp/selector';

@Component({
  selector: 'edit-swvps',
  standalone: true,
  imports: [LetModule, NgForOf, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>SWVPs</h3>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div>
        <input type="text" placeholder="Filter SWVPs" (keyup)="filter$.next($any($event.target).value)" />
        <button (click)="filter$.next('')">Reset</button>
        <div><button (click)="sort$.next('UP')">UP</button><button (click)="sort$.next('DOWN')">DOWN</button></div>
      </div>
      <div *ngrxLet="{ vm: vm$ } as vm">
        <!-- Buttons-->
        <button (click)="add()">Add</button>

        <!-- Content-->
        <ul>
          <li *ngFor="let d of vm.vm.data">
            <button (click)="delete(d.swvp.id)">Delete</button>
            <span>{{ d.swvp.id }}</span>
            <button [disabled]="d.form.invalid || d.form.pristine" (click)="update(d)">Update</button>
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

  filter$ = new BehaviorSubject('');
  sort$ = new BehaviorSubject<'UP' | 'DOWN'>('UP');

  vm$ = combineLatest([this.#store.select(selectSWVPs), this.filter$, this.sort$]).pipe(
    map(([swvps, query, sort]) => prepareData(swvps, query, sort))
  );

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

function prepareData(swvps: SWVP[], query: string, sort: 'UP' | 'DOWN'): ViewModel {
  return buildViewModel(sortData(filterData(swvps, query), sort));
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

function filterData(swvps: SWVP[], query: string): SWVP[] {
  if (query.length === 0) {
    return swvps;
  }
  return swvps.filter((swvp) => swvp.name.includes(query));
}

function sortData(swvps: SWVP[], sort: 'UP' | 'DOWN'): SWVP[] {
  const order = sort == 'UP' ? -1 : 1;
  return [...swvps].sort((a, b) => order * a.name.localeCompare(b.name));
}

type ViewModelPair = {
  swvp: SWVP;
  form: FormGroup<{ name: FormControl<string> }>;
};

type ViewModel = {
  data: ViewModelPair[];
};
