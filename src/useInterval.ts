import * as React from 'react';

export const useInterval = ({
  callback,
  interval,
  active,
}: {
  callback: () => void;
  interval: number;
  active: boolean;
}) => {
  const callbackRef = React.useRef<() => void>();
  const intervalRef = React.useRef<number | undefined>();

  React.useEffect(() => {
    callbackRef.current = callback;
  });

  React.useEffect(() => {
    if (!active) return () => clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      callbackRef.current && callbackRef.current();
    }, interval);

    return () => clearInterval(intervalRef.current);
  }, [active, interval]);
};
