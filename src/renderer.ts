import { rotate } from './lib/background';
import './static/renderer.css';

const TIME_UPDATE_PERIOD_MS = 500;
const BACKGROUND_UPDATE_PERIOD_MS = 15000;
const BACKGROUND_RESOLUTION = { height: 1080, width: 1920 };

window.addEventListener('DOMContentLoaded', () => {
  const background = document.createElement('ul');
  background.classList.add('background');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

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

  function carouselBackground() {
    rotate(background, BACKGROUND_RESOLUTION).then(() =>
      setTimeout(carouselBackground, BACKGROUND_UPDATE_PERIOD_MS)
    );
  }

  document.body.appendChild(overlay);
  document.body.appendChild(background);
  document.body.appendChild(clock);

  displayTime();

  rotate(background, BACKGROUND_RESOLUTION).then(() => {
    overlay.classList.add('overlay-bottom');
    setTimeout(carouselBackground, BACKGROUND_UPDATE_PERIOD_MS);
  });
});
