import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Image, Text } from '@tarojs/components'
import styles from './index.module.less'
import { ILogisticsProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import OrderAddress from '~/components/orderAddress'

const Component: FC<ILogisticsProps> = () => {
  return (
    <View className={styles.logisticsStyle}>
      <MMNavigation title="物流详情" />
      <View className={styles.logisticsGood}>
        <View className={styles.goodName}>商品名称商品名称商品名称</View>
        <View className={styles.goodsku}>SKU2017122215030005927</View>
        <View className={styles.goodCount}>共 1 件商品</View>
        <View className={styles.express}>
          <View className={styles.expressInfo}>快递</View>
          <View className={styles.expressInfo} style={{ marginTop: '5px' }}>
            124445555555
          </View>
        </View>
      </View>
      <OrderAddress />
      <View className={styles.logisticsHistory}>
        <View className={styles.logisticsStatus}>派送中</View>
        <View className={styles.logisticsRecord}>
          <View className={styles.logisticsTime}>
            <Image className={styles.logisticsIcon} src={require('~/images/orders/logisticsIcon.png')} />
            <Text className={styles.logisticsTxt}>2021-03-14 12:00:00</Text>
          </View>
          <View className={styles.logisticsHint}>江苏泗阳县公司:进行揽件扫描</View>
        </View>
      </View>
    </View>
  )
}

const Logistics = memo(Component)
export default Logistics
