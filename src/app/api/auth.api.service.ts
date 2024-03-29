import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPropertiesState } from '@state/properties';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  #config = inject(Store).selectSignal(selectPropertiesState.selectConfig);

  login(name: string): Observable<{ name: string }> {
    console.log('_login', this.#config());
    const even = Math.floor(Math.random() * 1000) % 2 === 0;
    if (even) {
      localStorage.setItem('user', name);
      return of({ name });
    }
    return throwError(() => 'Auth error');
  }

  _getUser(): Observable<{ name: string }> {
    console.log('_getUser', this.#config());
    const name = localStorage.getItem('user');
    if (name) {
      return of({ name });
    }
    return throwError(() => 'No user found in storage');
  }
}
