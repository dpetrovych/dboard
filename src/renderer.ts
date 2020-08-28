import { render } from './app';

import { rotate } from './lib/background';
import { updateWeather } from './lib/weather';

const TIME_UPDATE_PERIOD_MS = 500;
const BACKGROUND_UPDATE_PERIOD_MS = 30 * 1000; // 30 sec
const BACKGROUND_RESOLUTION = { height: 1080, width: 1920 };

const WEATHER_UPDATE_PERIOD_MS = 60 * 60 * 1000; // 1 hour

window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.createElement('div');
  rootElement.classList.add('root');
  document.body.appendChild(rootElement);

  render(rootElement);

  // const background = document.createElement('ul');
  // background.classList.add('background');

  // const overlay = document.createElement('div');
  // overlay.classList.add('overlay');

  // const clockWeatherContainer = document.createElement('div');
  // clockWeatherContainer.classList.add('clock-weather-container');

  // const weather = document.createElement('div');
  // weather.classList.add('weather');
  // weather.textContent = '...';

  // function updateBackgroundTimeout() {
  //   rotate(background, BACKGROUND_RESOLUTION).then(() =>
  //     setTimeout(() => updateBackgroundTimeout(), BACKGROUND_UPDATE_PERIOD_MS)
  //   );
  // }

  // function updateWeatherTimeout() {
  //   updateWeather(weather, WEATHER_UPDATE_PERIOD_MS, true).then(() =>
  //     setTimeout(() => updateWeatherTimeout(), WEATHER_UPDATE_PERIOD_MS)
  //   );
  // }

  // document.body.appendChild(overlay);
  // document.body.appendChild(background);

  // clockWeatherContainer.appendChild(weather);
  // document.body.appendChild(clockWeatherContainer);

  // rotate(background, BACKGROUND_RESOLUTION).then(() => {
  //   overlay.classList.add('overlay-bottom');
  //   setTimeout(() => updateBackgroundTimeout(), BACKGROUND_UPDATE_PERIOD_MS);
  // });

  // updateWeather(weather, WEATHER_UPDATE_PERIOD_MS).then(() =>
  //   setTimeout(() => updateWeatherTimeout(), WEATHER_UPDATE_PERIOD_MS)
  // );
});
