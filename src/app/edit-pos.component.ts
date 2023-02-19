import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PO } from './model/models';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { NgForOf } from '@angular/common';
import { selectPOs } from './state/mo/po/selector';
import { actionsPO } from './state/mo/po/actions';

@Component({
  selector: 'edit-pos',
  standalone: true,
  imports: [LetModule, NgForOf, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div style="display: flex">
        <fieldset style="width: 230px">
          <legend>Set filter query</legend>
          <input type="text" placeholder="Filter POs" (keyup)="filter$.next($any($event.target).value)" />
          <button (click)="filter$.next('')">Reset</button>
        </fieldset>
        <fieldset style="width: 170px">
          <legend>Choose sorting direction</legend>
          <input type="radio" name="sort-dir" id="up" (click)="sort.dir$.next('UP')" checked />
          <label for="up">Up</label>
          <input type="radio" name="sort-dir" id="down" (click)="sort.dir$.next('DOWN')" />
          <label for="down">Down</label>
        </fieldset>
        <fieldset style="width: 170px">
          <legend>Choose sorting property</legend>
          <input type="radio" name="sort-prop" id="name" (click)="sort.prop$.next('name')" checked />
          <label for="name">Name</label>
          <input type="radio" name="sort-prop" id="description" (click)="sort.prop$.next('description')" />
          <label for="description">Description</label>
        </fieldset>
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
              <input formControlName="description" />
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
  sort = {
    dir$: new BehaviorSubject<'UP' | 'DOWN'>('UP'),
    prop$: new BehaviorSubject<'name' | 'description'>('name'),
  };

  sort$: Observable<SortType> = combineLatest([this.sort.dir$, this.sort.prop$]).pipe(
    map(([dir, prop]) => ({ dir, prop }))
  );
  vm$ = combineLatest([this.#store.select(selectPOs), this.filter$, this.sort$]).pipe(
    map(([pos, query, sort]) => prepareData(pos, query, sort))
  );

  add() {
    const n1 = Math.floor(Math.random() * 100);
    const n2 = Math.floor(Math.random() * 100);
    this.#store.dispatch(actionsPO.create({ name: `some po name ${n1}`, description: `some po description ${n2}` }));
  }

  delete(poId: string) {
    this.#store.dispatch(actionsPO.delete({ poId }));
  }

  update(pair: ViewModelPair) {
    const update = { ...pair.po, ...pair.form.value };
    this.#store.dispatch(actionsPO.update(update));
  }
}

function prepareData(pos: PO[], query: string, sort: SortType): ViewModel {
  return buildViewModel(sortData(filterData(pos, query), sort));
}

function buildViewModel(pos: PO[]): ViewModel {
  const fb = new FormBuilder().nonNullable;
  return {
    data: pos.map((po) => ({
      po,
      form: fb.group({
        name: fb.control(po.name, [Validators.required]),
        description: fb.control(po.description, [Validators.required]),
      }),
    })),
  };
}

function filterData(pos: PO[], query: string): PO[] {
  if (query.length === 0) {
    return pos;
  }
  return pos.filter((po) => po.name.includes(query) || po.description.includes(query));
}

function sortData(pos: PO[], { dir, prop }: SortType): PO[] {
  const order = dir == 'UP' ? 1 : -1;
  return [...pos].sort((a, b) => order * a[prop].localeCompare(b[prop]));
}

type ViewModelPair = {
  po: PO;
  form: FormGroup<{ name: FormControl<string>; description: FormControl<string> }>;
};

type ViewModel = {
  data: ViewModelPair[];
};

type SortType = {
  dir: 'UP' | 'DOWN';
  prop: 'name' | 'description';
};
