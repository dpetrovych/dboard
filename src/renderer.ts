import { render } from './app';

import { updateWeather } from './lib/weather';

const WEATHER_UPDATE_PERIOD_MS = 60 * 60 * 1000; // 1 hour

window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.createElement('div');
  rootElement.classList.add('root');
  document.body.appendChild(rootElement);

  render(rootElement);

  // const weather = document.createElement('div');
  // weather.classList.add('weather');
  // weather.textContent = '...';

  // function updateWeatherTimeout() {
  //   updateWeather(weather, WEATHER_UPDATE_PERIOD_MS, true).then(() =>
  //     setTimeout(() => updateWeatherTimeout(), WEATHER_UPDATE_PERIOD_MS)
  //   );
  // }

  // clockWeatherContainer.appendChild(weather);
  // document.body.appendChild(clockWeatherContainer);

  // updateWeather(weather, WEATHER_UPDATE_PERIOD_MS).then(() =>
  //   setTimeout(() => updateWeatherTimeout(), WEATHER_UPDATE_PERIOD_MS)
  // );
});
