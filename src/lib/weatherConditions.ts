import { max, filter } from './iterable';

export type WeatherCondition = {
  code: number;
  partOfDay: 'd' | 'n';
};

type ConditionCssClass = string | [string, string];

const NA_CLASS = 'wi-na';

const CONDITION_CLASSES = new Map<number, ConditionCssClass>(
  Object.entries({
    200: ['wi-day-thunderstorm', 'wi-night-alt-thunderstorm'],
    201: 'wi-thunderstorm',
    230: ['wi-day-storm-showers', 'wi-night-alt-storm-showers'],
    231: 'wi-storm-showers',
    233: 'wi-hail',
    300: ['wi-day-showers', 'wi-night-alt-showers'],
    301: 'wi-showers',
    500: ['wi-day-rain', 'wi-night-alt-rain'],
    501: 'wi-rain',
    502: 'wi-rain-wind',
    511: 'wi-rain-mix',
    520: ['wi-day-showers', 'wi-night-alt-showers'],
    521: 'wi-showers',
    600: ['wi-day-snow', 'wi-night-snow'],
    601: 'wi-snow',
    602: 'wi-snow-wind',
    610: ['wi-day-sleet', 'wi-night-alt-sleet'],
    611: 'wi-sleet',
    621: ['wi-day-snow', 'wi-night-snow'],
    622: 'wi-snow',
    623: 'wi-snow-wind',
    700: ['wi-day-fog', 'wi-night-fog'],
    711: 'wi-smoke',
    721: ['wi-day-haze', 'wi-night-fog'],
    731: 'wi-dust',
    741: 'wi-fog',
    800: ['wi-day-sunny', 'wi-night-clear'],
    801: ['wi-day-cloudy', 'wi-night-cloudy'],
    803: 'wi-cloud',
    804: 'wi-cloudy',
    900: 'tornado',
  }).map(([key, value]) => [parseInt(key, 10), value as ConditionCssClass])
);

function isVariable(cls: ConditionCssClass): cls is [string, string] {
  return Array.isArray(cls);
}

export function getConditionClass(condition: WeatherCondition): string {
  function nextBelow(): ConditionCssClass {
    const nextCode = max(
      filter(CONDITION_CLASSES.keys(), (code) => code < condition.code)
    );
    return nextCode ? CONDITION_CLASSES.get(nextCode) : NA_CLASS;
  }

  const cls = CONDITION_CLASSES.get(condition.code) || nextBelow();

  if (isVariable(cls)) {
    switch (condition.partOfDay) {
      case 'd':
        return cls[0];
      case 'n':
        return cls[1];
    }
  } else {
    return cls;
  }
}
