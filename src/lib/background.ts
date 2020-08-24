import { count } from './collections';
import { getBackground } from '../services/unsplash';
import { mod } from './math';

export type Resolution = {
  height: number;
  width: number;
};

const MAX_IMAGES_BUFFER_COUNT = 5;

const categories: { [category: string]: [number, number] } = {
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
  return Object.entries(categories)
    .filter(
      ([_, range]) => mod(hour - range[0], 24) <= mod(range[1] - range[0], 24)
    )
    .map(([category]) => category);
}

export async function rotate(
  backgroundUl: HTMLUListElement,
  resolution: Resolution
): Promise<void> {
  const categoriesNow = getCategories(new Date());
  const categoriesDataValue = categoriesNow.join(',');
  const bufferOverflow = () =>
    count(backgroundUl.childNodes) > MAX_IMAGES_BUFFER_COUNT;

  function addBackground(href: string): void {
    const li = document.createElement('li');
    li.style.backgroundImage = `url(${href})`;
    li.classList.add('fade-in');
    li.setAttribute('data-categories', categoriesDataValue);
    backgroundUl.appendChild(li);
    while (bufferOverflow())
      backgroundUl.removeChild(backgroundUl.firstElementChild);
  }

  function rotateLast(): Promise<void> {
    backgroundUl.appendChild(
      backgroundUl.removeChild(backgroundUl.firstElementChild)
    );
    return Promise.resolve();
  }

  try {
    const img = new Image();
    img.src = await getBackground(resolution, categoriesNow);

    if (img.complete) {
      addBackground(img.src);
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      img.onload = () => {
        try {
          addBackground(img.src);
          resolve();
        } catch (e) {
          rotateLast();
          reject(e);
        }
      };
      img.onabort = () => {
        rotateLast();
        reject();
      };
    });
  } catch (e) {
    return rotateLast();
  }
}
