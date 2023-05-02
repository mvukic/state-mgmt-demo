import { PO } from '../model/models';
import { filterPO } from '../common/po';
import { Signal, computed, signal } from '@angular/core';

export type PoFilterType = {
  query?: string;
  logic: boolean;
};

export type PoFilterOptions = {
  query?: string;
  logic?: boolean;
};

export class PoFilter {
  readonly query = signal<string | undefined>(undefined);
  readonly logic = signal<boolean>(true);

  value: Signal<PoFilterType> = computed(() => {
    return { query: this.query(), logic: this.logic() };
  });

  constructor(options?: PoFilterOptions) {
    this.query.set(options?.query);
    if (options?.logic !== undefined) {
      this.logic.set(options.logic);
    }
  }
}

export function filterPos(items: PO[], options: PoFilterOptions): PO[] {
  const { logic, ...filters } = options;

  // If no filters are defined the just return the items
  if (Object.values(filters).every((v) => v === undefined)) {
    return items;
  }

  const { query } = filters;
  const and = () => {
    let filtered = items;
    if (query != undefined) {
      filtered = filterPO.filterByQuery(filtered, query);
    }
    return filtered;
  };
  const or = () => {
    return items.filter((item) => {
      let flag = false;
      if (query != undefined) {
        flag ||= filterPO.isFilteredByQuery(item, query);
      }
      return flag;
    });
  };

  return logic ? and() : or();
}
