import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConstantsApiService {
  _getConstants(): Observable<{ constant: string }> {
    return of({ constant: 'some constant' });
  }
}
