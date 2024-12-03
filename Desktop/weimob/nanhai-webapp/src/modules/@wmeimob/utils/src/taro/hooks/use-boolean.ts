import Taro, { useState, useCallback } from '@tarojs/taro';

type Return = [boolean, {
  setTrue: () => void;
  setFalse: () => void;
  triggerBoolean: Taro.Dispatch<Taro.SetStateAction<boolean>>
}]

export function useBoolean(defaultBoolean = false): Return {
  const [state, triggerBoolean] = useState(defaultBoolean);

  const setTrue = useCallback(() => triggerBoolean(true), []);

  const setFalse = useCallback(() => triggerBoolean(false), []);

  return [state, {
    triggerBoolean,
    setTrue,
    setFalse
  }]
}
