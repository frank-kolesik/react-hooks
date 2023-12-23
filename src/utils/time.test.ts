import { describe, it, expect } from 'vitest';

import { useTime } from '../useTime';

import { getCurrentTime, getTimeFromSeconds, getSecondsFromTime } from './time';

type UseTime = ReturnType<typeof useTime>;

describe('time utils', () => {
  it('tests getCurrentTime', () => {
    const now = new Date();
    const ref: UseTime = {
      seconds: now.getSeconds(),
      minutes: now.getMinutes(),
      hours: now.getHours(),
      days: Math.round(now.getTime() / (1000 * 60 * 60 * 24)),
    };

    const time = getCurrentTime();

    Object.keys(ref).forEach((key) => expect(ref[key]).toBe(time[key]));
  });

  it('tests getSecondsFromTime', () => {
    const time: UseTime = {
      seconds: 1,
      minutes: 1,
      hours: 1,
      days: 1,
    };

    const seconds = getSecondsFromTime(time);

    expect(seconds).toBe(90061);

    expect(getSecondsFromTime({ days: 2 })).toBe(172800);

    expect(getSecondsFromTime({ hours: 3 })).toBe(10800);

    expect(getSecondsFromTime({ minutes: 5 })).toBe(300);

    expect(getSecondsFromTime({ seconds: 10 })).toBe(10);
  });

  it('tests getTimeFromSeconds', () => {
    const ref: UseTime = {
      seconds: 1,
      minutes: 1,
      hours: 1,
      days: 1,
    };

    const time = getTimeFromSeconds(90061);

    Object.keys(ref).forEach((key) => expect(ref[key]).toBe(time[key]));
  });
});
