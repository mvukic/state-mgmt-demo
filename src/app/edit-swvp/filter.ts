import { BehaviorSubject, Observable, combineLatest, filter, map } from 'rxjs';

export type SwvpFilterType = {
  query?: string;
  hasPOs?: boolean;
};

export type SwvpFilterOptions = {
  query?: string;
  hasPOs?: boolean;
};

export class SwvpFilter {
  #query$ = new BehaviorSubject<string | undefined>(undefined);
  #hasPOs$ = new BehaviorSubject<boolean | undefined>(undefined);

  $: Observable<SwvpFilterType> = combineLatest([
    this.#query$.pipe(filter(Boolean)),
    this.#hasPOs$.pipe(filter(Boolean)),
  ]).pipe(map(([query, hasPOs]) => ({ query, hasPOs })));

  constructor(options?: SwvpFilterOptions) {
    this.setQuery(options?.query);
    this.setHasPOs(options?.hasPOs);
  }

  getQuery() {
    return this.#query$.getValue() as string;
  }
  setQuery(value: string | undefined) {
    this.#query$.next(value);
  }
  resetQuery() {
    this.#query$.next('');
  }

  getHasPOs() {
    return this.#hasPOs$.getValue() as boolean;
  }
  setHasPOs(value: boolean | undefined) {
    this.#hasPOs$.next(value);
  }
  resetHasPOs() {
    this.#hasPOs$.next(false);
  }
}
