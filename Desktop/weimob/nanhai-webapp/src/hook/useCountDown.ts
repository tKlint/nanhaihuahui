/* eslint-disable no-nested-ternary */
// import { useEffect, useRef, useState } from '@tarojs/taro'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useRef, useState } from 'react';

export interface IUseCountDownOption {
  /** 结束时间 */
  endTime: Date | number | Dayjs | string;
  /**
   * 返回时间格式
   * 默认情况下返回的时间格式是字符串。如果你需要使用数值类型来做进一步的逻辑处理。那么你可以设置timeType位数值类型
   * 这个属性的优先级会高于[paratope]
   * @description string = day => '00'   number = day => 0
   */
  timeType?: 'string' | 'number'
  /** 数字是否补位  1 => 01 */
  paratope?: boolean;
  /**
   * 是否立即开始倒计时
   * 如果设置为false。则需要调用start方法手动开始
   */
  start?: boolean;
  /** 倒计时计算触发事件 */
  onTimeEnd?(): void
}

/**
 * 倒计时
 *
 * @export
 * @param {IUseCountDownOption} props
 * @return {*}
 */
export default function useCountDown<T extends (string | number) = string>(props: IUseCountDownOption) {
  const { endTime = '', paratope = true, start: initStart = true, timeType = 'string' } = props
  const initdata: any = timeType === 'number' ? 0 : paratope ? '00' : '0';
  const [day, setDay] = useState<T>(initdata)
  const [hour, setHour] = useState<T>(initdata)
  const [minute, setMinute] = useState<T>(initdata)
  const [seconds, setSeconds] = useState<T>(initdata)

  const timerRef = useRef<any>()

  useEffect(() => {
    if (endTime && initStart) {
      countDown()
    }

    return () => {
      if (endTime && initStart) {
        clearTimer()
      }
    }
  }, [endTime])

  function countDown() {
    let endDay = dayjs(endTime)
    const startDay = dayjs()

    if (endDay.diff(startDay, 'millisecond') <= 0) {
      setDay(initdata)
      setHour(initdata)
      setMinute(initdata)
      setSeconds(initdata)
      props.onTimeEnd && props.onTimeEnd()
      return clearTimer()
    }

    const diffDay = endDay.diff(startDay, 'day')
    const isNumberType = timeType === 'number';
    setDay(isNumberType ? diffDay : diffDay < 10 && paratope ? `0${diffDay}` : `${diffDay}` as any)
    if (diffDay > 0) {
      endDay = endDay.subtract(diffDay, 'day')
    }

    const diffHour = endDay.diff(startDay, 'hour')
    setHour(isNumberType ? diffHour : diffHour < 10 && paratope ? `0${diffHour}` : `${diffHour}` as any)
    if (diffHour > 0) {
      endDay = endDay.subtract(diffHour, 'hour')
    }

    const diffMinute = endDay.diff(startDay, 'minute')
    setMinute(isNumberType ? diffMinute : diffMinute < 10 && paratope ? `0${diffMinute}` : `${diffMinute}` as any)
    if (diffMinute > 0) {
      endDay = endDay.subtract(diffMinute, 'minute')
    }

    let sec = endDay.diff(startDay, 'second')
    sec = sec <= 0 ? 0 : sec
    setSeconds(isNumberType ? sec : sec < 10 && paratope ? `0${sec}` : `${sec}` as any)

    timerRef.current = setTimeout(() => {
      countDown()
    }, 200)
  }

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  return {
    day,
    hour,
    minute,
    seconds,
    start: countDown
  }
}
