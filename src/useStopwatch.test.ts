import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { renderHook } from '@testing-library/react';

import { useStopwatch } from './useStopwatch';

import { getSecondsFromTime } from './time';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('checks the status', () => {
  const hook = renderHook(() => useStopwatch());

  expect(hook.result.current.isStopped()).toBe(true);

  hook.result.current.start();

  hook.rerender();

  expect(hook.result.current.isStarted()).toBe(true);

  hook.result.current.stop();

  hook.rerender();

  expect(hook.result.current.isStopped()).toBe(true);

  hook.result.current.resume();

  hook.rerender();

  expect(hook.result.current.isStarted()).toBe(true);

  hook.result.current.reset();

  hook.rerender();

  expect(hook.result.current.isStopped()).toBe(true);

  hook.result.current.restart();

  hook.rerender();

  expect(hook.result.current.isStarted()).toBe(true);
});

it('checks if the time refreshes on every tick', () => {
  const hook = renderHook(() => useStopwatch());

  const previousTimeInSeconds = getSecondsFromTime(hook.result.current.time);

  hook.result.current.start();

  hook.rerender();

  vi.runOnlyPendingTimers();

  hook.rerender();

  const currentTimeInSeconds = getSecondsFromTime(hook.result.current.time);

  expect(currentTimeInSeconds).toBe(previousTimeInSeconds + 1);
});

it('checks that the event listeners get called', () => {
  const onStart = vi.fn();
  const onStop = vi.fn();
  const onResume = vi.fn();
  const onRestart = vi.fn();
  const onReset = vi.fn();
  const onChange = vi.fn();

  const hook = renderHook(() =>
    useStopwatch({
      onStart,
      onStop,
      onResume,
      onRestart,
      onReset,
      onChange,
    })
  );

  hook.result.current.start();

  hook.rerender();

  expect(onStart).toHaveBeenCalledOnce();

  hook.result.current.stop();

  hook.rerender();

  expect(onStop).toHaveBeenCalledOnce();

  hook.result.current.resume();

  hook.rerender();

  expect(onResume).toHaveBeenCalledOnce();

  hook.result.current.reset();

  hook.rerender();

  expect(onReset).toHaveBeenCalledOnce();

  hook.result.current.restart();

  hook.rerender();

  expect(onRestart).toHaveBeenCalledOnce();

  vi.runOnlyPendingTimers();

  hook.rerender();

  expect(onChange).toHaveBeenCalledOnce();
});
