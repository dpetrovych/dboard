import React, { FunctionComponent } from 'react';
import { getConditionClass } from '../../lib/weatherConditions';
import { useSelector } from '../../store';

import './WeatherBadge.sass';

const WeatherBadge: FunctionComponent = () => {
  const weather = useSelector((state) => state.weather);
  return (
    <>
      {weather && (
        <div className={'weather-badge'}>
          <div
            className={'weather-badge-temperature fade-in'}
            dangerouslySetInnerHTML={{
              __html: `${Math.round(weather?.temperature)}&deg;`,
            }}
          ></div>
          <div
            className={`weather-badge-condition fade-in wi ${getConditionClass(
              weather.condition
            )}`}
          ></div>
        </div>
      )}
    </>
  );
};

export default WeatherBadge;
