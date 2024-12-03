import { useState, useCallback } from 'react';

type Return = [boolean, {
  setTrue: () => void;
  setFalse: () => void;
  triggerBoolean: React.Dispatch<React.SetStateAction<boolean>>
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
