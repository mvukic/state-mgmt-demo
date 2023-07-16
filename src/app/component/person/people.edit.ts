import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { Person } from '@domain/person/model';
import { NgForOf } from '@angular/common';
import { personActions, selectPeople } from 'src/app/state/person';
import { FilterLogicComponent, QueryFilterComponent } from '@common/component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { filterPersonFns, PersonFilter } from '@domain/person/filter';
import { PersonSort, sortPersonFns } from '@domain/person/sort';
import { PersonSortByAttributeOptionsCmp } from './person.sort-by-attribute.options';

@Component({
  selector: 'edit-people',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PersonSortByAttributeOptionsCmp,
    QueryFilterComponent,
    FilterLogicComponent,
    FormsModule,
    CdkDropList,
    NgForOf,
    CdkDrag,
  ],
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div style="display: flex">
        <fieldset>
          <legend>Filtering</legend>
          <query-filter
            placeholder="Filter by first or last name"
            label="Filter query"
            [value]="filter.query()"
            (query)="filter.query.set($event)"
          />
          <query-filter-logic [value]="filter.logic()" (logic)="filter.logic.set($event)" />
        </fieldset>

        <fieldset style="width: 170px">
          <legend>Sorting</legend>
          <person-sort-by-attribute-options [value]="sort.attribute()" (attribute)="sort.attribute.set($event)" />
        </fieldset>
      </div>
      <div>
        <span>Count: {{ vm().length }}</span> <br />
        <!-- Buttons-->
        <button (click)="add()">Add</button>

        <!-- Content-->
        <ul cdkDropList cdkDropListSortingDisabled>
          <li *ngFor="let person of vm()">
            <button (click)="delete(person.id)">Delete</button>
            <span cdkDrag [cdkDragData]="person.id">{{ person.id }}</span>
            <button [disabled]="form.invalid || form.pristine" (click)="update(person)">Update</button>
            <form #form="ngForm">
              <input [(ngModel)]="person.firstName" required name="firstName" />
              <input [(ngModel)]="person.lastName" required name="lastName" />
            </form>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class PeopleEditCmp {
  #store = inject(Store);

  /* Holds filter data */
  filter = new PersonFilter();
  /* Holds sort data */
  sort = new PersonSort({ attribute: 'firstName' });

  /* Observes different data signals: the data itself, filtering data, sorting data */
  #data = this.#store.selectSignal(selectPeople);
  vm = computed(() => {
    const data = this.#data();
    const filtered = filterPersonFns.filter(data, this.filter.value());
    const sorted = sortPersonFns.sort(filtered, this.sort.value());
    return buildViewModel(sorted);
  });

  add() {
    const n1 = Math.floor(Math.random() * 100);
    const n2 = Math.floor(Math.random() * 100);
    this.#store.dispatch(personActions.create({ firstName: `first name ${n1}`, lastName: `last name ${n2}` }));
  }

  delete(personId: string) {
    this.#store.dispatch(personActions.delete({ personId }));
  }

  update(person: Person) {
    this.#store.dispatch(
      personActions.update({ personId: person.id, firstName: person.firstName, lastName: person.lastName }),
    );
  }
}

function buildViewModel(people: Person[]): ViewModel {
  return structuredClone(people);
}

type ViewModel = Person[];
