import { Signal, computed, signal } from '@angular/core';

export type PersonFilterType = {
  query?: string;
  logic: boolean;
};

export type PersonFilterOptions = {
  query?: string;
  logic?: boolean;
};

export class PersonFilter {
  readonly query = signal<string | undefined>(undefined);
  readonly logic = signal<boolean>(true);

  value: Signal<PersonFilterType> = computed(() => {
    return { query: this.query(), logic: this.logic() };
  });

  constructor(options?: PersonFilterOptions) {
    this.query.set(options?.query);
    if (options?.logic !== undefined) {
      this.logic.set(options.logic);
    }
  }
}
