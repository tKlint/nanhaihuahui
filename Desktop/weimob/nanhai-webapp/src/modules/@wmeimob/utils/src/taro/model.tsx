import { useEffect, useRef, useState } from "@tarojs/taro";
import EventEmitter from "~/modules/@wmeimob/event-emitter";
import { concatObj } from "../other";
import { BaseProviderValue } from "../types/BaseProviderValue";

/**
 * 创建全局model
 */
export default function createUseModel<P, S, T extends BaseProviderValue<S>>(
  createValue: (useCreateState: typeof useCallBackState, props?: P,) => T):
  (props?: P) => T {
  let globalState: S
  let modelValue: T

  const event = new EventEmitter<{
    setState: (state: S, callback?: (state: S) => void) => void
  }>();

  return (props) => {
    let setState;
    modelValue = createValue((state) => {
      const stateObj = useCallBackState({ ...state, ...globalState })
      setState = stateObj[1];
      stateObj[1] = (newState: S, callback) => {
        setState(newState, callback);
        event.emit('setState', newState);
      };
      return stateObj;
    }, props);
    globalState = modelValue.state;

    useEffect(() => {
      event.addListener('setState', setState, true);
      return () => event.removeListener('setState', setState);
    }, [])

    return modelValue;
  };
}

/**
 * 生成一个对象hook 提供类似class state的功能
 *
 * @export
 * @template T
 * @param {T} defaultState
 * @returns {[T, (state: Partial<T>) => void]}
 */
export function useCallBackState<T>(defaultState: T):
  [T, (state: Partial<T>, callback?: (state: T) => void) => void] {
  type StateType = T & { __refresh: boolean };

  const [state, updateState] = useState<StateType>({
    ...defaultState,
    __refresh: false
  });

  const lastCallback = useRef<() => void>();

  function setState(partialState: Partial<StateType>, callback?: (state: StateType) => void) {
    return updateState(prevState => {
      const newState = concatObj(prevState, partialState);
      if (newState !== prevState) {
        newState['__refresh'] = !prevState['__refresh']
      }

      if (callback) {
        lastCallback.current = () => callback(newState);
      }
      return newState;
    });
  }

  useEffect(() => {
    if (lastCallback.current) {
      lastCallback.current();
    }
  }, [state.__refresh])

  return [state, setState]
}
