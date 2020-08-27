import React, { FunctionComponent, useState } from 'react';

export const Background: FunctionComponent<{ urls?: string[] }> = ({
  urls = [
    'https://images.unsplash.com/photo-1597679440531-7d8aaa5488dd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080',
  ],
}) => {
  const [state] = useState(urls);
  return (
    <>
      <ul className="background">
        {state.map((url) => (
          <li style={{ backgroundImage: `url(${url})` }}></li>
        ))}
      </ul>
    </>
  );
};
