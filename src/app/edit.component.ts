import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { EditMarketOfferComponent } from './edit-market-offer.component';
import { EditPOsComponent } from './edit-pos.component';
import { EditSWVPsComponent } from './edit-swvps.component';
import { Store } from '@ngrx/store';
import { actionsMO } from './state/mo/actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [EditMarketOfferComponent, EditPOsComponent, EditSWVPsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
})
export default class EditComponent implements OnInit {
  #store = inject(Store);
  #route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.#route.snapshot.queryParamMap.get('id')!;
    this.#store.dispatch(actionsMO.open({ id }));
  }
}
