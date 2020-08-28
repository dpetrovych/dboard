import React, { FunctionComponent } from 'react';
import { useSelector } from '../store';

export const Background: FunctionComponent = ({}) => {
  const backgrounds = useSelector((state) => state.backgrounds);
  return (
    <>
      <ul className="background">
        {backgrounds?.map(({ downloadTime, url }) => (
          <li
            key={`${downloadTime}`}
            style={{ backgroundImage: `url(${url})` }}
          />
        ))}
      </ul>
    </>
  );
};
