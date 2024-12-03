import { useRef, useState } from "react";

/**
 * 超级锁钩子。未运行完毕锁。500毫秒运行一次锁。运行成功500毫秒后才能运行锁。
 *
 * @param setLoading
 * @param fun
 */
export function useSuperLock<T extends (...args: any) => any>(fun: T, delay = 500):
  [(...args: Parameters<T>) => Promise<ReturnType<T>>, boolean] {
  const [lock, setLock] = useState(false);
  const date = useRef(new Date());

  return [async (...args: Parameters<T>) => {
    if (lock) {
      return;
    }

    const now = new Date();
    if (now.getTime() - date.current.getTime() > delay) {
      date.current = now;
    } else {
      return;
    }

    setLock(true);
    let returnValue: any;
    try {
      returnValue = await fun.apply(this, args);
    } catch (error) {
      setLock(false);
      throw error;
    }

    setTimeout(() => {
      setLock(false);
    }, delay);

    return returnValue;
  }, lock];
}
