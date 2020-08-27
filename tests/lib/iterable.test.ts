import { max, filter } from '../../src/lib/iterable';

function fromArray<T>(array: T[]): IterableIterator<T> {
  return array[Symbol.iterator]();
}

describe('max', () => {
  it('returns undefined for empty collection', () => {
    expect(max(fromArray<number>([]))).toBeUndefined();
  });

  it('returns max from array of 3 int', () => {
    expect(max(fromArray([30, 50, 40]))).toEqual(50);
  });
});

describe('filter', () => {
  it('returns empty from empty', () => {
    expect(Array.from(filter(fromArray<number>([]), () => true))).toEqual([]);
  });

  it('returns empty from all negative', () => {
    expect(Array.from(filter(fromArray([1, 2, 3]), () => false))).toEqual([]);
  });

  it('returns same from all positive', () => {
    expect(Array.from(filter(fromArray([1, 2, 3]), () => true))).toEqual([
      1,
      2,
      3,
    ]);
  });

  it('returns all even', () => {
    expect(
      Array.from(filter(fromArray([1, 2, 3]), (x) => x % 2 === 0))
    ).toEqual([2]);
  });
});
