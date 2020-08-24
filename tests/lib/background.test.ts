import { getCategories } from '../../src/lib/background';

describe('getCategories', () => {
  it.each`
    date                     | result
    ${'2020-01-01T00:00:00'} | ${['wallpaper', 'stars', 'night']}
    ${'2020-01-01T06:00:00'} | ${['wallpaper', 'sunrise']}
    ${'2020-01-01T08:00:00'} | ${['wallpaper', 'nature', 'morning']}
    ${'2020-01-01T12:00:00'} | ${['wallpaper', 'nature', 'day']}
    ${'2020-01-01T20:00:00'} | ${['wallpaper', 'sunset']}
    ${'2020-01-01T22:00:00'} | ${['wallpaper', 'city', 'night']}
  `('returns $result at $date', ({ date, result }) => {
    expect(getCategories(new Date(date))).toEqual(result);
  });
});
