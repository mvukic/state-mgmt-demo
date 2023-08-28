import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  vm = this.#store.selectSignal(selectHouseState.selectHouse);

  update() {
    const { id, name } = this.vm();
    this.#store.dispatch(actionsHouse.update({ id, name }));
  }
}
