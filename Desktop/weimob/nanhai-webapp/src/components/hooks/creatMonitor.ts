import { autobind } from '~/modules/@wmeimob/decorator/src/components'

/**
 * 监听
 *
 * @returns
 */
export default function creatMonitor<T extends (...args: any) => any = any>() {
  @autobind
  class Monitor {
    listenerList: T[] = []

    add(fun: T) {
      this.listenerList.push(fun)
    }

    /**
     * 触发监听
     * @param parameter
     */
    emit(...parameter: Parameters<T>) {
      const all = this.listenerList.map((fun) => fun(...(parameter as any)))
      return Promise.all(all)
    }

    /**
     * 移除所有监听
     */
    remove(fun: T) {
      this.listenerList = this.listenerList.filter((val) => val !== fun)
    }

    removeAll() {
      this.listenerList = []
    }
  }

  return new Monitor()
}
