import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Person } from '@domain/person/model';
import { Store } from '@ngrx/store';
import { actionsPerson, selectPersonState } from 'src/app/state/person';

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
export class PeopleCmp {
  #store = inject(Store);

  #data = this.#store.selectSignal(selectPersonState.all);
  vm = computed(() => structuredClone(this.#data()));

  add() {
    const n1 = Math.floor(Math.random() * 100);
    const n2 = Math.floor(Math.random() * 100);
    this.#store.dispatch(actionsPerson.create({ firstName: `first name ${n1}`, lastName: `last name ${n2}` }));
  }

  delete(id: string) {
    this.#store.dispatch(actionsPerson.delete({ id }));
  }

  update(person: Person) {
    this.#store.dispatch(
      actionsPerson.update({ id: person.id, firstName: person.firstName, lastName: person.lastName }),
    );
  }
}
