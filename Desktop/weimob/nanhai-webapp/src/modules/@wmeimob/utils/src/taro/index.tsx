import { useState, getCurrentPages } from '@tarojs/taro';
import { concatObj } from '../other';
import { Properties } from 'csstype';

/**
 * 生成一个对象hook 提供类似class state的功能
 *
 * @export
 * @template T
 * @param {T} defaultState
 * @returns {[T, (state: Partial<T>) => void]}
 */
export function useCreateState<T>(defaultState: T): [T, (state: Partial<T>) => void] {
  const [state, updateState] = useState<T>(defaultState);
  function setState(partialState: Partial<T>) {
    return updateState(prevState => concatObj(prevState, partialState));
  }
  return [state, setState]
}

/**
 * 自动给一些样式添加px后缀
 *
 * @export
 * @param {(Properties<string | number>)} style
 * @returns
 */
export function suffixStyle(style: Properties<string | number>) {
  const st = Object.create(null);
  for (const key in style) {
    if (style.hasOwnProperty(key)) {
      const value = style[key];
      const properties = ['fontSize', 'height', 'width'];
      if (typeof value === 'number' && properties.indexOf(key) !== -1) {
        st[key] = `${value}px`;
      } else {
        st[key] = value;
      }
    }
  }

  return st;
}

export function getCurrentPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}
