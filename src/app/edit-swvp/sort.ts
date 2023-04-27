import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { SWVP } from '../model/models';
import { sortSWVP } from '../common/swvp';

export type SwvpSortType = {
  property?: 'name' | 'designation';
  hasPOs?: boolean;
};

export type SwvpSortOptions = {
  property?: 'name' | 'designation';
  hasPOs?: boolean;
};

export class SwvpSort {
  #property$ = new BehaviorSubject<'name' | 'designation' | undefined>(undefined);
  #hasPOs$ = new BehaviorSubject<boolean | undefined>(undefined);

  $: Observable<SwvpSortType> = combineLatest([this.#property$, this.#hasPOs$]).pipe(
    map(([property, hasPOs]) => ({ property, hasPOs }))
  );

  constructor(options?: SwvpSortOptions) {
    this.setProperty(options?.property);
    this.setHasPOs(options?.hasPOs);
  }

  getProperty() {
    return this.#property$.getValue();
  }
  setProperty(value?: 'name' | 'designation') {
    this.#property$.next(value);
  }
  resetProperty() {
    this.#property$.next(undefined);
  }

  getHasPOs() {
    return this.#hasPOs$.getValue();
  }
  setHasPOs(value?: boolean) {
    this.#hasPOs$.next(value);
  }
  resetHasPOs() {
    this.#hasPOs$.next(undefined);
  }
}

export function sortSwvps(items: SWVP[], options: SwvpSortOptions): SWVP[] {
  const { property, hasPOs } = options;
  return items.slice().sort((a, b) => {
    let sortResult = 1;
    if (property !== undefined) {
      sortResult ||= sortSWVP.compareByProperty(a, b, property);
    }
    if (hasPOs !== undefined) {
      sortResult ||= sortSWVP.compareByHasPos(a, b);
    }

    return sortResult;
  });
}
