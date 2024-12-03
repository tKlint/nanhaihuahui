import { useCallback, useEffect, useRef } from "@tarojs/taro";

/**
 * 多少毫秒才能发送一次 限流 废弃
 *
 * @export
 * @template T
 * @param {T} fun
 * @param {number} [delay=200]
 * @returns
 */
export function useThrottleFunction<T extends (...args: any) => any>(fun: T, time = 200, deps: any[] = []) {
  const date = useRef(new Date().getTime());
  const func = useRef(fun);

  useEffect(() => {
    func.current = fun;
  }, [fun])

  const callback = useCallback((...args: Parameters<T>) => {
    const now = new Date().getTime();

    if (now - date.current < time) return;

    func.current.apply(this, args);
    date.current = now;
  }, [fun, ...deps])

  return callback;
}
