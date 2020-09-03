import { Action } from 'redux';

import { Background } from '../lib/background';
import { WeatherFrom } from '../lib/weather';

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

export interface WeatherDownloadSuccessAction
  extends Action<'WEATHER_DOWNLOAD_SUCCESS'> {
  weather: WeatherFrom;
}

export interface WeatherDownloadFailAction
  extends Action<'WEATHER_DOWNLOAD_FAIL'> {
  timestamp: number;
}

export type AppActions =
  | BackgroundDownloadFailAction
  | BackgroundDownloadSuccessAction
  | TimeTick
  | WeatherDownloadFailAction
  | WeatherDownloadSuccessAction;
