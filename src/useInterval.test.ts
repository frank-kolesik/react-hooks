import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';

import { renderHook } from '@testing-library/react';

import { useInterval } from './useInterval';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('checks the number of running timers', () => {
  const hook = renderHook((active: boolean = true) =>
    useInterval({
      callback: () => {},
      interval: 100,
      active: active,
    })
  );

  expect(vi.getTimerCount()).toBe(1);

  hook.rerender(false);

  expect(vi.getTimerCount()).toBe(0);

  hook.rerender(true);

  expect(vi.getTimerCount()).toBe(1);

  hook.unmount();

  expect(vi.getTimerCount()).toBe(0);
});

describe('check that the callback is called', () => {
  test('when the timer is active', () => {
    const callback = vi.fn();

    renderHook(() =>
      useInterval({
        callback: callback,
        interval: 100,
        active: true,
      })
    );

    vi.runOnlyPendingTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('when the timer changes from inactive to active', () => {
    const callback = vi.fn();

    const hook = renderHook((active: boolean = false) =>
      useInterval({
        callback: callback,
        interval: 100,
        active: active,
      })
    );

    hook.rerender(true);

    vi.runOnlyPendingTimers();

    expect(callback).toHaveBeenCalledTimes(1);

    hook.unmount();
  });

  test('when the callback changes from one to another', () => {
    const hook = renderHook((callback: () => void = vi.fn()) =>
      useInterval({
        callback: callback,
        interval: 100,
        active: true,
      })
    );

    const callback = vi.fn();

    hook.rerender(callback);

    vi.runOnlyPendingTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('check that the callback is NOT called', () => {
  test('when the timer is inactive', () => {
    const callback = vi.fn();

    renderHook(() =>
      useInterval({
        callback: callback,
        interval: 100,
        active: false,
      })
    );

    vi.runOnlyPendingTimers();

    expect(callback).toHaveBeenCalledTimes(0);
  });

  test('when the timer changes from active to inactive', () => {
    const callback = vi.fn();

    const hook = renderHook((active: boolean = true) =>
      useInterval({
        callback: callback,
        interval: 100,
        active: active,
      })
    );

    hook.rerender(false);

    vi.runOnlyPendingTimers();

    expect(callback).toHaveBeenCalledTimes(0);

    hook.unmount();
  });
});
