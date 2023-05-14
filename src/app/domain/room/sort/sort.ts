import { Signal, computed, signal } from '@angular/core';

export type RoomSortType = {
  attribute?: 'name' | 'designation';
  hasPeople?: boolean;
};

export type RoomSortOptions = {
  attribute?: 'name' | 'designation';
  hasPeople?: boolean;
};

export class RoomSort {
  readonly attribute = signal<'name' | 'designation' | undefined>(undefined);
  readonly hasPeople = signal<boolean | undefined>(undefined);

  value: Signal<RoomSortType> = computed(() => {
    return { property: this.attribute(), hasPeople: this.hasPeople() };
  });

  constructor(options?: RoomSortOptions) {
    this.attribute.set(options?.attribute);
    this.hasPeople.set(options?.hasPeople);
  }
}
