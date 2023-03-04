import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetModule } from '@ngrx/component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SWVP } from './model/models';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { NgForOf } from '@angular/common';
import { actionsSWVP } from './state/mo/swvp/actions';
import { selectSWVPs } from './state/mo/swvp/selector';

@Component({
  selector: 'edit-swvps',
  standalone: true,
  imports: [LetModule, NgForOf, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div style="display: flex">
        <fieldset style="width: 230px">
          <legend>Set filter query</legend>
          <input type="text" placeholder="Filter SWVPs" (keyup)="filter$.next($any($event.target).value)" />
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
          <input type="radio" name="sort-prop" id="description" disabled />
          <label for="description">Description</label>
        </fieldset>
      </div>
      <div *ngrxLet="{ vm: vm$ } as vm">
        <!-- Buttons-->
        <button (click)="add()">Add</button>

        <!-- Content-->
        <ul>
          <li *ngFor="let pair of vm.vm.data">
            <button (click)="delete(pair.swvp.id)">Delete</button>
            <span>{{ pair.swvp.id }}</span>
            <button [disabled]="pair.form.invalid || pair.form.pristine" (click)="update(pair)">Update</button>
            <form [formGroup]="pair.form">
              <input type="text" formControlName="name" />
            </form>
            <ul>
              <li *ngFor="let po of pair.swvp.pos">
                <span>{{ po.id }} - {{ po.name }}</span>
                <button (click)="removePO(pair.swvp.id, po.id)">Remove</button>
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
  sort = {
    dir$: new BehaviorSubject<'UP' | 'DOWN'>('UP'),
    prop$: new BehaviorSubject<'name'>('name'),
  };

  sort$: Observable<SortType> = combineLatest([this.sort.dir$, this.sort.prop$]).pipe(
    map(([dir, prop]) => ({ dir, prop }))
  );

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

function prepareData(swvps: SWVP[], query: string, sort: SortType): ViewModel {
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

function sortData(swvps: SWVP[], { dir, prop }: SortType): SWVP[] {
  const order = dir == 'UP' ? -1 : 1;
  return [...swvps].sort((a, b) => order * a[prop].localeCompare(b[prop]));
}

type ViewModelPair = {
  swvp: SWVP;
  form: FormGroup<{ name: FormControl<string> }>;
};

type ViewModel = {
  data: ViewModelPair[];
};

type SortType = {
  dir: 'UP' | 'DOWN';
  prop: 'name';
};
