import { Action } from 'redux';

import { Background } from '../lib/background';

export interface BackgroundDownloadSuccessAction
  extends Action<'BACKGROUND_DOWNLOAD_SUCCESS'> {
  background: Background;
}

export interface TimeTick extends Action<'TIME_TICK'> {
  timestamp: number;
}

export type AppActions = BackgroundDownloadSuccessAction | TimeTick;
