import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { ICouponProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import DefaultPage from '~/components/defaultPage'
import Tabber from '~/components/tabber'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'

const Component: FC<ICouponProps> = () => {
  const [couponData, setCouponData] = useState<any>([1, 2, 3, 4, 5])
  const [tabIndex, setTabIndex] = useState<number>(0)
  const tabArr = [
    {
      id: 0,
      title: '未使用'
    },
    {
      id: 1,
      title: '已使用'
    },
    {
      id: 2,
      title: '已失效'
    }
  ]
  return (
    <View className={styles.couponStyle}>
      <MMNavigation title="我的优惠券" />
      <Tabber tabIndex={tabIndex} setTabIndex={setTabIndex} tabArr={tabArr} titleColor="#333" />
      {couponData && couponData.length > 0 && (
        <View className={styles.content}>
          <ScrollView scrollY className={styles.sview}>
            {tabIndex === 0 && (
              <View className={styles.couponWrap}>
                {couponData.map((item) => {
                  return (
                    <View key={item} className={styles.couponShop}>
                      <View className={styles.shopInfo}>
                        <Image className={styles.shopIcon} src={require('~/images/icinfor_img.png')} />

                        <View className={styles.shopName}>店铺名称最多15个字符</View>
                      </View>
                      <View
                        className={styles.couponItem}
                        onClick={() => Taro.navigateTo({ url: '/pages/mine/couponDetail/index' })}
                        style={{ background: `url(${require('~/images/couponBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}
                      >
                        <View className={styles.couponType}>
                          <View className={styles.couponPrice}>¥10</View>
                          <View className={styles.couponTypeName}>满减券</View>
                        </View>
                        <View className={styles.couponInfo}>
                          <View className={styles.couponName}>优惠券名称</View>
                          <View className={styles.couponCondition}>满200元减30元</View>
                          <View className={styles.couponTime}>2021.01.21 ~2021.05.21</View>
                        </View>
                      </View>
                      <View
                        className={styles.couponItem}
                        style={{ background: `url(${require('~/images/couponBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}
                      >
                        <View className={styles.couponType}>
                          <View className={styles.couponPrice}>¥10</View>
                          <View className={styles.couponTypeName}>满减券</View>
                        </View>
                        <View className={styles.couponInfo}>
                          <View className={styles.couponName}>优惠券名称</View>
                          <View className={styles.couponCondition}>满200元减30元</View>
                          <View className={styles.couponTime}>2021.01.21 ~2021.05.21</View>
                        </View>
                      </View>
                    </View>
                  )
                })}
              </View>
            )}
            {tabIndex !== 0 && (
              <View className={styles.couponWrap}>
                {couponData.map((item) => {
                  return (
                    <View key={item} className={styles.couponShop}>
                      <View
                        className={styles.couponItem}
                        style={{ background: `url(${require('~/images/couponBgHistory.png')}) no-repeat`, backgroundSize: '100% 100%', opacity: '0.6' }}
                      >
                        <View className={styles.couponType}>
                          <View className={styles.couponPrice}>¥10</View>
                          <View className={styles.couponTypeName}>满减券</View>
                        </View>
                        <View className={styles.couponInfo}>
                          <View className={styles.couponName}>优惠券名称</View>
                          <View className={styles.couponCondition}>满200元减30元</View>
                          <View className={styles.couponTime}>2021.01.21 ~2021.05.21</View>
                        </View>
                      </View>
                    </View>
                  )
                })}
              </View>
            )}
            {isNewIphone && <View className="spacingIphone" />}
          </ScrollView>
        </View>
      )}

      {couponData && !couponData.length && <DefaultPage defaultHint="暂无优惠券" imgSrc={require('~/images/noCoupon.png')} />}
    </View>
  )
}

const Coupon = memo(Component)
export default Coupon
