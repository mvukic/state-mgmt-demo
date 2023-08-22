import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  login(name: string): Observable<{ name: string }> {
    localStorage.setItem('user', name);
    return of({ name });
  }

  getUser(): Observable<{ name: string }> {
    const name = localStorage.getItem('user');
    if (name) {
      return of({ name });
    }
    return throwError(() => Error('No user found in storage'));
  }

  getConstants(): Observable<{ api: string }> {
    return of({ api: 'http://localhost:8080' });
  }
}
