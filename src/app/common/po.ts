import { PO } from '../model/models';

function filterByQuery(items: PO[], query: string) {
  if (query.length === 0) {
    return items;
  }
  return items.filter((item) => item.name.includes(query) || item.description.includes(query));
}

export const filterPO = {
  filterByQuery,
};

function sortByProperty(items: PO[], property: 'name' | 'description'): PO[] {
  return items.slice().sort((a, b) => a[property].localeCompare(b[property]));
}

export const sortPO = {
  sortByProperty,
};

//type KeysMatching<T, V> = {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T];
//type OnlyPrimitive<T> = KeysMatching<T, string | number>
