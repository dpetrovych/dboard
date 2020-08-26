import { getRemoteConfig } from '../config/remote';

export type Weather = {
  icon: string;
  code: string;
  description: string;
};

export type CurrentWeather = {
  sunrise: string;
  sunset: string;
  ts: number;
  city_name: string;
  weather: Weather;
  temp: number;
};

type CurrentWeatherResponse = {
  data: CurrentWeather[];
};

export async function getCurrentWeather({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<CurrentWeather> {
  const apiKey = getRemoteConfig('OPEN_WEATHER_MAPS_API_KEY');

  const result = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  );

  return ((await result.json()) as CurrentWeatherResponse).data[0];
}
