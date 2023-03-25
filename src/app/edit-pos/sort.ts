import { BehaviorSubject, Observable, combineLatest, filter, map } from 'rxjs';

export type SortType = {
  property: 'name' | 'description';
};

export class SortClass {
  #property$ = new BehaviorSubject<'name' | 'description' | undefined>(undefined);

  $: Observable<SortType> = combineLatest([this.#property$.pipe(filter(Boolean))]).pipe(
    map(([property]) => ({ property }))
  );

  constructor(property: 'name' | 'description' = 'name') {
    this.setProperty(property);
  }

  getProperty() {
    return this.#property$.getValue() as string;
  }
  setProperty(value: 'name' | 'description') {
    this.#property$.next(value);
  }
}
