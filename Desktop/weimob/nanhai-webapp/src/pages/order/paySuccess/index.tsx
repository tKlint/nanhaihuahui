import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { IPaySuccessProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import GoodsItem from '~/components/goodsItem'

const Component: FC<IPaySuccessProps> = () => {
  return (
    <View className={styles.paySuccessStyle}>
      <MMNavigation title="支付结果" />
      <View className={styles.paySuccess}>
        <Image className={styles.paySuccessImg} src={require('~/images/orders/successIcon.png')} />
        <View className={styles.paySuccessHint}>支付成功</View>
        <View className={styles.paySuccessHandle}>
          <View className={styles.paySuccessBtn}>首页</View>
          <View className={styles.paySuccessBtn}>查看订单</View>
        </View>
        <View className={styles.moreTitle}>相关推荐</View>
        <View className={styles.moreWrap}>
          <GoodsItem isShowShop={true} />
          <GoodsItem isShowShop={true} />
          <GoodsItem isShowShop={true} />
          <GoodsItem isShowShop={true} />
          <GoodsItem isShowShop={true} />
          <GoodsItem isShowShop={true} />
        </View>
      </View>
    </View>
  )
}

const PaySuccess = memo(Component)
export default PaySuccess
