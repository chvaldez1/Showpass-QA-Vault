export async function withAssignmentLock<Result>(runId: string, work: () => Promise<Result>) {
  if (!navigator.locks) return work();

  return navigator.locks.request(`qa-city-work:${runId}`, { ifAvailable: true }, (lock) => {
    if (!lock) throw new Error("This assignment is already running in another tab.");
    return work();
  });
}
