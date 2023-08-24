import { Injectable } from '@angular/core';
import { House } from '@domain/house/model';
import { Person } from '@domain/person/model';
import { Room } from '@domain/room/model';
import { delay, Observable, of, throwError } from 'rxjs';

const houses = new Map<string, House>([
  ['076bd1e9-2b0a-4197-a295-ff0823770035', { id: '076bd1e9-2b0a-4197-a295-ff0823770035', name: 'test 1' }],
]);

@Injectable({ providedIn: 'root' })
export class ApiService {
  createHouse(name: string): Observable<{ id: string }> {
    const id = crypto.randomUUID();
    const house: House = { id, name };
    houses.set(id, house);
    return of({ id });
  }

  getHouse(id: string): Observable<House> {
    const house = houses.get(id);
    return house ? of(house) : throwError(() => 'House does not exist');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPeople(id: string): Observable<Person[]> {
    return of([
      { id: 'b3bfe33f-775b-4ac4-a144-b61aad48cf9d', firstName: 'a', lastName: 'd' },
      { id: '957a081a-4bf2-43f7-af0f-925f6dbbc752', firstName: 'b', lastName: 'c' },
    ]).pipe(delay(2000));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getRooms(id: string): Observable<Room[]> {
    return of([
      { id: 'e49f6093-d597-4fb9-a10d-ae4de58993dd', name: 'ab', designation: 'de', peopleIds: [] },
      {
        id: 'd9cecf49-6add-43d4-9588-86abbbde4116',
        name: 'bc',
        designation: 'cd',
        peopleIds: ['957a081a-4bf2-43f7-af0f-925f6dbbc752'],
      },
    ]);
  }
}
