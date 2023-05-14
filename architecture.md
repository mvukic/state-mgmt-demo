# Component architecture

```typescript
import { filterData } './filter';
import { sortData } './sort';

@Component({
  selector: 'app-cmp',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ `...` ],
  styles: [`...`],
  template: ` ... `
})
export class Component {
  // Inject store
  #store = inject(Store);

  // Select a slice of the store
  #data = this.#store.selectSignal(selectX);

  // Holds filter properties
  filter = new DataFilter({ ... });
  // Holds sort properties
  sort = new DataSort({ ... });

  // Build view model for the component by computing it if:
  // - initial data changes
  // - filter properties change
  // - sort properties change
  vm = computed(() => {
    const data = this.#data();
    const filtered = filterData(data, this.filter.value());
    const sorted = sortData(filtered, this.sort.value());
    return buildViewModel(sorted);
  });

  ... other methods ...
}

function buildViewModel<T>(items: T[]): T[] {
  return ...;
}
```

```typescript
// filter.ts
export type DataFilterType = {
  query?: string;
  logic: boolean;
};

export type DataFilterOptions = {
  query?: string;
  logic?: boolean;
};

export class DataFilter {
  readonly query = signal<string | undefined>(undefined);
  readonly logic = signal<boolean>(true);

  value: Signal<DataFilterType> = computed(() => {
    return { query: this.query(), logic: this.logic() };
  });

  constructor(options?: DataFilterOptions) {
    this.query.set(options?.query);
    if (options?.logic !== undefined) {
      this.logic.set(options.logic);
    }
  }
}

```

```typescript
// filter.fns.ts
function filterByQuery(items: Data[], query: string) {
  if (query.length === 0) {
    return items;
  }
  return items.filter((item) => isFilteredByQuery(item, query));
}

function isFilteredByQuery(item: Data, query?: string): boolean {
  if (query === undefined || query.trim().length === 0) {
    return true;
  }
  return item.firstName.indexOf(query) > -1 || item.lastName.indexOf(query) > -1;
}

// main filter function
function filter(items: Data[], options: DataFilterOptions): Data[] {
  const { logic, ...filters } = options;

  // If no filters are defined the just return the items
  if (Object.values(filters).every((v) => v === undefined)) {
    return items;
  }

  const { query } = filters;
  const and = () => {
    let filtered = items;
    if (query != undefined) {
      filtered = filterData.filterByQuery(filtered, query);
    }
    return filtered;
  };
  const or = () => {
    return items.filter((item) => {
      let flag = false;
      if (query != undefined) {
        flag ||= filterData.isFilteredByQuery(item, query);
      }
      return flag;
    });
  };

  return logic ? and() : or();
}

export const filterDataFns = {
  filterByQuery,
  isFilteredByQuery,
  filter
};
```

```typescript
// File: sort.ts
export type DataSortType = {
  attribute?: 'attr1' | 'attr2';
};

export type DataSortOptions = {
  attribute?: 'attr1' | 'attr2';
};

export class DataSort {
  readonly attribute = signal<'attr1' | 'attr2' | undefined>(undefined);

  value: Signal<DataSortType> = computed(() => {
    return { property: this.attribute() };
  });

  constructor(options?: DataSortOptions) {
    this.attribute.set(options?.attribute);
  }
}
```

```typescript
// File: sort.fns.ts
function compareByAttribute(a: Data, b: Data, attribute: 'attr1' | 'attr2'): number {
  return a[attribute].localeCompare(b[attribute]);
}

function sortByAttribute(items: Data[], attribute: 'attr1' | 'attr2'): Data[] {
  return items.slice().sort((a, b) => compareByAttribute(a, b, attribute));
}

// main sorting function
function sort(items: Data[], options: DataSortOptions): Data[] {
  const { attribute } = options;
  return items.slice().sort((a, b) => {
    let sortResult = 1;
    if (attribute !== undefined) {
      sortResult ||= sortDataFns.compareByAttribute(a, b, attribute);
    }

    return sortResult;
  });
}

export const sortDataFns = {
  sortByAttribute,
  compareByAttribute,
  sort
};



```