import { Injectable, inject } from '@angular/core';
import { HttpError } from '@api';
import { Store } from '@ngrx/store';
import { selectCommonState } from '@state/common';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApiService {

  #config = inject(Store).selectSignal(selectCommonState.config);

  login(name: string): Observable<{ name: string }> {
    console.log('login using api', this.#config());
    localStorage.setItem('user', name);
    return of({ name });
  }

  _getUser(): Observable<{ name: string }> {
    console.log('_getUser using api', this.#config());
    const name = localStorage.getItem('user');
    if (name) {
      return of({ name });
    }
    return throwError(() => ({ message: 'No user found in storage' }) as HttpError);
  }
}
