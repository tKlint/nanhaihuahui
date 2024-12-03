import { useEffect, useState } from "react";
import creatMonitor from "./creatMonitor";

/**
 *  全局useState
 *
 * @param cache 是否启动缓存
 * @returns
 */
export default function creatGlobalState<S = any>(cache?: boolean) {
  const monitor = creatMonitor<any>();
  let stateCache: any;

  function useGlobalState(defaultS?: S) {
    const [state, setStateNative] = useState<S>(stateCache || defaultS);

    function setState(newState: S) {
      if (cache) {
        stateCache = newState;
      }
      monitor.emit(newState);
    }

    useEffect(() => {
      stateCache = state;
      const set = (newState) => {
        setStateNative(newState);
      }
      monitor.add(set);
      return () => {
        monitor.remove(set);
      }
    }, [])

    return [state, setState] as [typeof state, typeof setState]
  }

  return useGlobalState;
}
