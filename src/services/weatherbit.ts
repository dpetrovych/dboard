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
  pod: 'd' | 'n';
  weather: Weather;
  temp: number;
};

type CurrentWeatherResponse = {
  data: CurrentWeather[];
};

// API docs: https://www.weatherbit.io/api/swaggerui/weather-api-v2#!/Current32Weather32Data/get_current_lat_lat_lon_lon
export async function getCurrentWeather({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<CurrentWeather> {
  const apiKey = getRemoteConfig('WEATHERBIT_API_KEY');

  const result = await fetch(
    `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&lang=en`
  );

  return ((await result.json()) as CurrentWeatherResponse).data[0];
}
