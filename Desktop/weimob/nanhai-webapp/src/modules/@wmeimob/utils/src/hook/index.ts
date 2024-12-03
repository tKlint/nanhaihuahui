import { any } from "lodash/fp";
import { useRef, useState } from "react";

/**
 * 延迟触发 多次提交，提交最后一次
 *
 * @export
 * @template T
 * @param {T} fun
 * @param {number} [delay=200]
 * @returns
 */
export function useDebounceFunction<T extends (...args: any) => any>(fun: T, delay = 200) {
  // 存储去抖动后的值
  const st = useRef(null as any);

  return (...args: Parameters<T>) => {
    clearTimeout(st.current);
    st.current = setTimeout(() => {
      fun.apply(this, args);
    }, delay);
  };
}

/**
 * 函数在未运行完成前 锁死
 *
 * @export
 * @template T
 * @param {T} fun
 * @param {number} [delay=200]
 * @returns
 */
export function useLockFunction<T extends (...args: any) => any>(fun: T) {
  // 存储去抖动后的值
  const runing = useRef(false);

  return async (...args: Parameters<T>) => {
    if (!runing.current) {
      runing.current = true;
      try {
        const data = await fun.apply(this, args);
        runing.current = false;
        return data;
      } catch (error) {
        runing.current = false;
        throw error;
      }
    }
  };
}

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

/**
 * 多少毫秒才能发送一次 限流
 *
 * @export
 * @template T
 * @param {T} fun
 * @param {number} [delay=200]
 * @returns
 */
export function useThrottleFunction<T extends (...args: any) => any>(fun: T, time = 200) {
  // 存储去抖动后的值
  const date = useRef(new Date());

  return (...args: Parameters<T>) => {
    return new Promise<ReturnType<T>>(resolve => {
      const now = new Date();
      if (now.getTime() - date.current.getTime() > time) {
        date.current = now;
        resolve(fun.apply(this, args));
      }
    })
  }
}

/**
 * 所有函数返回值均是最后一个函数的返回值 返回值转为promise
 *
 * @export
 * @param {number} [time=200]
 * @returns {MethodDecorator}
 */
export function useMergeFunction<T extends (...args: any) => any>(fun: T, time = 200) {
  const st = useRef(null as any);
  const resloveFunction = useRef(null as any);
  const returnPromise = useRef(null as any);

  return (...args: Parameters<T>) => {
    if (!returnPromise.current) {
      returnPromise.current = new Promise(resolve => {
        resloveFunction.current = resolve;
      })
    }

    clearTimeout(st.current);
    st.current = setTimeout(() => {
      resloveFunction.current(fun.apply(this, args));
      returnPromise.current = undefined;
    }, time);
  }
}

/**
 * 永远返回第一次的运行的返回
 *
 * @param fun
 * @param time
 */
export function useSaveReturnFunction<T extends (...args: any) => any>(fun: T, time = 200) {
  const returnValue = useRef(null as ReturnType<T>);

  return (...args: Parameters<T>) => {
    if (returnValue.current) {
      return returnValue.current;
    }

    returnValue.current = fun.apply(this, args);
    return returnValue.current;
  }
}

