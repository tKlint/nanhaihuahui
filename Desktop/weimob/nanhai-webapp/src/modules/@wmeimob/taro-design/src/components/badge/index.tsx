import { useMemo }  from 'react'
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import cns from './index.modules.less';

interface IProps {
  /**
   * 值
   *
   * @type {number}
   * @memberof IButtonProps
   */
  value?: number | string

  /**
   * 位数
   *
   * @type {number}
   * @memberof IButtonProps
   */
  digit?: number

  /**
   * 绝对定位
   *
   * @type {boolean}
   * @memberof IButtonProps
   */
  absolute?: boolean
}

/**
 * @name 徽章
 */
const MMBadge =  ({
   value,
  digit,
  absolute
}: IProps) => {

  const retValue = useMemo(() => {
    if (typeof value === 'number' && digit) {
      const max = 10 ** digit - 1
      return value > max ? max + '+' : value
    }
    return value
  }, [value, digit])

  return <View className={absolute ? cns.MMBadgeAbsolute : ''}>
    <View className={classnames(cns.MMBadge, value !== void 0 && cns.MMBadgeNumber)}>
      <Text>{retValue === void 0 ? 0 : value}</Text>
    </View>
  </View>

}
export default MMBadge;