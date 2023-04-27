import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { PO } from '../model/models';
import { filterPO } from '../common/po';

export type PoFilterType = {
  query?: string;
  logic: boolean;
};

export type PoFilterOptions = {
  query?: string;
  logic?: boolean;
};

export class PoFilter {
  #query$ = new BehaviorSubject<string | undefined>(undefined);
  #logic$ = new BehaviorSubject<boolean>(false);

  $: Observable<PoFilterType> = combineLatest([this.#query$, this.#logic$]).pipe(
    map(([query, logic]) => ({ query, logic }))
  );

  constructor(options?: PoFilterOptions) {
    this.setQuery(options?.query);
    if (options?.logic !== undefined) {
      this.setLogic(options.logic);
    }
  }

  getQuery() {
    return this.#query$.getValue();
  }
  setQuery(value?: string) {
    this.#query$.next(value);
  }
  resetQuery() {
    this.#query$.next(undefined);
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

export function filterPos(items: PO[], options: PoFilterOptions): PO[] {
  const { query, logic } = options;

  // Do and logic between all filter functions
  if (logic) {
    let filtered = items;
    if (query != undefined) {
      filtered = filterPO.filterByQuery(filtered, query);
    }
    return filtered;
  }
  // Do or logic between all filter functions
  return items.filter((item) => {
    if (query != undefined) {
      if (filterPO.isFilteredByQuery(item, query)) {
        return true;
      }
    }
    return false;
  });
}
