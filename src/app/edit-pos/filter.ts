import { Person } from '../model/models';
import { filterPerson } from '../common/person';
import { Signal, computed, signal } from '@angular/core';

export type PersonFilterType = {
  query?: string;
  logic: boolean;
};

export type PersonFilterOptions = {
  query?: string;
  logic?: boolean;
};

export class PersonFilter {
  readonly query = signal<string | undefined>(undefined);
  readonly logic = signal<boolean>(true);

  value: Signal<PersonFilterType> = computed(() => {
    return { query: this.query(), logic: this.logic() };
  });

  constructor(options?: PersonFilterOptions) {
    this.query.set(options?.query);
    if (options?.logic !== undefined) {
      this.logic.set(options.logic);
    }
  }
}

export function filterPeople(people: Person[], options: PersonFilterOptions): Person[] {
  const { logic, ...filters } = options;

  // If no filters are defined the just return the items
  if (Object.values(filters).every((v) => v === undefined)) {
    return people;
  }

  const { query } = filters;
  const and = () => {
    let filtered = people;
    if (query != undefined) {
      filtered = filterPerson.filterByQuery(filtered, query);
    }
    return filtered;
  };
  const or = () => {
    return people.filter((item) => {
      let flag = false;
      if (query != undefined) {
        flag ||= filterPerson.isFilteredByQuery(item, query);
      }
      return flag;
    });
  };

  return logic ? and() : or();
}
