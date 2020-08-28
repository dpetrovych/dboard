import { getBackground } from '../services/unsplash';
import { mod } from './math';
import { store } from '../store';
import ElectronStore from 'electron-store';

export type Background = {
  downloadTime: number;
  categories: string[];
  url: string;
};

export type Resolution = {
  height: number;
  width: number;
};

type BackgroundCache = Background;

const MAX_IMAGES_BUFFER_COUNT = 5;

const CATEGORY_CONFIGURATION: { [category: string]: [number, number] } = {
  // always
  wallpaper: [0, 23],

  // motive
  nature: [8, 18],
  city: [21, 23],
  stars: [0, 5],

  // time of the day
  sunrise: [6, 7],
  morning: [8, 11],
  day: [12, 18],
  sunset: [19, 20],
  night: [21, 5],
};

export function getCategories(now: Date): string[] {
  const hour = now.getHours();
  return Object.entries(CATEGORY_CONFIGURATION)
    .filter(
      ([_, range]) => mod(hour - range[0], 24) <= mod(range[1] - range[0], 24)
    )
    .map(([category]) => category);
}

function getCacheStore() {
  return new ElectronStore<BackgroundCache | undefined>({
    name: 'background',
  });
}

function dispatchLoadFail() {
  store.dispatch({
    type: 'BACKGROUND_DOWNLOAD_FAIL',
    timestamp: new Date().getTime(),
  });
}

async function download(backgroundSeed: {
  url: string;
  categories: string[];
}): Promise<Background> {
  function dispatchLoadSuccess(background: Background) {
    store.dispatch({
      type: 'BACKGROUND_DOWNLOAD_SUCCESS',
      background,
      maxBuffer: MAX_IMAGES_BUFFER_COUNT,
    });
  }

  const img = new Image();
  img.src = backgroundSeed.url;

  if (img.complete) {
    const background = {
      ...backgroundSeed,
      downloadTime: new Date().getTime(),
    };
    dispatchLoadSuccess(background);
    return Promise.resolve(background);
  }

  return new Promise<Background>((resolve, reject) => {
    img.onload = () => {
      try {
        const background = {
          ...backgroundSeed,
          downloadTime: new Date().getTime(),
        };
        dispatchLoadSuccess(background);
        resolve(background);
      } catch (e) {
        dispatchLoadFail();
        reject(e);
      }
    };
    img.onabort = () => {
      dispatchLoadFail();
      reject();
    };
  });
}

export async function preloadLast(): Promise<boolean> {
  const background: Background | undefined = getCacheStore().store;
  if (background) {
    await download(background);
    return true;
  }

  return false;
}

export async function downloadNew(resolution: Resolution): Promise<void> {
  const now = new Date();
  const categories = getCategories(now);
  const url = await getBackground(resolution, categories);

  const background = await download({ url, categories });

  getCacheStore().store = background;
}
