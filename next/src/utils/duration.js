const durationInSecondsGetHours = (durationInSeconds) => {
  const hours = ~~(durationInSeconds / 3600);
  return hours.toString().padStart(2, '0');
}

const durationInSecondsGetMinutes = (durationInSeconds) => {
  const minutes = ~~((durationInSeconds % 3600) / 60);
  return minutes.toString().padStart(2, '0');
}

const durationInSecondsGetSeconds = (durationInSeconds) => {
  const seconds = ~~durationInSeconds % 60;
  return seconds.toString().padStart(2, '0');
}

const getDurationFormatted = (durationInSeconds) => {
  const hours = durationInSecondsGetHours(durationInSeconds);
  const minutes = durationInSecondsGetMinutes(durationInSeconds);
  const seconds = durationInSecondsGetSeconds(durationInSeconds);
  return `${hours}:${minutes}:${seconds}`;
}

export { durationInSecondsGetHours, durationInSecondsGetMinutes, durationInSecondsGetSeconds, getDurationFormatted };