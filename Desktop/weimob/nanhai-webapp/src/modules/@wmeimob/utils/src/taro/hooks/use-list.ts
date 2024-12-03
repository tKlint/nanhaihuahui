import Taro, { useState } from '@tarojs/taro';

type Return<T> = [T[], {
  setList: Taro.Dispatch<Taro.SetStateAction<T[]>>;
  replace: (idx: number, newItem: T | ((prev: T) => T)) => void;
  remove: (idx: number) => void;
}]

export function useList<T>(defaultList = [] as T[]): Return<T> {
  const [list, setList] = useState<T[]>(defaultList);

  function replace(idx: number, newItem: T | ((prev: T) => T)) {
    setList(prev => {
      const _list = [...prev];
      const _newItem = typeof newItem === 'function'
        ? (newItem as (prev: T) => T)(_list[idx])
        : newItem

      _list.splice(idx, 1, _newItem);

      return _list;
    })
  }

  function remove(idx: number) {
    setList(prev => {
      const _list = [...prev];
      _list.splice(idx, 1);

      return _list;
    })
  }

  return [list, {
    setList,
    replace,
    remove
  }]
}
