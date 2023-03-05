# Component architecture

```typescript
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
  #items = this.#store.select(selectX);

  // Holds filter related data
  filter = getFilter();
  // Holds filter related data
  sort = getSort();

  // Build view model for the component together with sort and filter
  vm$ = combineLatest([this.#items, this.filter.$, this.sort.$]).pipe(
    map(([data, query, sort]) => prepareViewModel(data, query, sort))
  );

  ... lifecycle methods ...
  ... CRUD methods ...
  ... other methods ...
}

// Prepares the data
function prepareViewModel<T>(items: T[], filter: FilterType, sort: SortType) {
  const filtered = filterData(items, query);
  const sorted = sortData(filtered, sort);
  return buildViewModel(sorted);
}

// Builds view model
function buildViewModel<T>(items: T[]): ViewModel {
  return { ... };
}

// Filters items
function filterData<T>(items: T[], filter: FilterType): T[] {
  return { ... };
}

// Sorts items
function sortData<T>(items: T[], sort: SortType): T[] {
  return { ... };
}

// Creates an object with all filtering related data
function getFilter() {
  const query$ = new BehaviorSubject('');
  return {
    query$,
    /* Observes filtering properties */
    $: query$.pipe(map((query) => ({ query }))),
  };
}

// Creates an object with all sorting related data
function getSort() {
  const direction$ = new BehaviorSubject<'UP' | 'DOWN'>('UP');
  const property$ = new BehaviorSubject<'name' | 'description'>('name');
  return {
    direction$,
    property$,
    /* Observes sorting properties */
    $: combineLatest([direction$, property$]).pipe(
      map(([direction, property]) => ({ direction, property }))
    ),
  };
}

```
