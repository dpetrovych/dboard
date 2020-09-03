import React, { FunctionComponent } from 'react';
import { getConditionClass } from '../lib/weatherConditions';
import { useSelector } from '../store';

export const WeatherBadge: FunctionComponent = () => {
  const weather = useSelector((state) => state.weather);
  return (
    <>
      {weather && (
        <div className={'weather'}>
          <div className={'weather-temperature'}>{`${Math.round(
            weather?.temperature
          )}°`}</div>
          <div
            className={`weather-condition fade-in wi ${getConditionClass(
              weather.condition
            )}`}
          ></div>
        </div>
      )}
    </>
  );
};
