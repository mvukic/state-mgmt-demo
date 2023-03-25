import { SWVP } from '../model/models';

function filterByQuery(items: SWVP[], query: string): SWVP[] {
  if (query.length === 0) {
    return items;
  }
  return items.filter((item) => item.name.includes(query) || item.name.includes(query));
}

export const filterSWVP = {
  filterByQuery,
};

function sortByProperty(swvps: SWVP[], property: 'name' | 'designation'): SWVP[] {
  return [...swvps].sort((a, b) => a[property].localeCompare(b[property]));
}

export const sortSWVP = {
  sortByProperty,
};
