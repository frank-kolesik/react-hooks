import { describe, it, expect, vi } from 'vitest';

import { renderHook } from '@testing-library/react';

import { useTime } from './useTime';

import { getSecondsFromTime } from './utils';

type UseTime = ReturnType<typeof useTime>;

describe('useTime', () => {
  vi.useFakeTimers();

  it('tests the ticks', () => {
    const hook = renderHook(() => useTime());

    const previousTimeInSeconds = getSecondsFromTime(hook.result.current);

    vi.runOnlyPendingTimers();

    hook.rerender();

    const currentTimeInSeconds = getSecondsFromTime(hook.result.current);

    expect(currentTimeInSeconds).toBe(previousTimeInSeconds + 1);
  });

  it('tests the correctness', () => {
    const now = new Date();
    const ref: UseTime = {
      seconds: now.getSeconds(),
      minutes: now.getMinutes(),
      hours: now.getHours(),
      days: Math.round(now.getTime() / (1000 * 60 * 60 * 24)),
    };

    const hook = renderHook(() => useTime());
    const time = hook.result.current;

    Object.keys(ref).forEach((key) => expect(ref[key]).toBe(time[key]));
  });
});
