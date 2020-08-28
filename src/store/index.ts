import { createStore } from 'redux';
import { useSelector as reduxUseSelector } from 'react-redux';

import { reducer } from './reducer';
import { getMinutes } from '../lib/time';
import { AppState } from './state';
import { AppActions } from './actions';

const initState: AppState = {
  backgrounds: [
    {
      downloadTime: new Date().getTime(),
      categories: ['init'],
      url:
        'https://images.unsplash.com/photo-1596290685046-756064638d9e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop',
    },
  ],
  time: {
    minutes: getMinutes(new Date()),
  },
  weather: { temperature: 20, condition: { code: 800, partOfDay: 'd' } },
};

export function useSelector<T>(selector: (state: AppState) => T): T {
  return reduxUseSelector<AppState, T>(selector);
}

export const store = createStore<AppState, AppActions, {}, {}>(
  reducer,
  initState
);
