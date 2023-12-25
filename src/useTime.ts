import * as React from 'react';

import { useInterval } from './useInterval';

import { getCurrentTime } from './time';

export const useTime = () => {
  const [time, setTime] = React.useState(getCurrentTime());

  useInterval({
    callback: () => setTime(getCurrentTime()),
    interval: 1000,
    active: true,
  });

  return time;
};
