import * as React from 'react';

import { useInterval } from './useInterval';

import { getTimeFromSeconds } from './time';

import { StopwatchOptions } from './types';

const enum Status {
  STARTED = 'STARTED',
  STOPPED = 'STOPPED',
}

export const useStopwatch = (options?: StopwatchOptions) => {
  const [status, setStatus] = React.useState(Status.STOPPED);
  const [seconds, setSeconds] = React.useState(0);

  const time = getTimeFromSeconds(seconds);

  const start = () => {
    if (isStarted()) return;
    setStatus(Status.STARTED);
    options?.onStart?.();
  };

  const stop = () => {
    if (isStopped()) return;
    setStatus(Status.STOPPED);
    options?.onStop?.();
  };

  const resume = () => {
    if (isStarted()) return;
    setStatus(Status.STARTED);
    options?.onResume?.();
  };

  const restart = () => {
    setStatus(Status.STARTED);
    setSeconds(0);
    options?.onRestart?.();
  };

  const reset = () => {
    setStatus(Status.STOPPED);
    setSeconds(0);
    options?.onReset?.();
  };

  const tick = () => {
    const newSeconds = seconds + 1;
    setSeconds(newSeconds);

    const time = getTimeFromSeconds(newSeconds);
    options?.onChange?.(time);
  };

  const isStarted = () => status === Status.STARTED;

  const isStopped = () => status === Status.STOPPED;

  useInterval({
    callback: tick,
    interval: 1000,
    active: isStarted(),
  });

  return {
    start,
    stop,
    resume,
    restart,
    reset,
    isStarted,
    isStopped,
    time,
  };
};
