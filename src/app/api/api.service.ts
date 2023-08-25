import { Injectable } from '@angular/core';
import { House, HouseUpdate } from '@domain/house/model';
import { Person, PersonCreate, PersonUpdate } from '@domain/person/model';
import { Room, RoomCreate, RoomUpdate } from '@domain/room/model';
import { Observable, delay, of, throwError } from 'rxjs';

const houses = new Map<string, House>([
  ['076bd1e9-2b0a-4197-a295-ff0823770035', { id: '076bd1e9-2b0a-4197-a295-ff0823770035', name: 'test 1' }],
]);

@Injectable({ providedIn: 'root' })
export class ApiService {
  createHouse(name: string): Observable<House> {
    const id = crypto.randomUUID();
    const house: House = { id, name };
    houses.set(id, house);
    return of(house);
  }

  getHouse(id: string): Observable<House> {
    const house = houses.get(id);
    return house ? of(house) : throwError(() => 'House does not exist');
  }

  updateHouse(id: string, request: HouseUpdate): Observable<House> {
    return of({ id, ...request });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPeople(id: string): Observable<Person[]> {
    return of([
      { id: 'b3bfe33f-775b-4ac4-a144-b61aad48cf9d', firstName: 'a', lastName: 'd' },
      { id: '957a081a-4bf2-43f7-af0f-925f6dbbc752', firstName: 'b', lastName: 'c' },
    ]).pipe(delay(2000));
  }

  createPerson(request: PersonCreate): Observable<Person> {
    return of({ id: crypto.randomUUID(), ...request });
  }

  updatePerson(id: string, request: PersonUpdate): Observable<Person> {
    const even = Math.floor(Math.random() * 1000) % 2 === 0;
    return even ? of({ id, ...request }) : throwError(() => 'Update person error');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deletePerson(id: string) {
    return of({ id });
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

  createRoom(request: RoomCreate): Observable<Room> {
    return of({ id: crypto.randomUUID(), ...request, peopleIds: [] });
  }

  updateRoom(id: string, request: RoomUpdate): Observable<Room> {
    const even = Math.floor(Math.random() * 1000) % 2 === 0;
    return even ? of({ id, ...request, peopleIds: [] }) : throwError(() => 'Update room error');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteRoom(id: string) {
    return of({ id });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addPersonToRoom(roomId: string, personId: string) {
    return of({ roomId, personId });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removePersonFromRoom(roomId: string, personId: string) {
    const even = Math.floor(Math.random() * 1000) % 2 === 0;
    return even ? of({ roomId, personId }) : throwError(() => 'Remove person from room error');
  }
}
