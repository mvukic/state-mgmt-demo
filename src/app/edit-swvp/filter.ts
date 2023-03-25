import { BehaviorSubject, Observable, map } from 'rxjs';

export type FilterType = {
  query: string;
};

export class FilterClass {
  #query$ = new BehaviorSubject('');

  $: Observable<FilterType> = this.#query$.pipe(map((query) => ({ query })));

  setQuery(value: string) {
    this.#query$.next(value);
  }
}
