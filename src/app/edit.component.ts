import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditMarketOfferComponent } from './edit-market-offer.component';
import { EditPOsComponent } from './edit-pos.component';
import { EditSWVPsComponent } from './edit-swvps.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  template: `
    <edit-market-offer />
    <edit-pos />
    <edit-swvps />
  `,
  imports: [EditMarketOfferComponent, EditPOsComponent, EditSWVPsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditComponent {}
