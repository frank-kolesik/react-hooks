export type TimeOutput = {
  seconds: number;
  minutes: number;
  hours: number;
};

export type TimeInput = RequireOne<Partial<TimeOutput>>;

export type IntervalOptions = {
  callback: () => void;
  interval: number;
  active: boolean;
};

export type TimerOptions = {
  initialTime: TimeInput;
  onChange?: (time: TimeOutput) => void;
  onStart?: () => void;
  onStop?: () => void;
  onResume?: () => void;
  onRestart?: () => void;
  onReset?: () => void;
  onExpire?: () => void;
};

export type StopwatchOptions = {
  onChange?: (time: TimeOutput) => void;
  onStart?: () => void;
  onStop?: () => void;
  onResume?: () => void;
  onRestart?: () => void;
  onReset?: () => void;
};

type RequireOne<T> = T & { [K in keyof T]: Required<Pick<T, K>> }[keyof T];
