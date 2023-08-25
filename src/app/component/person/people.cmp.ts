import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Person } from '@domain/person/model';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { actionsPerson, selectPersonState } from '@state/house/person';

@Component({
  selector: 'people-cmp',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CdkDropList, NgForOf, CdkDrag],
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
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
            <span>Dialog open: {{ open() }}</span>
            <form #form="ngForm">
              <input [(ngModel)]="person.firstName" required name="firstName" (ngModelChange)="open.set(true)" />
              <input [(ngModel)]="person.lastName" required name="lastName" (ngModelChange)="open.set(true)" />
            </form>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class PeopleCmp {
  #store = inject(Store);
  #actions = inject(Actions);

  vm = this.#store.selectSignal(selectPersonState.all);

  /* Mocks dialog open state */
  open = signal(false);

  add() {
    const n1 = Math.floor(Math.random() * 100);
    const n2 = Math.floor(Math.random() * 100);
    this.#store.dispatch(actionsPerson.create({ firstName: `first name ${n1}`, lastName: `last name ${n2}` }));
  }

  delete(id: string) {
    this.#store.dispatch(actionsPerson.delete({ id }));
  }

  update(person: Person) {
    this.#actions.pipe(ofType(actionsPerson.updateSuccess)).subscribe(() => this.open.set(false));
    this.#store.dispatch(
      actionsPerson.update({ id: person.id, firstName: person.firstName, lastName: person.lastName }),
    );
  }
}
