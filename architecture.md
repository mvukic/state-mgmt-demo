# Component architecture

### Common component template

```typescript
@Component({
  selector: 'app-cmp',
  standalone: true,
  template: ` ... `,
  import: [ ... ]
})
export class Component {
  // Inject store provider
  #store = inject(Store);

  filter$ = new BehaviorSubject('');
  sort$ = new BehaviorSubject<'UP' | 'DOWN'>('UP');

  // Build view model for the component together with sort and filter
  vm$ = combineLatest([this.#store.select(selectDataElements), this.filter$, this.sort$]).pipe(
    map(([data, query, sort]) => prepareData(data, query, sort))
  );

}

// Main function to prepare the view model data
function prepareData<T>(data: T[], query: string, sort: 'UP' | 'DOWN') {
  return buildViewModel(sortData(filterData(data, query), sort));
}

// Build a view model with the given data
function buildViewModel(data: T[]): ViewModel {
  return ...;
}

// Filters data using the given query (no pipes involved)
function filterData<T>(data: T[], query: string): PO[] {
  return ...;
}

// Sort data using the given sort direction (no pipes involved)
function sortData(pos: PO[], sort: 'UP' | 'DOWN'): PO[] {
  return ...;
}

```

### View model types 1

Combines the data element with its form group.

```typescript
// A pair of date object and form
type ViewModelPair<T> = {
  data: T,
  form: FormGroup<...>
};

// Main view model object that contains all data required by the component or part of the component
type ViewModel = {
  pairs: ViewModelPair[];
};
```

### View model types 2

Simple view model with single data object.

```typescript
// Main view model object that contains all data required by the component or part of the component
type ViewModel<T> = {
  data: T;
};
```

### View model types 3

Simple view model with single form object.

```typescript
// Main view model object that contains all data required by the component or part of the component
type ViewModel<T> = {
  form: FormGroup<...>;
};
```
