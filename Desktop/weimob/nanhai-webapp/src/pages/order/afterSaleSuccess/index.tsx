import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Image } from '@tarojs/components'
import styles from './index.module.less'
import { IAfterSaleSuccessProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'

const Component: FC<IAfterSaleSuccessProps> = () => {
  return (
    <View className={styles.afterSaleSuccessStyle}>
      <MMNavigation title="退货退款" />
      <View className={styles.afterSaleSuccess}>
        <Image className={styles.afterSaleSuccessImg} src={require('~/images/orders/successIcon.png')} />
        <View className={styles.afterSaleSuccessHint}>提交成功</View>
        <View className={styles.afterSaleSuccessBtn}>查看订单</View>
      </View>
    </View>
  )
}

const AfterSaleSuccess = memo(Component)
export default AfterSaleSuccess
