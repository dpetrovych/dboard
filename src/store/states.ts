import { Weather } from '../lib/weather';
import { Background } from '../lib/background';

export type BackgroundState = Background[];

export type TimeState = {
  minutes: number;
};

export type AppState = {
  backgrounds: BackgroundState;
  time: TimeState;
  weather?: Weather;
};
