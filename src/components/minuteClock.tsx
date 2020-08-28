import React, { FunctionComponent } from 'react';
import { useSelector } from '../store';

const format = new Intl.DateTimeFormat('en', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

function formatMinutes(minutes: number): string {
  const date = new Date(minutes * 60 * 1000);
  return format.format(date);
}

export const MinuteClock: FunctionComponent = ({}) => {
  const minutes = useSelector((state) => state.time.minutes);
  return (
    <>
      <div className={'clock'}>{formatMinutes(minutes)}</div>
    </>
  );
};
