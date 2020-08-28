import { AppState } from './state';
import { AppActions } from './actions';
import { Reducer } from 'redux';
import { getMinutes } from '../lib/time';

export const reducer: Reducer<AppState> = (
  state: AppState,
  action: AppActions
) => {
  console.debug('[reducer] called', action);
  if (action.type === 'TIME_TICK') {
    state.time.minutes = getMinutes(new Date());
  }
  return state;
};
