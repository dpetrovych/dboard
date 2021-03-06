import React, { FunctionComponent } from 'react';
import { useSelector } from '../../store';
import { BackgroundState } from '../../store/states';

import './Background.sass';

const drop = (background?: BackgroundState): string =>
  background ? 'overlay-bottom' : '';

const Background: FunctionComponent = ({}) => {
  const backgrounds = useSelector((state) => state.backgrounds);
  return (
    <>
      <ul className="background">
        {backgrounds?.map(({ downloadTime, url }) => (
          <li
            key={`${downloadTime}`}
            style={{ backgroundImage: `url(${url})` }}
            className={'fade-in'}
          />
        ))}
      </ul>
      <div className={`overlay ${drop(backgrounds)}`}></div>
    </>
  );
};

export default Background;
