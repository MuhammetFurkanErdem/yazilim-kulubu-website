/**
 * Wraps a promise with a timeout. If the promise does not resolve within the specified
 * time limit, it rejects with a timeout error.
 */
export function withTimeout<T>(promise: Promise<T> | any, timeoutMs = 6000): Promise<T> {
  let timeoutId: any;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("Database connection timed out."));
    }, timeoutMs);
  });

  return Promise.race([
    Promise.resolve(promise),
    timeoutPromise
  ]).then((result) => {
    clearTimeout(timeoutId);
    return result as T;
  }).catch((err) => {
    clearTimeout(timeoutId);
    throw err;
  });
}
