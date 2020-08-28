import { Action } from 'redux';

import { Background } from '../lib/background';

export interface BackgroundDownloadSuccessAction
  extends Action<'BACKGROUND_DOWNLOAD_SUCCESS'> {
  background: Background;
  maxBuffer: number;
}

export interface BackgroundDownloadFailAction
  extends Action<'BACKGROUND_DOWNLOAD_FAIL'> {
  timestamp: number;
}

export interface TimeTick extends Action<'TIME_TICK'> {
  timestamp: number;
}

export type AppActions =
  | BackgroundDownloadSuccessAction
  | BackgroundDownloadFailAction
  | TimeTick;
