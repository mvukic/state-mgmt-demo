import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';

export type FilterType = {
  query: string;
};

export class FilterClass {
  #query$ = new BehaviorSubject<string | undefined>(undefined);

  $: Observable<FilterType> = combineLatest([this.#query$.pipe(filter(Boolean))]).pipe(map(([query]) => ({ query })));

  constructor(query = '') {
    this.setQuery(query);
  }

  getQuery() {
    return this.#query$.getValue() as string;
  }
  setQuery(value: string) {
    this.#query$.next(value);
  }
  resetQuery() {
    this.#query$.next('');
  }
}
