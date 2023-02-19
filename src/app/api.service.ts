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
      { id: 'b3bfe33f-775b-4ac4-a144-b61aad48cf9d', name: 'PO 1', description: 'PO 1' },
      { id: '957a081a-4bf2-43f7-af0f-925f6dbbc752', name: 'PO 2', description: 'PO 2' },
    ]).pipe(
      delay(1000),
      tap((pos) => this.#store.dispatch(actionsPO.init({ pos })))
    );
  }

  getSWVPs(id: string): Observable<SWVP[]> {
    return of([
      { id: 'SWVP 1', name: 'SWVP 1', pos: [] },
      {
        id: 'SWVP 2',
        name: 'SWVP 2',
        pos: [{ id: '957a081a-4bf2-43f7-af0f-925f6dbbc752', name: 'PO 2', description: 'PO 2' }],
      },
    ]).pipe(tap((swvps) => this.#store.dispatch(actionsSWVP.init({ swvps }))));
  }
}
