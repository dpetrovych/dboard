import electron = require('electron');

type RemoteConfig = {
  OPEN_WEATHER_MAPS_API_KEY: string;
  WEATHERBIT_API_KEY: string;
};

export function getRemoteConfig(key: keyof RemoteConfig): string {
  return electron.remote.process.env[key];
}
