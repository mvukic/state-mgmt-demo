import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';

export type PoFilterType = {
  query: string;
};

export type PoFilterOptions = {
  query: string;
};

export class PoFilter {
  #query$ = new BehaviorSubject<string | undefined>(undefined);

  $: Observable<PoFilterType> = combineLatest([this.#query$.pipe(filter(Boolean))]).pipe(map(([query]) => ({ query })));

  constructor(options: PoFilterOptions) {
    this.setQuery(options.query);
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
