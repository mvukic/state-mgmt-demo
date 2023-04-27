import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { sortPO } from '../common/po';
import { PO } from '../model/models';

export type PoSortType = {
  property?: 'name' | 'designation';
};

export type PoSortOptions = {
  property?: 'name' | 'designation';
};

export class PoSort {
  #property$ = new BehaviorSubject<'name' | 'designation' | undefined>(undefined);

  $: Observable<PoSortType> = combineLatest([this.#property$]).pipe(map(([property]) => ({ property })));

  constructor(options?: PoSortOptions) {
    this.setProperty(options?.property);
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
}

export function sortPos(items: PO[], options: PoSortOptions): PO[] {
  const { property } = options;
  return items.slice().sort((a, b) => {
    let sortResult = 1;
    if (property !== undefined) {
      sortResult ||= sortPO.compareByProperty(a, b, property);
    }

    return sortResult;
  });
}
