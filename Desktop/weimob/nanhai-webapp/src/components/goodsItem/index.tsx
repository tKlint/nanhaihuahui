import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { IGoodsItemProps } from './const'
import styles from './index.module.less'
import { routeNames } from '~/routes'

const Component: FC<IGoodsItemProps> = (props) => {
  // 使用解构处理deafultProps
  // const {} = props;
  const { goodsInfo = {} } = props
  function toDetail() {
    Taro.navigateTo({ url: `${routeNames.activityCommodityDetail}?goodsNo=${goodsInfo.goodsNo}` })
  }
  return (
    <View className={styles.goodsItemStyle} onClick={() => toDetail()}>
      <Image className={styles.goodsItemImg} src={goodsInfo.coverImgUrl} />
      <View className={styles.goodsItemInfo}>
        <View className={styles.goodsItemInfoName}>{goodsInfo.goodsName}</View>
        <View className={styles.goodsItemInfoPrice}>
          <View className={styles.goodsCurPrice}>¥{goodsInfo.salesPrice}</View>
          <View className={styles.goodsPrePrice}>¥{goodsInfo.minimumMarketPrice}</View>
          <View className={styles.goodsSaleCount}>{goodsInfo.totalSales}人付款</View>
        </View>
        {/* 收藏列表有店铺信息 支付成功相关推荐有 */}
        {/* Taro.navigateTo({ url: `${routeNames.shopShopDetail}?storeNo=${goodsInfo.storeNo}` }) */}
        {props.isShowShop && (
          <View className={styles.goodsShop} onClick={() => Taro.navigateTo({ url: routeNames.shopShopDetail, params: { storeNo: goodsInfo.storeNo } })}>
            <Image className={styles.goodsShopIcon} src={require('~/images/shopIcon.png')} />
            <View className={styles.shopName}>{goodsInfo.storeInfoName}</View>
            <Image className={styles.extra} src={require('~/images/tabberMine/extra.png')} />
          </View>
        )}
      </View>
    </View>
  )
}

const GoodsItem = memo(Component)
export default GoodsItem
