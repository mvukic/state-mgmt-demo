import { BehaviorSubject, Observable, combineLatest, filter, map } from 'rxjs';

export type SortType = {
  property: 'name' | 'designation';
};

export class SortClass {
  #property$ = new BehaviorSubject<'name' | 'designation' | undefined>(undefined);

  $: Observable<SortType> = combineLatest([this.#property$.pipe(filter(Boolean))]).pipe(
    map(([property]) => ({ property }))
  );

  constructor(property: 'name' | 'designation' = 'name') {
    this.setProperty(property);
  }

  getProperty() {
    return this.#property$.getValue() as string;
  }
  setProperty(value: 'name' | 'designation') {
    this.#property$.next(value);
  }
}
