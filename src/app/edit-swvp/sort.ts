import { BehaviorSubject, Observable, combineLatest, filter, map } from 'rxjs';

export type SwvpSortType = {
  property: 'name' | 'designation';
  hasPOs?: boolean;
};

export type SwvpSortOptions = {
  property: 'name' | 'designation';
  hasPOs?: boolean;
};

export class SwvpSort {
  #property$ = new BehaviorSubject<'name' | 'designation' | undefined>(undefined);
  #hasPOs$ = new BehaviorSubject<boolean | undefined>(undefined);

  $: Observable<SwvpSortType> = combineLatest([
    this.#property$.pipe(filter(Boolean)),
    this.#hasPOs$.pipe(filter(Boolean)),
  ]).pipe(map(([property, hasPOs]) => ({ property, hasPOs })));

  constructor(options: SwvpSortOptions) {
    this.setProperty(options.property);
    this.setHasPOs(options.hasPOs);
  }

  getProperty() {
    return this.#property$.getValue() as string;
  }
  setProperty(value: 'name' | 'designation') {
    this.#property$.next(value);
  }

  getHasPOs() {
    return this.#hasPOs$.getValue() as boolean;
  }
  setHasPOs(value: boolean | undefined) {
    this.#hasPOs$.next(value);
  }
}
