import { getCurrentWeather, CurrentWeather } from '../services/weatherbit';

export async function updateWeather(container: Element): Promise<void> {
  container.textContent = '';

  const weather: CurrentWeather = await getCurrentWeather();

  const temp = document.createElement('span');
  temp.classList.add('weather-temp');
  temp.textContent = `${weather.temp}`;

  container.appendChild(temp);
}
