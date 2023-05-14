import { Signal, computed, signal } from '@angular/core';

export type PersonSortType = {
  attribute?: 'firstName' | 'lastName';
};

export type PersonSortOptions = {
  attribute?: 'firstName' | 'lastName';
};

export class PersonSort {
  readonly attribute = signal<'firstName' | 'lastName' | undefined>(undefined);

  value: Signal<PersonSortType> = computed(() => {
    return { property: this.attribute() };
  });

  constructor(options?: PersonSortOptions) {
    this.attribute.set(options?.attribute);
  }
}
