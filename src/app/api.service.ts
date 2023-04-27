import { inject, Injectable } from '@angular/core';
import { MO, PO, SWVP } from './model/models';
import { delay, Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { actionsMO } from './state/mo/actions';
import { actionsPO } from './state/mo/po/actions';
import { actionsSWVP } from './state/mo/swvp/actions';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  #store = inject(Store);

  createMO(name: string): Observable<MO> {
    return of({
      id: crypto.randomUUID(),
      name,
    }).pipe(tap((mo) => this.#store.dispatch(actionsMO.init(mo))));
  }

  getMO(id: string): Observable<MO> {
    return of({
      id: crypto.randomUUID(),
      name: `MO ${id}`,
    }).pipe(
      delay(1000),
      tap((mo) => this.#store.dispatch(actionsMO.init(mo)))
    );
  }

  getPOs(id: string): Observable<PO[]> {
    return of([
      { id: 'b3bfe33f-775b-4ac4-a144-b61aad48cf9d', name: 'a', designation: 'd' },
      { id: '957a081a-4bf2-43f7-af0f-925f6dbbc752', name: 'b', designation: 'c' },
    ]).pipe(
      delay(1000),
      tap((pos) => this.#store.dispatch(actionsPO.init({ pos })))
    );
  }

  getSWVPs(id: string): Observable<SWVP[]> {
    return of([
      { id: 'e49f6093-d597-4fb9-a10d-ae4de58993dd', name: 'a', designation: 'd', pos: [] },
      {
        id: 'd9cecf49-6add-43d4-9588-86abbbde4116',
        name: 'b',
        designation: 'c',
        pos: [{ id: '957a081a-4bf2-43f7-af0f-925f6dbbc752', name: 'PO 2', designation: 'PO 2' }],
      },
    ]).pipe(tap((swvps) => this.#store.dispatch(actionsSWVP.init({ swvps }))));
  }
}
