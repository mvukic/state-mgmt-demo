import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { EditMarketOfferComponent } from './edit-market-offer.component';
import { EditPOsComponent } from './edit-pos.component';
import { EditSWVPsComponent } from './edit-swvps.component';
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-edit',
  standalone: true,
  template: `
    <fieldset>
      <legend>MO details</legend>
      <edit-market-offer />
    </fieldset>
    <fieldset>
      <legend>POs details</legend>
      <edit-pos />
    </fieldset>
    <fieldset>
      <legend>SWVPs details</legend>
      <edit-swvps />
    </fieldset>
  `,
  imports: [EditMarketOfferComponent, EditPOsComponent, EditSWVPsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditComponent {
  #store = inject(Store);
}
