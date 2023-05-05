import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { EditMarketOfferComponent } from './edit-market-offer.component';
import { EditPOsComponent } from './edit-pos/edit-pos.component';
import { EditSWVPsComponent } from './edit-swvp/edit-swvps.component';
import { Store } from '@ngrx/store';
import { actionsMO } from './state/mo/actions';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [EditMarketOfferComponent, EditPOsComponent, EditSWVPsComponent, CdkDropListGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset>
      <legend>MO details</legend>
      <edit-market-offer />
    </fieldset>
    <ng-container cdkDropListGroup>
      <fieldset>
        <legend>POs details</legend>
        <edit-pos />
      </fieldset>
      <fieldset>
        <legend>SWVPs details</legend>
        <edit-swvps />
      </fieldset>
    </ng-container>
  `,
})
export default class EditComponent {
  #store = inject(Store);

  @Input({ required: true })
  set id(id: string) {
    this.#store.dispatch(actionsMO.open({ id }));
  }
}
