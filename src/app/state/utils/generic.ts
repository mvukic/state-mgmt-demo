import { WithId } from '@domain/generic/model';

export function updateItem<T extends WithId>(items: T[], update: T): T[] {
  return items.map((item) => {
    if (item.id !== update.id) {
      return item;
    }

    return {
      ...item,
      ...update,
    };
  });
}

export function insertItem<T extends WithId>(items: T[], item: T): T[] {
  return hasItem(items, item) ? items : [...items, item];
}

export function hasItem<T extends WithId>(items: T[], item: T): boolean {
  const ids = new Set(items.map((it) => it.id));
  return ids.has(item.id);
}

export function removeItem<T extends WithId>(items: T[], id: string): T[] {
  return items.filter((item) => item.id !== id);
}
