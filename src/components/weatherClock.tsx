import React, { FunctionComponent } from 'react';
import { MinuteClock } from './minuteClock';
import { WeatherBadge } from './weatherBadge';

export const WeatherClock: FunctionComponent = () => {
  return (
    <>
      <div className={'clock-weather-container'}>
        <WeatherBadge />
        <MinuteClock />
      </div>
    </>
  );
};
