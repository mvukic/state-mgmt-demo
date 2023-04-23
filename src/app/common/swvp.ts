import { SWVP } from '../model/models';

function filterByQuery(items: SWVP[], query?: string): SWVP[] {
  if (query === undefined || query.length === 0) {
    return items;
  }
  return items.filter((item) => item.name.includes(query) || item.name.includes(query));
}

function filterByHasPos(items: SWVP[], hasPos?: string): SWVP[] {
  if (hasPos === undefined) {
    return items;
  }
  return items.filter((item) => item.pos.length > 0);
}

export const filterSWVP = {
  filterByQuery,
  filterByHasPos,
};

function sortByProperty(swvps: SWVP[], property: 'name' | 'designation'): SWVP[] {
  return swvps.slice().sort((a, b) => a[property].localeCompare(b[property]));
}

function sortByHasPos(swvps: SWVP[], hasPos: boolean | undefined): SWVP[] {
  if (hasPos === undefined) {
    return swvps;
  }
  return swvps.slice().sort((a, b) => b.pos.length - a.pos.length);
}

export const sortSWVP = {
  sortByProperty,
  sortByHasPos,
};
