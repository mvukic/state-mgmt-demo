import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConstantsApiService {
  getConstants(): Observable<{ api: string }> {
    return of({ api: 'http://localhost:8080' });
  }
}
