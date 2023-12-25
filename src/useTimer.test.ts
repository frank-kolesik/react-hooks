import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { renderHook } from '@testing-library/react';

import { useTimer } from './useTimer';

import { getSecondsFromTime } from './time';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('checks the status', () => {
  const hook = renderHook(() => useTimer({ initialTime: { seconds: 1 } }));

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

  vi.runOnlyPendingTimers();

  hook.rerender();

  expect(hook.result.current.isCompleted()).toBe(true);
});

it('checks that the initial time gets reset', () => {
  const hook = renderHook((seconds: number = 3) =>
    useTimer({
      initialTime: {
        seconds: seconds,
      },
    })
  );

  const previousTimeInSeconds = getSecondsFromTime(hook.result.current.time);

  expect(previousTimeInSeconds).toBe(3);

  hook.rerender(5);

  const currentTimeInSeconds = getSecondsFromTime(hook.result.current.time);

  expect(currentTimeInSeconds).toBe(5);
});

it('checks that the event listeners get called', () => {
  const onStart = vi.fn();
  const onStop = vi.fn();
  const onResume = vi.fn();
  const onRestart = vi.fn();
  const onReset = vi.fn();
  const onExpire = vi.fn();
  const onChange = vi.fn();

  const hook = renderHook(() =>
    useTimer({
      initialTime: { seconds: 1 },
      onStart,
      onStop,
      onResume,
      onRestart,
      onReset,
      onExpire,
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

  expect(onExpire).toHaveBeenCalledOnce();

  expect(onChange).toHaveBeenCalledOnce();
});
