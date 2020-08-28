import { AppState, BackgroundState, TimeState } from './states';
import { AppActions } from './actions';
import { Reducer, combineReducers } from 'redux';
import { getMinutes } from '../lib/time';

const backgroundReducer: Reducer<BackgroundState> = (
  backgrounds: BackgroundState = null,
  action: AppActions
) => {
  console.debug('[reducers#background] called', action);
  if (action.type === 'BACKGROUND_DOWNLOAD_SUCCESS') {
    backgrounds = backgrounds || [];
    const maxBuffer = Math.max(action.maxBuffer, 1);
    const cutAtIndex = Math.max(0, backgrounds.length - maxBuffer);

    backgrounds = [...backgrounds.splice(cutAtIndex), action.background];
  }

  if (action.type === 'BACKGROUND_DOWNLOAD_FAIL') {
    if (backgrounds && backgrounds.length > 1) {
      const first = backgrounds.splice(0, 1)[0];
      first.downloadTime = action.timestamp;
      backgrounds = [...backgrounds, first];
    }
  }

  return backgrounds;
};

export const timeReducer: Reducer<TimeState> = (
  time: TimeState = null,
  action: AppActions
) => {
  console.debug('[reducers#time] called', action);
  if (action.type === 'TIME_TICK') {
    time.minutes = getMinutes(new Date());
  }

  return time;
};

export const reducer: Reducer<AppState> = combineReducers({
  backgrounds: backgroundReducer,
  time: timeReducer,
});
