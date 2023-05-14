import { Person } from '@domain/person/model';
import { PersonFilterOptions } from './filter';

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

function filter(items: Person[], options: PersonFilterOptions): Person[] {
  const { logic, ...filters } = options;

  // If no filters are defined the just return the items
  if (Object.values(filters).every((v) => v === undefined)) {
    return items;
  }

  const { query } = filters;
  const and = () => {
    let filtered = items;
    if (query != undefined) {
      filtered = filterPersonFns.filterByQuery(filtered, query);
    }
    return filtered;
  };
  const or = () => {
    return items.filter((item) => {
      let flag = false;
      if (query != undefined) {
        flag ||= filterPersonFns.isFilteredByQuery(item, query);
      }
      return flag;
    });
  };

  return logic ? and() : or();
}

export const filterPersonFns = {
  filterByQuery,
  isFilteredByQuery,
  filter,
};
