import { getBackground } from './services/unsplash';
import './static/renderer.css';

window.addEventListener('DOMContentLoaded', () => {
  const background = document.createElement('div');
  background.classList.add('background', 'fade-in');
  background.style.backgroundImage = formatBackgroundStyle(getBackground());

  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'fade-in');

  const clock = document.createElement('div');
  clock.classList.add('clock', 'fade-in');

  const format = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  function displayTime() {
    const now = new Date();
    const value = format.format(now);
    clock.innerHTML = value;
    setTimeout(displayTime, 500);
  }

  document.body.appendChild(background);
  document.body.appendChild(overlay);
  document.body.appendChild(clock);

  displayTime();
});

function formatBackgroundStyle(url: string): string {
  return `url("${url}")`;
}
