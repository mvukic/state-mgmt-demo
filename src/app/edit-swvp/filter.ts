import { SWVP } from '../model/models';
import { filterSWVP } from '../common/swvp';
import { Signal, computed, signal } from '@angular/core';

export type SwvpFilterType = {
  query?: string;
  hasPOs?: boolean;
  logic: boolean;
};

export type SwvpFilterOptions = {
  query?: string;
  hasPOs?: boolean;
  logic?: boolean;
};

export class SwvpFilter {
  readonly query = signal<string | undefined>(undefined);
  readonly hasPOs = signal<boolean | undefined>(undefined);
  readonly logic = signal<boolean>(true);

  value: Signal<SwvpFilterType> = computed(() => {
    return { query: this.query(), hasPOs: this.hasPOs(), logic: this.logic() };
  });

  constructor(options?: SwvpFilterOptions) {
    this.query.set(options?.query);
    this.hasPOs.set(options?.hasPOs);
    if (options?.logic !== undefined) {
      this.logic.set(options.logic);
    }
  }
}

export function filterSwvps(items: SWVP[], options: SwvpFilterType): SWVP[] {

  const { logic, ...filters } = options;
  // If no filters are defined the just return the items
  if (Object.values(filters).every((v) => v === undefined)) {
    return items;
  }

  const { query, hasPOs } = filters;
  const and = () => {
    let filtered = items;
    if (query != undefined) {
      filtered = filterSWVP.filterByQuery(filtered, query);
    }
    if (hasPOs != undefined) {
      filtered = filterSWVP.filterByHasPos(filtered, hasPOs);
    }
    return filtered;
  };
  const or = () => {
    return items.filter((item) => {
      let flag = false;
      // TODO: this does not work
      if (query != undefined) {
        flag ||= filterSWVP.isFilteredByQuery(item, query);
      }
      if (hasPOs != undefined) {
        flag ||= filterSWVP.isFilteredByHasPos(item, hasPOs);
      }
      return flag;
    });
  };

  return logic ? and() : or();
}
