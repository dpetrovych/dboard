import { Weather } from '../lib/weather';
import { Background } from '../lib/background';
import { Time } from '../lib/time';

export type AppState = {
  backgrounds: Background[];
  time: Time;
  weather?: Weather;
};
