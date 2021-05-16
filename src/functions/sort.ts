/**
 * Sorts provided items and returns a new array
 * @param items array of items to sort
 * @param prop property to sort the items by
 */
export const sortItems = <T, P extends keyof T>(items: T[], prop: P): T[] => {
  try {
    return items.sort(comparer(prop));
  } catch {
    return items;
  }
};

/**
 * Sorts provided items and returns a new array
 * @param items array of items to sort
 * @param prop property to sort the items by
 */
export const sortItemsReverse = <T, P extends keyof T>(
  items: T[],
  prop: P
): T[] => {
  try {
    return items.sort(comparerReverse(prop));
  } catch {
    return items;
  }
};

const comparer = <T, P extends keyof T>(prop: P) => {
  return (a: T, b: T): number => {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
};
const comparerReverse = <T, P extends keyof T>(prop: P) => {
  return (a: T, b: T): number => {
    if (a[prop] < b[prop]) {
      return 1;
    } else if (a[prop] > b[prop]) {
      return -1;
    }
    return 0;
  };
};

export function descendingComparator<T>(
  a: T,
  b: T,
  orderBy: keyof T
): 0 | -1 | 1 {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = 'asc' | 'desc';

export function stableSort<T>(
  array: T[],
  comparator: (a: T, b: T) => number
): T[] {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
