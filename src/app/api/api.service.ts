import { inject, Injectable } from '@angular/core';
import { House } from '@domain/house/model';
import { Person } from '@domain/person/model';
import { Room } from '@domain/room/model';
import { Store } from '@ngrx/store';
import { actionsHouse } from '@state/house';
import { actionsPerson } from '@state/house/person';
import { actionsRoom } from '@state/house/room';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  #store = inject(Store);

  createHouse(name: string): Observable<House> {
    return of({
      id: crypto.randomUUID(),
      name,
    }).pipe(tap((mo) => this.#store.dispatch(actionsHouse.init(mo))));
  }

  getHouse(id: string): Observable<House> {
    return of({
      id: crypto.randomUUID(),
      name: `House ${id}`,
    }).pipe(tap((house) => this.#store.dispatch(actionsHouse.init(house))));
  }

  getPeople(id: string): Observable<Person[]> {
    return of([
      { id: 'b3bfe33f-775b-4ac4-a144-b61aad48cf9d', firstName: 'a', lastName: 'd' },
      { id: '957a081a-4bf2-43f7-af0f-925f6dbbc752', firstName: 'b', lastName: 'c' },
    ]).pipe(tap((people) => this.#store.dispatch(actionsPerson.init({ people }))));
  }

  getRooms(id: string): Observable<Room[]> {
    return of([
      { id: 'e49f6093-d597-4fb9-a10d-ae4de58993dd', name: 'ab', designation: 'de', people: [] },
      {
        id: 'd9cecf49-6add-43d4-9588-86abbbde4116',
        name: 'bc',
        designation: 'cd',
        people: [{ id: '957a081a-4bf2-43f7-af0f-925f6dbbc752', firstName: 'a', lastName: 'b' }],
      },
    ]).pipe(tap((rooms) => this.#store.dispatch(actionsRoom.init({ rooms }))));
  }
}
