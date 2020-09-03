import { render } from './app';

window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.createElement('div');
  rootElement.classList.add('root');
  document.body.appendChild(rootElement);

  render(rootElement);
});
