import ElectronStore = require('electron-store');
import { Duration } from 'luxon';

import {
  getCurrentWeather as getWBCurrentWeather,
  CurrentWeather as WBCurrentWeather,
} from '../services/weatherbit';
import { getPublicIPData, IPData } from '../lib/ip';
import { WeatherCondition } from './weatherConditions';
import { store } from '../store';

type DayInfo = {
  sunrise: string;
  sunset: string;
};

export interface Weather {
  timestamp?: number;
  temperature: number;
  condition: WeatherCondition;
  day?: DayInfo;
  region?: string;
}

export interface WeatherFrom extends Weather {
  source: 'CACHE' | 'WEATHER_BIT' | 'OPEN_WEATHER_MAP';
}

type WeatherDataCache = {
  timestamp: number;
  ip: string;
  data: Weather;
};

function mapWBWeather(weather: WBCurrentWeather, ipData: IPData): Weather {
  function timeFromUtcTime(utcTime: string): string {
    const parts = /(\d{2}):(\d{2})/g.exec(utcTime);
    return Duration.fromObject({
      hours: parseInt(parts[0], 10),
      minutes: parseInt(parts[1], 10),
    })
      .minus({ minutes: new Date().getTimezoneOffset() })
      .toFormat('hh:mm');
  }

  return {
    timestamp: weather.ts * 1000,
    temperature: weather.temp,
    condition: {
      code: parseInt(weather.weather.code, 10),
      partOfDay: weather.pod,
    },
    day: {
      sunrise: timeFromUtcTime(weather.sunrise),
      sunset: timeFromUtcTime(weather.sunset),
    },
    region: `${ipData.city},${ipData.region},${ipData.country}`,
  };
}

async function getWeather(
  updatePeriodMs: number,
  force: boolean
): Promise<WeatherFrom> {
  const cacheStore = new ElectronStore<WeatherDataCache | undefined>({
    name: 'weather',
  });

  const cache = cacheStore.store;
  const timestamp = new Date().getTime();
  const ipData = await getPublicIPData();

  if (
    !force &&
    (timestamp - cache?.timestamp ?? 0) < updatePeriodMs &&
    ipData.ip === cache?.ip
  ) {
    console.log(
      `[weather] Loading from cache at ${new Date(cache?.timestamp)}`,
      cache.data
    );
    return { ...cache.data, source: 'CACHE' };
  }

  const weatherBitCurrent = await getWBCurrentWeather(ipData);
  const weather = mapWBWeather(weatherBitCurrent, ipData);
  console.log(
    `[weather] Update from WeatherBit for ${weather.region}`,
    weather
  );

  cacheStore.store = { timestamp, ip: ipData.ip, data: weather };
  return { ...weather, source: 'WEATHER_BIT' };
}

export async function updateWeather(
  updatePeriodMs: number,
  force: boolean = false
): Promise<void> {
  try {
    const weather = await getWeather(updatePeriodMs, force);
    store.dispatch({
      type: 'WEATHER_DOWNLOAD_SUCCESS',
      weather,
    });
  } catch (e) {
    store.dispatch({
      type: 'WEATHER_DOWNLOAD_FAIL',
      timestamp: new Date().getTime(),
    });
  }
}
