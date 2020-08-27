import { createStore, Reducer, combineReducers } from 'redux';

import { Weather } from '../lib/weather';

export type AppState = {
  time?: string;
  weather?: Weather;
};

const reducers: Reducer<AppState> = combineReducers({});
const initState: AppState = {
  time: '12:00',
  weather: { temperature: 20, condition: { code: 800, partOfDay: 'd' } },
};

export const store = createStore(reducers, initState);
