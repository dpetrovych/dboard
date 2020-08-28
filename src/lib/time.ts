export type Time = {
  minutes: number;
};

export const getMinutes = (date: Date): number => date.getTime() / (60 * 1000);
