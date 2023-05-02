import { SWVP } from '../model/models';

function filterByQuery(items: SWVP[], query?: string): SWVP[] {
  if (query === undefined || query.trim().length === 0) {
    return items;
  }
  return items.filter((item) => isFilteredByQuery(item, query));
}

function isFilteredByQuery(item: SWVP, query?: string): boolean {
  if (query === undefined || query.trim().length === 0) {
    return true;
  }
  return item.name.indexOf(query) > -1 || item.name.indexOf(query) > -1;
}

function filterByHasPos(items: SWVP[], hasPos?: boolean): SWVP[] {
  if (hasPos === undefined) {
    return items;
  }
  return items.filter((item) => isFilteredByHasPos(item, hasPos));
}

function isFilteredByHasPos(item: SWVP, hasPos?: boolean): boolean {
  if (hasPos === undefined) {
    return true;
  }
  return item.pos.length > 0;
}

export const filterSWVP = {
  filterByQuery,
  isFilteredByQuery,
  filterByHasPos,
  isFilteredByHasPos,
};

function compareByProperty(a: SWVP, b: SWVP, property: 'name' | 'designation'): number {
  return a[property].localeCompare(b[property]);
}

function sortByProperty(swvps: SWVP[], property: 'name' | 'designation'): SWVP[] {
  return swvps.slice().sort((a, b) => compareByProperty(a, b, property));
}

function compareByHasPos(a: SWVP, b: SWVP): number {
  return b.pos.length - a.pos.length;
}

function sortByHasPos(swvps: SWVP[], hasPos: boolean | undefined): SWVP[] {
  if (hasPos === undefined) {
    return swvps;
  }
  return swvps.slice().sort((a, b) => compareByHasPos(a, b));
}

export const sortSWVP = {
  sortByProperty,
  compareByProperty,
  sortByHasPos,
  compareByHasPos,
};
