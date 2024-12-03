import Taro, { FC } from '@tarojs/taro'
import { memo } from 'react'
import { View, Text, ScrollView, Swiper, SwiperItem, Image } from '@tarojs/components'
import { IShopIndexProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'
import GoodsItem from '~/components/goodsItem'
import { routeNames } from '~/routes'

const Component: FC<IShopIndexProps> = (props) => {
  const { noticeList = [], shopDetail = {}, bannerList = [], couponList = [], goodsList = [] } = props

  return (
    <View className={styles.shopWrap}>
      <ScrollView scrollY className={styles.sview}>
        <View className={styles.notice} onClick={() => Taro.navigateTo({ url: routeNames.shopShopNotice + '?storeNo=' + shopDetail.storeNo })}>
          <Image className={styles.noticeIcon} src={require('~/images/shop/notice.png')} />
          <View className={styles.noticeTxt}>
            公告：
            <Swiper vertical={true} autoplay={true} style={{ width: '70%', height: '100%' }}>
              {noticeList.map((item) => {
                return (
                  <SwiperItem style={{ width: '100%', height: '100%' }} key={item.id}>
                    {item.title}
                  </SwiperItem>
                )
              })}
            </Swiper>
          </View>
        </View>
        {bannerList && bannerList.length > 0 && (
          <Swiper autoplay={true} style={{ marginBottom: '10px' }}>
            {bannerList.map((item) => {
              return (
                <SwiperItem key={item.id}>
                  <View className={styles.shopAd} style={{ background: `url(${item.pic}) no-repeat`, backgroundSize: '100% 100%' }} />
                </SwiperItem>
              )
            })}
          </Swiper>
        )}

        {couponList && couponList.length > 0 && (
          <View className={styles.shopCoupon}>
            <View className={styles.shopCouponTop}>
              <Image className={styles.shopCouponTopImg} src={require('~/images/tabberMine/titleIcon.png')} />
              <View className={styles.shopCouponTopTitle}>优惠券</View>
              <View className={styles.shopCouponTopExtra} onClick={() => props.getAllCoupon()}>
                更多
                <Image className={styles.extra} src={require('~/images/tabberMine/extra.png')} />
              </View>
            </View>
            <View className={styles.shopCouponList}>
              {couponList.map((item) => {
                return (
                  <View key={item.id} className={styles.coupon}>
                    <View
                      className={styles.couponInfo}
                      style={{ background: `url(${require('~/images/shop/couponBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}
                    >
                      <View className={styles.couponAmount}>
                        <Text style={{ fontSize: '14px' }}>¥</Text> {item.price}
                      </View>
                      <View className={styles.couponType}>优惠券</View>
                      <View className={styles.couponCondition}>{item.fullAmount}</View>
                    </View>
                    <View
                      className={classNames(styles.couponDraw, item.allowReceive === 1 ? '' : styles.drawSuccess)}
                      onClick={() => props.drawCoupon(item, item.allowReceive === 1)}
                    >
                      {item.allowReceive === 1 ? '立即领取' : '领取成功'}
                    </View>
                  </View>
                )
              })}
            </View>
          </View>
        )}
        {goodsList && goodsList.length > 0 && (
          <View className={styles.recommend}>
            <View className={styles.shopCouponTop}>
              <Image className={styles.shopCouponTopImg} src={require('~/images/tabberMine/titleIcon.png')} />
              <View className={styles.shopCouponTopTitle}>商家推荐</View>
            </View>

            <View className={styles.recommendGood}>
              {goodsList.map((item, index) => {
                return index < 6 && <GoodsItem goodsInfo={item} key={index} />
              })}
            </View>
            <View className={styles.toAllHint} onClick={() => props.getAllGoods()}>
              查看全部商品
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const ShopIndex = memo(Component)
export default ShopIndex
