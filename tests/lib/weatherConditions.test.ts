import { getConditionClass } from '../../src/lib/weatherConditions';

describe('getConditionClass', () => {
  it.each`
    code   | cssClass
    ${500} | ${'wi-day-rain'}
    ${501} | ${'wi-rain'}
    ${600} | ${'wi-day-snow'}
    ${601} | ${'wi-snow'}
    ${800} | ${'wi-day-sunny'}
  `('returns $class for day code $day', ({ code, cssClass }) => {
    expect(getConditionClass({ code, partOfDay: 'd' })).toEqual(cssClass);
  });

  it.each`
    code   | cssClass
    ${500} | ${'wi-night-alt-rain'}
    ${501} | ${'wi-rain'}
    ${600} | ${'wi-night-snow'}
    ${601} | ${'wi-snow'}
    ${800} | ${'wi-night-clear'}
  `('returns $class for night code $day', ({ code, cssClass }) => {
    expect(getConditionClass({ code, partOfDay: 'n' })).toEqual(cssClass);
  });

  it.each`
    code   | cssClass
    ${503} | ${'wi-rain-wind'}
    ${612} | ${'wi-sleet'}
    ${722} | ${'wi-night-fog'}
  `('returns fallback $class for code $day', ({ code, cssClass }) => {
    expect(getConditionClass({ code, partOfDay: 'n' })).toEqual(cssClass);
  });
});
