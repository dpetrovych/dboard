import React, { FunctionComponent } from 'react';
import { Background } from './components/background';
import { WeatherClock } from './components/weatherClock';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { downloadNew, preloadLast } from './lib/background';
import { store } from './store';

import './static/css/app.css';
import './static/css/weather-icons.css';

const TIME_UPDATE_PERIOD_MS = 500;

const BACKGROUND_RESOLUTION = { height: 1080, width: 1920 };
const BACKGROUND_UPDATE_PERIOD_MS = 5 * 1000; // 30 sec

export const App: FunctionComponent = ({}) => {
  return (
    <>
      <Background />
      <WeatherClock />
    </>
  );
};

export const render = async (element: Element): Promise<void> => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    element
  );

  function displayTime(): void {
    store.dispatch({ type: 'TIME_TICK', timestamp: new Date().getTime() });
    setTimeout(() => displayTime(), TIME_UPDATE_PERIOD_MS);
  }

  function rotateBackground(): void {
    downloadNew(BACKGROUND_RESOLUTION).then(() =>
      setTimeout(() => rotateBackground(), BACKGROUND_UPDATE_PERIOD_MS)
    );
  }

  // init time
  displayTime();

  // init background
  const preloadLastSuccessful = await preloadLast();
  setTimeout(
    () => rotateBackground(),
    preloadLastSuccessful ? BACKGROUND_UPDATE_PERIOD_MS : 0
  );
};
