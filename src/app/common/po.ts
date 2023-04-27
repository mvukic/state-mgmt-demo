import { PO } from '../model/models';

function filterByQuery(items: PO[], query: string) {
  if (query.length === 0) {
    return items;
  }
  return items.filter((item) => isFilteredByQuery(item, query));
}

function isFilteredByQuery(item: PO, query?: string): boolean {
  if (query === undefined || query.length === 0) {
    return true;
  }
  return item.name.includes(query) || item.designation.includes(query);
}

export const filterPO = {
  filterByQuery,
  isFilteredByQuery,
};

function compareByProperty(a: PO, b: PO, property: 'name' | 'designation'): number {
  return a[property].localeCompare(b[property]);
}

function sortByProperty(items: PO[], property: 'name' | 'designation'): PO[] {
  return items.slice().sort((a, b) => compareByProperty(a, b, property));
}

export const sortPO = {
  sortByProperty,
  compareByProperty,
};
