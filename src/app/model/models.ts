export interface House {
  id: string;
  name: string;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Room {
  id: string;
  name: string;
  designation: string;
  people: Person[];
}
