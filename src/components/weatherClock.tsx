import React, { FunctionComponent, useState } from 'react';
import { getConditionClass } from '../lib/weatherConditions';
import { Weather } from '../lib/weather';
import { MinuteClock } from './minuteClock';

export const WeatherClock: FunctionComponent<{
  weather?: Weather;
}> = ({
  weather = {
    temperature: 24.3,
    condition: {
      code: 202,
      partOfDay: 'd',
    },
  },
}) => {
  const [state] = useState({ weather });

  const wiCondition = getConditionClass(state.weather.condition);
  const tempFormatted = `${Math.round(state.weather.temperature)}°`;

  return (
    <>
      <div className={'clock-weather-container'}>
        <div className={'weather'}>
          <div className={'weather-temperature'}>{tempFormatted}</div>
          <div className={`weather-condition fade-in wi ${wiCondition}`}></div>
        </div>
        <MinuteClock />
      </div>
    </>
  );
};
