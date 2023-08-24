import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCommonState } from '@state/common';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConstantsApiService {
  #config = inject(Store).selectSignal(selectCommonState.config);

  _getConstants(): Observable<{ constant: string }> {
    console.log('_getConstants', this.#config());
    return of({ constant: 'some constant' });
  }
}
