/**
 * 延迟触发  多次提交，提交最后一次
 *
 * @param {() => void} fun
 * @param {number} [time=200]
 * @returns
 */
export function debounce<T extends (...args: any) => any>(fun: T, time = 200) {
  let st: any;
  return (...args: Parameters<T>) => {
    return new Promise<ReturnType<T>>(resolve => {
      clearTimeout(st);
      st = setTimeout(() => {
        resolve(fun.apply(this, args));
      }, time);
    })
  }
}

/**
 * 函数在未运行完成前 锁死
 *
 * @export
 * @template T
 * @param {T} fun
 * @returns
 */
export function lock<T extends (...args: any) => any>(fun: T) {
  let runing = false;
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (!runing) {
      runing = true;
      try {
        const data = await fun.apply(this, args);
        runing = false;
        return data;
      } catch (error) {
        runing = false;
        throw error;
      }
    }
  }
}

/**
 * 多少毫秒才能发送一次 限流
 *
 * @export
 * @param {number} [time=100]
 * @returns {MethodDecorator}
 */
export function throttle<T extends (...args: any) => any>(fun: T, time = 200) {
  let date = new Date();
  return (...args: Parameters<T>) => {
    return new Promise<ReturnType<T>>(resolve => {
      const now = new Date();
      if (now.getTime() - date.getTime() > time) {
        date = now;
        resolve(fun.apply(this, args));
      }
    })
  }
}
