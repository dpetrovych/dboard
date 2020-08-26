import ElectronStore = require('electron-store');
import { Duration } from 'luxon';

import {
  getCurrentWeather as getWBCurrentWeather,
  CurrentWeather as WBCurrentWeather,
} from '../services/weatherbit';
import { getPublicIPData } from '../services/ipapi';

type WeatherCondition = {
  code: number;
  partOfDay: 'd' | 'n';
};

type DayInfo = {
  sunrise: string;
  sunset: string;
};

type Weather = {
  timestamp: number;
  temperature: number;
  condition: WeatherCondition;
  day: DayInfo;
};

type WeatherDataCache = {
  timestamp: number;
  ip: string;
  data: Weather;
};

function mapWBWeather(weather: WBCurrentWeather): Weather {
  function timeFromUtcTime(utcTime: string): string {
    const parts = /(\d{2}):(\d{2})/g.exec(utcTime);
    return Duration.fromObject({
      hours: parseInt(parts[0], 10),
      minutes: parseInt(parts[1], 10),
    })
      .minus({ minutes: new Date().getTimezoneOffset() })
      .toFormat('HH:mm');
  }

  return {
    timestamp: weather.ts,
    temperature: weather.temp,
    condition: {
      code: parseInt(weather.weather.code, 10),
      partOfDay: weather.pod,
    },
    day: {
      sunrise: timeFromUtcTime(weather.sunrise),
      sunset: timeFromUtcTime(weather.sunset),
    },
  };
}

function getConditionClass(condition: WeatherCondition): string {
  return 'wi-day-sunny';
}

async function getWeather(
  updatePeriodMs: number,
  force: boolean
): Promise<Weather> {
  const cacheStore = new ElectronStore<WeatherDataCache | undefined>({
    name: 'cache',
  });

  const cache = cacheStore.store;
  const timestamp = new Date().getTime();
  const ipData = await getPublicIPData();

  if (
    !force &&
    (timestamp - cache?.timestamp ?? 0) < updatePeriodMs &&
    ipData.ip === cache?.ip
  ) {
    console.log('weather from cache', cache.data);
    return cache.data;
  }

  const weatherBitCurrent = await getWBCurrentWeather(ipData);
  const weather = mapWBWeather(weatherBitCurrent);

  cacheStore.store = { timestamp, ip: ipData.ip, data: weather };
  return weather;
}

export async function updateWeather(
  container: Element,
  updatePeriodMs: number,
  force: boolean = false
): Promise<void> {
  container.textContent = '';

  const weather = await getWeather(updatePeriodMs, force);

  const temperatureElement = document.createElement('div');
  temperatureElement.classList.add('weather-temperature', 'fade-in');
  temperatureElement.textContent = `${Math.round(weather.temperature)}°`;

  const conditionElement = document.createElement('div');
  conditionElement.classList.add(
    'weather-condition',
    'fade-in',
    'wi',
    getConditionClass(weather.condition)
  );

  container.appendChild(temperatureElement);
  container.appendChild(conditionElement);
}
