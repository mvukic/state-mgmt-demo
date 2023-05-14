import { Person } from '@domain/person/model';
import { PersonSortOptions } from './sort';

function compareByAttribute(a: Person, b: Person, attribute: 'firstName' | 'lastName'): number {
  return a[attribute].localeCompare(b[attribute]);
}

function sortByAttribute(items: Person[], attribute: 'firstName' | 'lastName'): Person[] {
  return items.slice().sort((a, b) => compareByAttribute(a, b, attribute));
}

function sort(items: Person[], options: PersonSortOptions): Person[] {
  const { attribute } = options;
  return items.slice().sort((a, b) => {
    let sortResult = 1;
    if (attribute !== undefined) {
      sortResult ||= sortPersonFns.compareByAttribute(a, b, attribute);
    }

    return sortResult;
  });
}

export const sortPersonFns = {
  sortByAttribute,
  compareByAttribute,
  sort,
};
