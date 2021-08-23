export const genericSearchArray = <T>(objects: T[], query: string) => {
  let props: Array<keyof T> = [];

  for (const obj of objects) {
    const propArray = Object.keys(obj) as Array<keyof T>;
    for (const p of propArray) {
      if (!props.includes(p)) props = [...props, p];
    }
  }

  return objects.filter((x) => genericSearch(x, props, query));
};

export const genericSearch = <T>(
  object: T,
  properties: Array<keyof T>,
  query: string
): boolean => {
  if (query === '') return true;

  return properties.some((property) => {
    const value = object[property] ?? '';
    if (typeof value === 'string' || typeof value === 'number')
      return value.toString().toLowerCase().includes(query.toLowerCase());
    return false;
  });
};
