import { expect, test } from 'vitest';

import { getCurrentTime, getSecondsFromTime, getTimeFromSeconds } from './time';

test('getCurrentTime', () => {
  const now = new Date();

  const ref: ReturnType<typeof getCurrentTime> = {
    seconds: now.getSeconds(),
    minutes: now.getMinutes(),
    hours: now.getHours(),
  };

  const time = getCurrentTime();

  expect(time).toEqual(ref);
});

test('getSecondsFromTime', () => {
  expect(
    getSecondsFromTime({
      seconds: 1,
      minutes: 1,
      hours: 1,
    })
  ).toBe(3661);

  expect(getSecondsFromTime({ hours: 3 })).toBe(10800);

  expect(getSecondsFromTime({ minutes: 5 })).toBe(300);

  expect(getSecondsFromTime({ seconds: 10 })).toBe(10);
});

test('getTimeFromSeconds', () => {
  const ref: ReturnType<typeof getTimeFromSeconds> = {
    seconds: 1,
    minutes: 1,
    hours: 1,
  };

  const time = getTimeFromSeconds(3661);

  expect(time).toEqual(ref);
});
