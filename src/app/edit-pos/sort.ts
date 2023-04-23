import { BehaviorSubject, Observable, combineLatest, filter, map } from 'rxjs';

export type PoSortType = {
  property: 'name' | 'description';
};

export type PoSortOptions = {
  property: 'name' | 'description';
};

export class PoSort {
  #property$ = new BehaviorSubject<'name' | 'description' | undefined>(undefined);

  $: Observable<PoSortType> = combineLatest([this.#property$.pipe(filter(Boolean))]).pipe(
    map(([property]) => ({ property }))
  );

  constructor(options: PoSortOptions) {
    this.setProperty(options.property);
  }

  getProperty() {
    return this.#property$.getValue() as string;
  }
  setProperty(value: 'name' | 'description') {
    this.#property$.next(value);
  }
}
