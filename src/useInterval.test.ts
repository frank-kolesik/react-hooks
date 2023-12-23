import { describe, it, expect, vi } from 'vitest';

import { renderHook } from '@testing-library/react';

import { useInterval } from './useInterval';

type UseIntervalParams = Partial<Parameters<typeof useInterval>[0]>;

describe('useInterval', () => {
  vi.useFakeTimers();

  it('tests the active state', () => {
    const callback = vi.fn();

    expect(callback).toHaveBeenCalledTimes(0);

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

  it('tests the inactive state', () => {
    const callback = vi.fn();

    expect(callback).toHaveBeenCalledTimes(0);

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

  it('tests the change from active to inactive state', () => {
    const callback = vi.fn();

    expect(callback).toHaveBeenCalledTimes(0);

    const hook = renderHook((params: UseIntervalParams) =>
      useInterval({
        callback: callback,
        interval: 100,
        active: params?.active ?? true,
      })
    );

    vi.runOnlyPendingTimers();

    expect(callback).toHaveBeenCalledTimes(1);

    hook.rerender({ active: false });

    vi.runOnlyPendingTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('tests the change from one callback to another', () => {
    const callbackOne = vi.fn();

    expect(callbackOne).toHaveBeenCalledTimes(0);

    const hook = renderHook((params: UseIntervalParams) =>
      useInterval({
        callback: params?.callback ?? callbackOne,
        interval: 100,
        active: true,
      })
    );

    vi.runOnlyPendingTimers();

    expect(callbackOne).toHaveBeenCalledTimes(1);

    const callbackTwo = vi.fn();

    expect(callbackTwo).toHaveBeenCalledTimes(0);

    hook.rerender({ callback: callbackTwo });

    vi.runOnlyPendingTimers();

    expect(callbackOne).toHaveBeenCalledTimes(1);

    expect(callbackTwo).toHaveBeenCalledTimes(1);
  });
});
