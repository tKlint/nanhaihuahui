import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { ScrollView, View } from '@tarojs/components'
import styles from './index.module.less'
import { IRebateOrderProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { IMMDropDownDataType } from '~/modules/@wmeimob/taro-design/src/components/drop-down/types'
import IconFontName from '~/modules/@wmeimob/taro-design/src/components/icon-font/name'
import MMDropDown from '~/modules/@wmeimob/taro-design/src/components/drop-down'
import classNames from 'classnames'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'

const Component: FC<IRebateOrderProps> = () => {
  const [cashOrder, setcashOrder] = useState<any>([
    {
      id: 1,
      status: 1
    },
    {
      id: 2,
      status: 2
    },
    {
      id: 3,
      status: 3
    },
    {
      id: 4,
      status: 1
    },
    {
      id: 5,
      status: 2
    },
    {
      id: 6,
      status: 3
    }
  ])
  const data = [
    {
      id: '1',
      type: IMMDropDownDataType.Select,
      data: ['不限', '50万以下', '50-80万', '80-100万', '100-120万'],
      iconfont: IconFontName.Down,
      value: '全部商家'
    },
    {
      id: '2',
      type: IMMDropDownDataType.Select,
      data: ['不限', '红色', '蓝色'],
      iconfont: IconFontName.Down,
      value: '返佣状态'
    },
    {
      id: '3',
      type: IMMDropDownDataType.Single,
      value: '日期'
    }
  ] as any
  const value = 1 as any
  function funChange() {}
  return (
    <View className={styles.rebateOrderStyle}>
      <MMNavigation title="订单记录" />
      <MMDropDown onChange={() => funChange()} value={value} data={data} />
      <View className={styles.cashOrderList}>
        <ScrollView scrollY className={styles.sview}>
          {cashOrder &&
            cashOrder.length &&
            cashOrder.map((item) => {
              return (
                <View key={item.id} className={styles.cashOrder}>
                  <View className={styles.cashOrderTop}>
                    <View className={styles.cashOrderNo}>HL20211208222930123456</View>
                    <View className={classNames(styles.cashStatus, { 1: '', 2: styles.cancellation, 3: styles.intoAccount }[item.status])}>
                      {{ 1: '在途', 2: '作废', 3: '到账' }[item.status]}
                    </View>
                  </View>
                  <View className={styles.cashOrderInfo}>
                    <View className={styles.cashOrderItem}>应到：￥2.16</View>
                    <View className={styles.cashOrderItem}>订单总额：￥2.16</View>
                    <View className={styles.cashOrderItem}>店铺：淘玉阁</View>
                    <View className={styles.cashOrderItem}>实到：￥2.16</View>
                    <View className={styles.cashOrderItem}>日期：2021-12-08 22:29</View>
                  </View>
                </View>
              )
            })}
        </ScrollView>
      </View>
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const RebateOrder = memo(Component)
export default RebateOrder
