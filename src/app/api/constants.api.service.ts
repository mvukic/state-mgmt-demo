import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPropertiesState } from '@state/properties';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConstantsApiService {
  #config = inject(Store).selectSignal(selectPropertiesState.selectConfig);

  _getConstants(): Observable<{ constant: string }> {
    console.log('_getConstants', this.#config());
    return of({ constant: 'some constant' });
  }
}
