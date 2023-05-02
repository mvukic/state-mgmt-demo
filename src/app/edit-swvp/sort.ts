import { SWVP } from '../model/models';
import { sortSWVP } from '../common/swvp';
import { Signal, computed, signal } from '@angular/core';

export type SwvpSortType = {
  property?: 'name' | 'designation';
  hasPOs?: boolean;
};

export type SwvpSortOptions = {
  property?: 'name' | 'designation';
  hasPOs?: boolean;
};

export class SwvpSort {
  readonly property = signal<'name' | 'designation' | undefined>(undefined);
  readonly hasPOs = signal<boolean | undefined>(undefined);

  value: Signal<SwvpSortType> = computed(() => {
    return { property: this.property(), hasPOs: this.hasPOs() };
  });

  constructor(options?: SwvpSortOptions) {
    this.property.set(options?.property);
    this.hasPOs.set(options?.hasPOs);
  }
}

export function sortSwvps(items: SWVP[], options: SwvpSortOptions): SWVP[] {
  const { property, hasPOs } = options;
  return items.slice().sort((a, b) => {
    let sortResult = 1;
    if (property !== undefined) {
      sortResult ||= sortSWVP.compareByProperty(a, b, property);
    }
    if (hasPOs !== undefined) {
      sortResult ||= sortSWVP.compareByHasPos(a, b);
    }

    return sortResult;
  });
}
