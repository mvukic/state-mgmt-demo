import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigApiService {
  _getConfig(): Observable<{ api: string }> {
    return of({ api: 'http://localhost:8080' });
  }
}
