import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

export type SortType = {
  property: 'name' | 'description';
};

export class SortClass {
  #property$ = new BehaviorSubject<'name' | 'description'>('name');

  $: Observable<SortType> = combineLatest([this.#property$]).pipe(map(([property]) => ({ property })));

  constructor(property: 'name' | 'description' = 'name') {
    this.setProperty(property);
  }

  getProperty() {
    return this.#property$.getValue();
  }
  setProperty(value: 'name' | 'description') {
    this.#property$.next(value);
  }
}
