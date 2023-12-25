import * as React from 'react';

import { useInterval } from './useInterval';

import { getSecondsFromTime, getTimeFromSeconds } from './time';

import { TimeOptions } from './types';

const enum Status {
  STARTED = 'STARTED',
  STOPPED = 'STOPPED',
  COMPLETED = 'COMPLETED',
}

export const useTimer = (options: TimeOptions) => {
  const initialSeconds = getSecondsFromTime(options.initialTime);

  const [status, setStatus] = React.useState(Status.STOPPED);
  const [seconds, setSeconds] = React.useState(initialSeconds);

  const time = getTimeFromSeconds(seconds);

  const start = () => {
    if (isStarted() || isCompleted()) return;
    setStatus(Status.STARTED);
    options.onStart?.();
  };

  const stop = () => {
    if (isStopped() || isCompleted()) return;
    setStatus(Status.STOPPED);
    options.onStop?.();
  };

  const resume = () => {
    if (isStarted() || isCompleted()) return;
    setStatus(Status.STARTED);
    options.onResume?.();
  };

  const restart = () => {
    setStatus(Status.STARTED);
    setSeconds(initialSeconds);
    options.onRestart?.();
  };

  const reset = () => {
    setStatus(Status.STOPPED);
    setSeconds(initialSeconds);
    options.onReset?.();
  };

  const tick = () => {
    const newSeconds = seconds - 1;
    setSeconds(newSeconds);

    const time = getTimeFromSeconds(newSeconds);
    options.onChange?.(time);

    if (newSeconds === 0) {
      setStatus(Status.COMPLETED);
      options.onExpire?.();
    }
  };

  const isStarted = () => status === Status.STARTED;

  const isStopped = () => status === Status.STOPPED;

  const isCompleted = () => status === Status.COMPLETED;

  React.useEffect(() => {
    setStatus(Status.STOPPED);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

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
    isCompleted,
    time,
  };
};
