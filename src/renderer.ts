import { rotate } from './lib/background';
import { updateWeather } from './lib/weather';
import './static/css/renderer.css';
import './static/css/weather-icons.css';

const TIME_UPDATE_PERIOD_MS = 500;
const BACKGROUND_UPDATE_PERIOD_MS = 30 * 1000; // 30 sec
const BACKGROUND_RESOLUTION = { height: 1080, width: 1920 };

const WEATHER_UPDATE_PERIOD_MS = 60 * 60 * 1000; // 1 hour

window.addEventListener('DOMContentLoaded', () => {
  const background = document.createElement('ul');
  background.classList.add('background');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const clockWeatherContainer = document.createElement('div');
  clockWeatherContainer.classList.add('clock-weather-container');

  const weather = document.createElement('div');
  weather.classList.add('weather');
  weather.textContent = 'loading';

  const clock = document.createElement('div');
  clock.classList.add('clock');

  const format = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  function displayTime() {
    const now = new Date();
    const value = format.format(now);
    clock.innerHTML = value;
    setTimeout(displayTime, TIME_UPDATE_PERIOD_MS);
  }

  function updateBackgroundTimeout() {
    rotate(background, BACKGROUND_RESOLUTION).then(() =>
      setTimeout(updateBackgroundTimeout, BACKGROUND_UPDATE_PERIOD_MS)
    );
  }

  function updateWeatherTimeout() {
    updateWeather(weather).then(() =>
      setTimeout(updateWeather, WEATHER_UPDATE_PERIOD_MS)
    );
  }

  document.body.appendChild(overlay);
  document.body.appendChild(background);

  clockWeatherContainer.appendChild(weather);
  clockWeatherContainer.appendChild(clock);
  document.body.appendChild(clockWeatherContainer);

  displayTime();

  rotate(background, BACKGROUND_RESOLUTION).then(() => {
    overlay.classList.add('overlay-bottom');
    setTimeout(updateBackgroundTimeout, BACKGROUND_UPDATE_PERIOD_MS);
  });

  updateWeatherTimeout();
});
