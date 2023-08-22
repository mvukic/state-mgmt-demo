import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { actionsHouse, selectorsHouseState } from '@state/house';

@Component({
  selector: 'house-cmp',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div>
        <!-- Buttons-->
        <button (click)="close()">Close</button>
        <button [disabled]="form.invalid || form.pristine" (click)="update()">Update</button>

        <!-- Content-->
        <div style="display: flex; flex-direction: column;">
          <form #form="ngForm">
            <input [(ngModel)]="vm().name" required name="name" />
          </form>
        </div>
      </div>
    </div>
  `,
})
export class HouseCmp {
  #store = inject(Store);
  #data = this.#store.selectSignal(selectorsHouseState.selectHouse);

  vm = computed(() => structuredClone(this.#data()));

  update() {
    this.#store.dispatch(actionsHouse.update({ name: this.vm().name }));
  }

  close() {
    this.#store.dispatch(actionsHouse.close());
  }
}
