export function* filter<T>(
  iterable: IterableIterator<T>,
  filterFun: (arg0: T) => boolean
): IterableIterator<T> {
  for (const item of iterable) {
    if (filterFun(item)) yield item;
  }
}

export function max(iterable: IterableIterator<number>): number | undefined {
  const first = iterable.next();
  if (first.done) return undefined;
  let maxValue = first.value;

  while (true) {
    const { value, done } = iterable.next();
    if (done) return maxValue;
    if (maxValue < value) maxValue = value;
  }
}
