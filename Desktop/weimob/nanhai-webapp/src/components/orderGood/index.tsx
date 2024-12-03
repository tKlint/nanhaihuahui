import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { IOrderGoodProps } from './const'
import styles from './index.module.less'

const Component: FC<IOrderGoodProps> = (props) => {
  // 使用解构处理deafultProps
  // const {} = props;
  const { isHidePrice = false, goodsInfo = {} } = props

  return (
    <View className={styles.orderGood}>
      <Image className={styles.orderGoodImg} src={goodsInfo.skuImgUrl} />
      <View className={styles.orderGoodInfo}>
        <View className={styles.orderGoodName}>{goodsInfo.goodsName}</View>
        <View className={styles.orderGoodSpec}>{goodsInfo.skuName}</View>
        <View className={styles.orderGoodPc} style={{ justifyContent: isHidePrice ? 'flex-end' : 'space-between' }}>
          {!isHidePrice && <View className={styles.orderGoodPrice}>¥{goodsInfo.skuSalesPrice}</View>}
          <View className={styles.orderGoodCount}>x{goodsInfo.saleQuantity}</View>
        </View>
      </View>
    </View>
  )
}

const OrderGood = memo(Component)
export default OrderGood
