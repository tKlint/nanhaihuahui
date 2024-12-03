import * as React from 'react';
const { useState, memo, useImperativeHandle, forwardRef } = React;
import { concatObj } from '../other';

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
 * 上下文高阶函数
 *
 * @export
 * @template T
 * @param {(props: any) => T} createContextValue
 * @returns
 */
export function highContext<T>(createContextValue: (props: any) => T) {
  let DataContext: any
  let contextValue: T = {} as any;
  return {
    useMMContext: () => React.useContext<T>(DataContext),
    getContextValue: () => contextValue,
    context: <T extends React.ComponentType<any>>(Component: T) => {
      DataContext = React.createContext<T>([] as any);
      return memo(forwardRef((props: React.ComponentProps<T>, ref: any) => {
        contextValue = createContextValue(props);
        useImperativeHandle(ref, () => (contextValue));
        return <DataContext.Provider value={contextValue}>
          <Component {...props} />
        </DataContext.Provider>
      }))
    }
  }
}

