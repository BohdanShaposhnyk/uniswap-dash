export type Operator<T> = (input: T[]) => T[];

export const pipe =
  <T>(...ops: Operator<T>[]) =>
  (data: T[]) =>
    ops.reduce((acc, op) => op(acc), data);

export const sortBy =
  <T>(key: keyof T, dir: 'asc' | 'desc' = 'asc'): Operator<T> =>
  (data) =>
    [...data].sort((a, b) =>
      dir === 'asc' ? Number(a[key]) - Number(b[key]) : Number(b[key]) - Number(a[key]),
    );
