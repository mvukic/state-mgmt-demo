import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PO } from './model/models';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { NgForOf } from '@angular/common';
import { selectPOs } from './state/mo/po/selector';
import { actionsPO } from './state/mo/po/actions';

@Component({
  selector: 'edit-pos',
  standalone: true,
  imports: [LetModule, NgForOf, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>POs</h3>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div>
        <input type="text" placeholder="Filter POs" (keyup)="filter$.next($any($event.target).value)" />
        <button (click)="filter$.next('')">Reset</button>
        <div><button (click)="sort$.next('UP')">UP</button><button (click)="sort$.next('DOWN')">DOWN</button></div>
      </div>
      <div *ngrxLet="{ vm: vm$ } as vm">
        <span>Count: {{ vm.vm.data.length }}</span> <br />
        <!-- Buttons-->
        <button (click)="add()">Add</button>

        <!-- Content-->
        <ul>
          <li *ngFor="let pair of vm.vm.data">
            <button (click)="delete(pair.po.id)">Delete</button>
            <span>{{ pair.po.id }}</span>
            <button [disabled]="pair.form.invalid || pair.form.pristine" (click)="update(pair)">Update</button>
            <form [formGroup]="pair.form">
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

  filter$ = new BehaviorSubject('');
  sort$ = new BehaviorSubject<'UP' | 'DOWN'>('UP');

  vm$ = combineLatest([this.#store.select(selectPOs), this.filter$, this.sort$]).pipe(
    map(([pos, query, sort]) => prepareData(pos, query, sort))
  );

  add() {
    const n = Math.floor(Math.random() * 100);
    this.#store.dispatch(actionsPO.create({ name: `some po name ${n}` }));
  }

  delete(poId: string) {
    this.#store.dispatch(actionsPO.delete({ poId }));
  }

  update(pair: ViewModelPair) {
    const update = { ...pair.po, ...pair.form.value };
    this.#store.dispatch(actionsPO.update(update));
  }
}

function prepareData(pos: PO[], query: string, sort: 'UP' | 'DOWN'): ViewModel {
  return buildViewModel(sortData(filterData(pos, query), sort));
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

function filterData(pos: PO[], query: string): PO[] {
  if (query.length === 0) {
    return pos;
  }
  return pos.filter((po) => po.name.includes(query));
}

function sortData(pos: PO[], sort: 'UP' | 'DOWN'): PO[] {
  const order = sort == 'UP' ? -1 : 1;
  return [...pos].sort((a, b) => order * a.name.localeCompare(b.name));
}

type ViewModelPair = {
  po: PO;
  form: FormGroup<{ name: FormControl<string> }>;
};

type ViewModel = {
  data: ViewModelPair[];
};
