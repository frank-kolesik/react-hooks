export const getCurrentTime = () => {
  const now = new Date();

  const timestampInMilliseconds = now.getTime();
  const timestampInSeconds = timestampInMilliseconds / 1000;

  const offsetInMinutes = now.getTimezoneOffset();
  const offsetInSeconds = offsetInMinutes * 60;

  const currentTimestamp = timestampInSeconds - offsetInSeconds;

  return getTimeFromSeconds(currentTimestamp);
};

export const getTimeFromSeconds = (s: number) => {
  const days = Math.floor(s / (60 * 60 * 24));
  const hours = Math.floor((s % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((s % (60 * 60)) / 60);
  const seconds = Math.floor(s % 60);

  return { seconds, minutes, hours, days };
};

export const getSecondsFromTime = (time: {
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
}) => {
  return (
    (time.seconds ?? 0) * 1 +
    (time.minutes ?? 0) * 60 +
    (time.hours ?? 0) * 60 * 60 +
    (time.days ?? 0) * 60 * 60 * 24
  );
};
