const isString = (value): value is string => {
  return typeof value === 'string';
};

type ISorter<T> = {
  orderBy: keyof T;
  order: Order;
};

export const genericSortArray = <T>(array: T[], sorter: ISorter<T>) => {
  return array.sort((a, b) => genericSort(a, b, sorter));
};

export const genericSort = <T>(a: T, b: T, sorter: ISorter<T>) => {
  const result = () => {
    let x: string;
    let y: string;
    if (isString(a[sorter.orderBy])) {
      x = a[sorter.orderBy] as unknown as string;
      x = x.toLowerCase();
    }
    if (isString(b[sorter.orderBy])) {
      y = b[sorter.orderBy] as unknown as string;
      y = y.toLowerCase();
    }
    if (x && y) {
      if (x > y) return 1;
      if (x < y) return -1;
      return 0;
    }
    if (a[sorter.orderBy] > b[sorter.orderBy]) return 1;
    if (a[sorter.orderBy] < b[sorter.orderBy]) return -1;
    return 0;
  };

  return sorter.order === 'desc' ? result() * -1 : result();
};

export type Order = 'asc' | 'desc';
