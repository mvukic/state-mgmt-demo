import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { SWVP } from '../model/models';
import { filterSWVP } from '../common/swvp';

export type SwvpFilterType = {
  query?: string;
  hasPOs?: boolean;
  logic: boolean;
};

export type SwvpFilterOptions = {
  query?: string;
  hasPOs?: boolean;
  logic?: boolean;
};

export class SwvpFilter {
  #query$ = new BehaviorSubject<string | undefined>(undefined);
  #hasPOs$ = new BehaviorSubject<boolean | undefined>(undefined);
  #logic$ = new BehaviorSubject<boolean>(false);

  $: Observable<SwvpFilterType> = combineLatest([this.#query$, this.#hasPOs$, this.#logic$]).pipe(
    map(([query, hasPOs, logic]) => ({ query, hasPOs, logic }))
  );

  constructor(options?: SwvpFilterOptions) {
    this.setQuery(options?.query);
    this.setHasPOs(options?.hasPOs);
    if (options?.logic !== undefined) {
      this.setLogic(options.logic);
    }
  }

  getQuery() {
    return this.#query$.getValue();
  }
  setQuery(value: string | undefined) {
    this.#query$.next(value);
  }
  resetQuery() {
    this.#query$.next(undefined);
  }

  getHasPOs() {
    return this.#hasPOs$.getValue();
  }
  setHasPOs(value: boolean | undefined) {
    this.#hasPOs$.next(value);
  }
  resetHasPOs() {
    this.#hasPOs$.next(undefined);
  }

  getLogic() {
    return this.#logic$.getValue();
  }
  setLogic(value: boolean) {
    this.#logic$.next(value);
  }
  resetLogic() {
    this.#logic$.next(false);
  }
}

export function filterSwvps(items: SWVP[], options: SwvpFilterType): SWVP[] {
  const { query, hasPOs, logic } = options;

  // Do and logic between all filter functions
  if (logic) {
    let filtered = items;
    if (query != undefined) {
      filtered = filterSWVP.filterByQuery(filtered, query);
    }
    if (hasPOs != undefined) {
      filtered = filterSWVP.filterByHasPos(filtered, hasPOs);
    }
    return filtered;
  }
  // Do or logic between all filter functions
  return items.filter((item) => {
    if (query != undefined) {
      if (filterSWVP.isFilteredByQuery(item, query)) {
        return true;
      }
    }
    if (hasPOs != undefined) {
      if (filterSWVP.isFilteredByHasPos(item, hasPOs)) {
        return true;
      }
    }
    return false;
  });
}
