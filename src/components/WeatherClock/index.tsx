import React, { FunctionComponent } from 'react';
import MinuteClock from '../MinuteClock';
import WeatherBadge from '../WeatherBadge';

import './WeatherClock.sass';

const WeatherClock: FunctionComponent = () => {
  return (
    <>
      <div className={'weather-clock-container'}>
        <WeatherBadge />
        <MinuteClock />
      </div>
    </>
  );
};

export default WeatherClock;
