export function updateItem<T extends { id: string }>(items: T[], update: T): T[] {
  return items.map((item) => {
    if (item.id !== update.id) {
      return { ...item };
    }

    return {
      ...item,
      ...update,
    };
  });
}

export function insertItem<T>(items: T[], item: T): T[] {
  return [...items, item];
}

export function removeItem<T extends { id: string }>(items: T[], id: string): T[] {
  return items.filter((item) => item.id !== id);
}
