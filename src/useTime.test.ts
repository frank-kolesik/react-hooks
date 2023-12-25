import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { renderHook } from '@testing-library/react';

import { useTime } from './useTime';

import { getSecondsFromTime } from './time';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('checks if the time refreshes on every tick', () => {
  const hook = renderHook(() => useTime());

  const previousTimeInSeconds = getSecondsFromTime(hook.result.current);

  vi.runOnlyPendingTimers();

  hook.rerender();

  const currentTimeInSeconds = getSecondsFromTime(hook.result.current);

  expect(currentTimeInSeconds).toBe(previousTimeInSeconds + 1);
});
