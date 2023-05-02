import { sortPO } from '../common/po';
import { PO } from '../model/models';
import { Signal, computed, signal } from '@angular/core';

export type PoSortType = {
  property?: 'name' | 'designation';
};

export type PoSortOptions = {
  property?: 'name' | 'designation';
};

export class PoSort {
  readonly property = signal<'name' | 'designation' | undefined>(undefined);

  value: Signal<PoSortType> = computed(() => {
    return { property: this.property() };
  });

  constructor(options?: PoSortOptions) {
    this.property.set(options?.property);
  }
}

export function sortPos(items: PO[], options: PoSortOptions): PO[] {
  const { property } = options;
  return items.slice().sort((a, b) => {
    let sortResult = 1;
    if (property !== undefined) {
      sortResult ||= sortPO.compareByProperty(a, b, property);
    }

    return sortResult;
  });
}
