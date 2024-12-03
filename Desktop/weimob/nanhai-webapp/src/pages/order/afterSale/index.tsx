import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Image, Text } from '@tarojs/components'
import styles from './index.module.less'
import { IAfterSaleProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import MMStepper from '~/modules/@wmeimob/taro-design/src/components/stepper'

const Component: FC<IAfterSaleProps> = () => {
  return (
    <View className={styles.afterSaleStyle}>
      <MMNavigation title="售后" />
      <View className={styles.afterSale}>
        <View className={styles.afterSaleOrder}>
          <View className={styles.orderShop}>
            <Image className={styles.orderShopImg} src={require('~/images/icinfor_img.png')} />
            <View className={styles.orderShopName}>店铺名称</View>
            <View className={styles.concatShop}>联系商家</View>
          </View>
          <View className={styles.orderGood}>
            <Image className={styles.orderGoodImg} src={require('~/images/goodImg.png')} />
            <View className={styles.orderGoodInfo}>
              <View className={styles.orderGoodName}>商品名称商品名称商品名称商品名称商品名称...</View>
              <View className={styles.orderGoodSpec}>颜色：灰色 尺码：L</View>
              <View className={styles.orderGoodPc}>
                <View className={styles.orderGoodPrice}>数量：3</View>
                <MMStepper min={1} max={1000} step={1} />
              </View>
            </View>
          </View>
        </View>
        <View className={styles.afterSaleType} onClick={() => Taro.navigateTo({ url: '/pages/order/afterSaleDetail/index' })}>
          <View>
            <View className={styles.afterSaleTypeName}>仅退货</View>
            <View className={styles.afterSaleTypeHint}>没收到货与卖家协商无需退货只退款</View>
          </View>
          <Image className={styles.afterSaleTypeTo} src={require('~/images/moreIcon.png')} />
        </View>
        <View className={styles.afterSaleType} onClick={() => Taro.navigateTo({ url: '/pages/order/afterSaleDetail/index' })}>
          <View>
            <View className={styles.afterSaleTypeName}>退货退款</View>
            <View className={styles.afterSaleTypeHint}>已收到货，需要退还收到的货物</View>
          </View>
          <Image className={styles.afterSaleTypeTo} src={require('~/images/moreIcon.png')} />
        </View>
      </View>
    </View>
  )
}

const AfterSale = memo(Component)
export default AfterSale
