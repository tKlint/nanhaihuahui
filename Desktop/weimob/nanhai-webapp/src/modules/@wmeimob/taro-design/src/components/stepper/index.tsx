import { PureComponent } from 'react'
import { Input, View } from '@tarojs/components'
import { BaseEventOrig } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import { autobind } from '~/modules/@wmeimob/decorator/src/components'
import { minus, plus } from 'number-precision'
import MMIconFont from '../icon-font'
import themesStyles from '../styles/themes/default.modules.less'
import styles from './index.module.less'
import MMIconFontName from '../icon-font/const'
import classNames from 'classnames'

interface IStepperProps {
  /**
   * 最小值
   *
   * @type {number}
   * @memberof IStepperProps
   */
  min?: number
  /**
   * 最大值
   *
   * @type {number}
   * @memberof IStepperProps
   */
  max?: number

  /**
   * 默认值
   *
   * @type {number}
   * @memberof IStepperProps
   */
  defaultValue?: number

  /**
   * 当前值
   *
   * @type {number}
   * @memberof IStepperProps
   */
  value?: number

  /**
   * 每次改变步数,可以为小数
   *
   * @type {number}
   * @memberof IStepperProps
   */
  step?: number

  /**
   * 变化时回调函数
   *
   * @memberof IStepperProps
   */
  onChange?: (value: number) => void

  /**
   * 是否禁用
   *
   * @memberof IStepperProps
   */
  disabled?: boolean
}

interface IStepperState {
  value: number
}

/**
 * @name 步进器
 */
@autobind
export default class MMStepper extends PureComponent<IStepperProps, IStepperState> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    min: -Infinity,
    max: Infinity,
    defaultValue: 0,
    step: 1,
    disabled: false
  }

  state: IStepperState = {
    value: this.props.defaultValue as number
  }

  public get value() {
    return this.props.value === undefined ? this.state.value : this.props.value
  }

  plus() {
    const value = plus(this.state.value, this.props.step as number)
    this.setNumber(value)
  }

  minus() {
    const value = minus(this.state.value, this.props.step as number)
    this.setNumber(value)
  }

  render() {
    const { min, max, disabled } = this.props
    const { value } = this.state
    return (
      <View className={classNames(styles.MMStepper, disabled ? styles.MMStepper_disabled : '')}>
        <View className={classNames(styles.MMStepper_reduce)} onClick={this.minus}>
          <MMIconFont size={8} color="#333" value={MMIconFontName.Lessen} />
        </View>
        <View className={styles.MMStepper_text}>
          <Input
            disabled={value === min || value === max || disabled}
            type={min !== undefined && min < 0 ? 'text' : 'number'}
            className={styles.MMStepper_input}
            value={value as any}
            onBlur={this.onInput}
          />
        </View>
        <View className={classNames(styles.MMStepper_plues)} onClick={this.plus}>
          <MMIconFont size={8} color="#333" value={MMIconFontName.Addition} />
        </View>
      </View>
    )
  }

  onInput(
    event: BaseEventOrig<{
      value: string
      cursor: number
      keyCode: number
    }>
  ) {
    const number = Number(event.detail.value)

    if (Number.isNaN(number)) {
      this.setNumber(this.state.value)
    } else {
      this.setNumber(number)
    }
  }

  private setNumber(value: number) {
    let newValue = value

    if (this.props.min !== undefined && newValue < this.props.min) {
      newValue = this.props.min
    }

    if (this.props.max !== undefined && newValue > this.props.max) {
      newValue = this.props.max
    }

    this.setState(
      {
        value: '' as any
      },
      () =>
        this.setState({
          value: newValue
        })
    )
    this.props.onChange && this.props.onChange(newValue)
  }
}
