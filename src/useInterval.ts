import * as React from 'react';

import { IntervalOptions } from './types';

export const useInterval = (options: IntervalOptions) => {
  const callbackRef = React.useRef<() => void>();

  React.useEffect(() => {
    callbackRef.current = options.callback;
  });

  React.useEffect(() => {
    if (!options.active) return () => {};

    const interval = setInterval(() => {
      callbackRef.current && callbackRef.current();
    }, options.interval);

    return () => clearInterval(interval);
  }, [options.active, options.interval]);
};
