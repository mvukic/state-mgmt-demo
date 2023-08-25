import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { actionsHouse, selectHouseState } from '@state/house';

@Component({
  selector: 'house-cmp',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div>
        <!-- Content-->
        <div style="display: flex; flex-direction: column;">
          <form #form="ngForm">
            <input [(ngModel)]="vm().name" required name="name" />
          </form>
        </div>
        <!-- Buttons-->
        <button [disabled]="form.invalid || form.pristine" (click)="update()">Update</button>
      </div>
    </div>
  `,
})
export class HouseCmp {
  #store = inject(Store);
  #data = this.#store.selectSignal(selectHouseState.house);

  vm = computed(() => this.#data());

  update() {
    this.#store.dispatch(actionsHouse.update({ id: this.#data().id, name: this.vm().name }));
  }
}
