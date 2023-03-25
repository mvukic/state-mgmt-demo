import { BehaviorSubject, map, Observable } from 'rxjs';

export type FilterType = {
  query: string;
};

export class FilterClass {
  #query$ = new BehaviorSubject('');

  $: Observable<FilterType> = this.#query$.pipe(map((query) => ({ query })));

  constructor(query = '') {
    this.setQuery(query);
  }

  getQuery() {
    return this.#query$.getValue();
  }
  setQuery(value: string) {
    this.#query$.next(value);
  }
  resetQuery() {
    this.#query$.next('');
  }
}
