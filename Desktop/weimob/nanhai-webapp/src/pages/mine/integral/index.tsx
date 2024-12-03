import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { ScrollView, View } from '@tarojs/components'
import styles from './index.module.less'
import { IIntegralProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { MMNavigationType } from '~/modules/@wmeimob/taro-design/src/components/navigation/const'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'

const Component: FC<IIntegralProps> = () => {
  const [currentIntegral, setCurrentIntegral] = useState<number>(111)
  const [integralArr, setIntegralArr] = useState<any>([
    { id: 1, type: 1, gmTime: '2021-09-21 12:00:00', count: 122 },
    { id: 1, type: 1, gmTime: '2021-09-21 12:00:00', count: 122 },
    { id: 1, type: 1, gmTime: '2021-09-21 12:00:00', count: 122 },
    { id: 1, type: 1, gmTime: '2021-09-21 12:00:00', count: 122 }
  ])
  return (
    <View className={styles.integralStyle} style={{ backgroundSize: '100% 240px' }}>
      {/* customStyle={{ backgroundColor: 'transparent' }} */}
      <MMNavigation title="积分" type={MMNavigationType.Transparent} />
      <View className={styles.integralRule}>积分说明</View>
      <View className={styles.integralCount}>{currentIntegral}</View>
      <View className={styles.integralTitle}>当前积分</View>
      <View className={styles.integralWrap}>
        <ScrollView scrollY className={styles.sview}>
          <View className={styles.integralList}>
            {integralArr.map((item) => {
              return (
                <View key={item.id} className={styles.integralItem}>
                  <View className={styles.integralItemLeft}>
                    <View className={styles.integralItemTitle}>{{ 1: '签到' }[item.type]}</View>
                    <View className={styles.integralItemTime}>{item.gmTime}</View>
                  </View>
                  <View className={styles.integralCountChange}>+{item.count}</View>
                </View>
              )
            })}
          </View>
        </ScrollView>
      </View>

      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const Integral = memo(Component)
export default Integral
