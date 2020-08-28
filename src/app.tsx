import React, { FunctionComponent } from 'react';
import { Background } from './components/background';
import { WeatherClock } from './components/weatherClock';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';

import './static/css/app.css';
import './static/css/weather-icons.css';

const TIME_UPDATE_PERIOD_MS = 500;

export const App: FunctionComponent = ({}) => {
  return (
    <>
      <Background />
      <WeatherClock />
    </>
  );
};

export const render = (element: Element) => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    element
  );

  function displayTime() {
    store.dispatch({ type: 'TIME_TICK', timestamp: new Date().getTime() });
    setTimeout(displayTime, TIME_UPDATE_PERIOD_MS);
  }

  displayTime();
};
