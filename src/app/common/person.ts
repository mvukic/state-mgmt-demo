import { Person } from '../model/models';

function filterByQuery(items: Person[], query: string) {
  if (query.length === 0) {
    return items;
  }
  return items.filter((item) => isFilteredByQuery(item, query));
}

function isFilteredByQuery(item: Person, query?: string): boolean {
  if (query === undefined || query.trim().length === 0) {
    return true;
  }
  return item.firstName.indexOf(query) > -1 || item.lastName.indexOf(query) > -1;
}

export const filterPerson = {
  filterByQuery,
  isFilteredByQuery,
};

function compareByAttribute(a: Person, b: Person, attribute: 'firstName' | 'lastName'): number {
  return a[attribute].localeCompare(b[attribute]);
}

function sortByAttribute(items: Person[], attribute: 'firstName' | 'lastName'): Person[] {
  return items.slice().sort((a, b) => compareByAttribute(a, b, attribute));
}

export const sortPerson = {
  sortByAttribute,
  compareByAttribute,
};
