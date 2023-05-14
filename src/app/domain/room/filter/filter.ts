import { Signal, computed, signal } from '@angular/core';

export type RoomFilterType = {
  query?: string;
  hasPeople?: boolean;
  logic: boolean;
};

export type RoomFilterOptions = {
  query?: string;
  hasPeople?: boolean;
  logic?: boolean;
};

export class RoomsFilter {
  readonly query = signal<string | undefined>(undefined);
  readonly hasPeople = signal<boolean | undefined>(undefined);
  readonly logic = signal<boolean>(true);

  value: Signal<RoomFilterType> = computed(() => {
    return { query: this.query(), hasPeople: this.hasPeople(), logic: this.logic() };
  });

  constructor(options?: RoomFilterOptions) {
    this.query.set(options?.query);
    this.hasPeople.set(options?.hasPeople);
    if (options?.logic !== undefined) {
      this.logic.set(options.logic);
    }
  }
}
