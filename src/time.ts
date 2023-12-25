import { TimeInput, TimeOutput } from './types';

export const getCurrentTime = (): TimeOutput => {
  const now = new Date();

  const timestampInMilliseconds = now.getTime();
  const timestampInSeconds = timestampInMilliseconds / 1000;

  const offsetInMinutes = now.getTimezoneOffset();
  const offsetInSeconds = offsetInMinutes * 60;

  const currentTimestamp = timestampInSeconds - offsetInSeconds;

  return getTimeFromSeconds(currentTimestamp);
};

export const getTimeFromSeconds = (s: number): TimeOutput => {
  const hours = Math.floor((s % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((s % (60 * 60)) / 60);
  const seconds = Math.floor(s % 60);
  return { seconds, minutes, hours };
};

export const getSecondsFromTime = (time: TimeInput): number => {
  return (
    (time.seconds ?? 0) * 1 +
    (time.minutes ?? 0) * 60 +
    (time.hours ?? 0) * 60 * 60
  );
};
