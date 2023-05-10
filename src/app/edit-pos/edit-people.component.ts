import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from '../model/models';
import { NgForOf } from '@angular/common';
import { selectPeople } from '../state/house/person/selector';
import { actionsPerson } from '../state/house/person/actions';
import { QueryFilterComponent, FilterLogicComponent } from '../filter.component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { PersonFilter, filterPeople } from './filter';
import { PersonSort, sortPeople } from './sort';

@Component({
  selector: 'person-attribute-filter',
  standalone: true,
  imports: [NgForOf],
  template: `
    <fieldset style="width: 170px">
      <legend>Choose sorting attribute</legend>
      <input
        type="radio"
        name="person-sort-attribute"
        id="person-first-name"
        (click)="attribute.next('firstName')"
        [checked]="value === 'firstName'"
      />
      <label for="person-first-name">First name</label>
      <input
        type="radio"
        name="person-sort-attribute"
        id="person-last-name"
        (click)="attribute.next('lastName')"
        [checked]="value === 'lastName'"
      />
      <label for="person-last-name">Last name</label>
    </fieldset>
  `,
})
export class PersonSortByAttributeComponent {
  @Input({ required: true })
  value!: 'firstName' | 'lastName' | undefined;

  @Output()
  attribute = new EventEmitter<'firstName' | 'lastName' | undefined>();
}

@Component({
  selector: 'edit-people',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    QueryFilterComponent,
    CdkDropList,
    CdkDrag,
    FilterLogicComponent,
    PersonSortByAttributeComponent,
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
          <person-attribute-filter [value]="sort.attribute()" (attribute)="sort.attribute.set($event)" />
        </fieldset>
      </div>
      <div>
        <span>Count: {{ vm().data.length }}</span> <br />
        <!-- Buttons-->
        <button (click)="add()">Add</button>

        <!-- Content-->
        <ul cdkDropList cdkDropListSortingDisabled>
          <li *ngFor="let pair of vm().data">
            <button (click)="delete(pair.person.id)">Delete</button>
            <span cdkDrag [cdkDragData]="pair.person.id">{{ pair.person.id }}</span>
            <button [disabled]="pair.form.invalid || pair.form.pristine" (click)="update(pair)">Update</button>
            <form [formGroup]="pair.form">
              <input formControlName="firstName" />
              <input formControlName="lastName" />
            </form>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class EditPeopleComponent {
  #store = inject(Store);

  /* Holds filter data */
  filter = new PersonFilter();
  /* Holds sort data */
  sort = new PersonSort({ attribute: 'firstName' });

  /* Observes different data signals: the data itself, filtering data, sorting data */
  #data = this.#store.selectSignal(selectPeople);
  vm = computed(() => {
    const data = this.#data();
    const filtered = filterPeople(data, this.filter.value());
    const sorted = sortPeople(filtered, this.sort.value());
    return buildViewModel(sorted);
  });

  add() {
    const n1 = Math.floor(Math.random() * 100);
    const n2 = Math.floor(Math.random() * 100);
    this.#store.dispatch(
      actionsPerson.create({ firstName: `first name ${n1}`, lastName: `last name ${n2}` })
    );
  }

  delete(personId: string) {
    this.#store.dispatch(actionsPerson.delete({ personId }));
  }

  update(pair: ViewModelPair) {
    const update = { ...pair.person, ...pair.form.value };
    this.#store.dispatch(actionsPerson.update(update));
  }
}

function buildViewModel(people: Person[]): ViewModel {
  const fb = new FormBuilder().nonNullable;
  return {
    data: people.map((person) => ({
      person,
      form: fb.group({
        firstName: fb.control(person.firstName, [Validators.required]),
        lastName: fb.control(person.lastName, [Validators.required]),
      }),
    })),
  };
}

export type ViewModelPair = {
  person: Person;
  form: FormGroup<{ firstName: FormControl<string>; lastName: FormControl<string> }>;
};

export type ViewModel = {
  data: ViewModelPair[];
};
