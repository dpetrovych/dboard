import { createStore } from 'redux';
import { useSelector as reduxUseSelector } from 'react-redux';

import { reducer } from './reducers';
import { getMinutes } from '../lib/time';
import { AppState } from './states';
import { AppActions } from './actions';

const initState: AppState = {
  backgrounds: null,
  time: {
    minutes: getMinutes(new Date()),
  },
};

export function useSelector<T>(selector: (state: AppState) => T): T {
  return reduxUseSelector<AppState, T>(selector);
}

export const store = createStore<AppState, AppActions, {}, {}>(
  reducer,
  initState
);
