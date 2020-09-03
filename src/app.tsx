import React, { FunctionComponent } from 'react';
import Background from './components/Background';
import WeatherClock from './components/WeatherClock';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { downloadNew, preloadLast } from './lib/background';
import { updateWeather } from './lib/weather';
import { store } from './store';

import './App.sass';

const TIME_UPDATE_PERIOD_MS = 500;

const BACKGROUND_RESOLUTION = { height: 1080, width: 1920 };
const BACKGROUND_UPDATE_PERIOD_MS = 30 * 1000; // 30 sec

const WEATHER_UPDATE_PERIOD_MS = 60 * 60 * 1000; // 1 hour

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

  function updateWeatherTimeout() {
    updateWeather(WEATHER_UPDATE_PERIOD_MS, true).then(() =>
      setTimeout(() => updateWeatherTimeout(), WEATHER_UPDATE_PERIOD_MS)
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

  // init weather
  updateWeather(WEATHER_UPDATE_PERIOD_MS).then(() =>
    setTimeout(() => updateWeatherTimeout(), WEATHER_UPDATE_PERIOD_MS)
  );
};
