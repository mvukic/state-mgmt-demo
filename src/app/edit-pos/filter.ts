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
    #logic$ = new BehaviorSubject<boolean>(true);

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
    const { logic, ...filters } = options;

    // If no filters are defined the just return the items
    if (Object.values(filters).every(v => v === undefined)) {
        return items;
    }

    const { query } = filters;
    const and = () => {
        let filtered = items;
        if (query != undefined) {
            filtered = filterPO.filterByQuery(filtered, query);
        }
        return filtered;
    }
    const or = () => {
        return items.filter((item) => {
            let flag = false;
            if (query != undefined) {
                flag ||= filterPO.isFilteredByQuery(item, query);
            }
            return flag;
        });
    };

    return logic ? and() : or();
}
