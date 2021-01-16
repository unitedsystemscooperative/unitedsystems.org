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
