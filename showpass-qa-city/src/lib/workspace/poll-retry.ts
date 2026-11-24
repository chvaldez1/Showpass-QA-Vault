export function nextPollRetryDelay(previousDelay: number) {
  return previousDelay === 0 ? 5_000 : Math.min(previousDelay * 2, 60_000);
}
