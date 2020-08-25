export type Weather = {
  icon: string;
  code: string;
  description: string;
};

export type CurrentWeather = {
  sunrise: string;
  sunset: string;
  datetime: string;
  city_name: string;
  weather: Weather;
  temp: number;
};

type CurrentWeatherResponse = {
  data: CurrentWeather[];
};

export async function getCurrentWeather(): Promise<CurrentWeather> {
  const remote = require('electron').remote;
  const key = remote.process.env.WEATHERBIT_API_KEY;

  const result = await fetch(
    `https://api.weatherbit.io/v2.0/current?ip=auto&key=${key}&lang=en`
  );

  return ((await result.json()) as CurrentWeatherResponse).data[0];
}
