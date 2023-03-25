import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

export type SortType = {
  property: 'name' | 'designation';
};

export class SortClass {
  #property$ = new BehaviorSubject<'name' | 'designation'>('name');

  $: Observable<SortType> = combineLatest([this.#property$]).pipe(map(([property]) => ({ property })));

  constructor(property: 'name' | 'designation' = 'name') {
    this.setProperty(property);
  }

  setProperty(value: 'name' | 'designation') {
    this.#property$.next(value);
  }
}
