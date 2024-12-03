import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { IOrderAddressProps } from './const'
import styles from './index.module.less'

const Component: FC<IOrderAddressProps> = (props) => {
  // 使用解构处理deafultProps
  const { addressInfo = {} } = props

  return (
    <View className={styles.orderAddress}>
      <Image className={styles.orderAddressImg} src={require('~/images/orders/address.png')} />
      <View className={styles.orderAddressInfo}>
        <View className={styles.orderAddressName}>
          <Text>{addressInfo.receiverName}</Text>
          <Text style={{ marginLeft: '24px' }}>{addressInfo.receiverMobile}</Text>
        </View>
        <View className={styles.orderAddressSite}>
          {addressInfo.receiverProvince} {addressInfo.receiverCity} {addressInfo.receiverArea} {addressInfo.receiverAddress}
        </View>
      </View>
      {props.isShowExtra && <Image className={styles.orderAddressExtra} src={require('~/images/moreIcon.png')} />}
    </View>
  )
}

const OrderAddress = memo(Component)
export default OrderAddress
