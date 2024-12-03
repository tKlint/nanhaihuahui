import { useCallback, useEffect, useRef } from "react";

/**
 * 函数在未运行完成前 锁死
 *
 * @export
 * @template T
 * @param {T} fun
 * @returns
 */
export function useLockFunction<T extends (...args: any) => any>(fun: T, deps: any[] = []) {
  const running = useRef(false);

  const callback = useCallback(async (...args: Parameters<T>) => {
    if (!running.current) {
      running.current = true;
      try {
        const data = await fun.apply(null, args);
        return data;
      } catch (error) {
        running.current = false;
        throw error;
      } finally {
        running.current = false;
      }
    }
  }, [fun, ...deps])

  return callback;
}
