import { sortPerson } from '../common/person';
import { Person } from '../model/models';
import { Signal, computed, signal } from '@angular/core';

export type PersonSortType = {
  attribute?: 'firstName' | 'lastName';
};

export type PoSortOptions = {
  attribute?: 'firstName' | 'lastName';
};

export class PersonSort {
  readonly attribute = signal<'firstName' | 'lastName' | undefined>(undefined);

  value: Signal<PersonSortType> = computed(() => {
    return { property: this.attribute() };
  });

  constructor(options?: PoSortOptions) {
    this.attribute.set(options?.attribute);
  }
}

export function sortPeople(people: Person[], options: PoSortOptions): Person[] {
  const { attribute } = options;
  return people.slice().sort((a, b) => {
    let sortResult = 1;
    if (attribute !== undefined) {
      sortResult ||= sortPerson.compareByAttribute(a, b, attribute);
    }

    return sortResult;
  });
}
