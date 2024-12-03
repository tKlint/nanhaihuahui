import Taro, { FC } from '@tarojs/taro'
import { memo } from 'react'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { IShopCouponProps } from './const'
import styles from './index.module.less'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import { MMModalJustifyContent, MMModalAnimationType } from '~/modules/@wmeimob/taro-design/src/components/modal/const'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import BottomButton from '~/components/bottomButton'

const Component: FC<IShopCouponProps> = (props) => {
  // const {} = props;
  const { couponFlag, allCoupon = [] } = props
  return (
    <MMModal visible={couponFlag} justifyContent={MMModalJustifyContent.flexEnd} animationType={MMModalAnimationType.down} onClose={props.onClose}>
      <View className={styles.checkListWrap}>
        <View className={styles.checkListTitle}>
          优惠券
          {/* <Image className={styles.checkClose} onClick={() => props.onClose} src={require('~/images/close.png')} /> */}
        </View>
        {allCoupon && allCoupon.length > 0 && (
          <ScrollView enableFlex scrollY style={{ maxHeight: '450px' }}>
            {allCoupon.map((item) => {
              return (
                <View
                  key={item.id}
                  className={styles.couponItem}
                  style={{ background: `url(${require('~/images/couponBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}
                >
                  <View className={styles.couponType}>
                    <View className={styles.couponPrice}>¥{item.price}</View>
                    <View className={styles.couponTypeName}>{{ 0: '满减', 1: '满折' }[item.couponType] || ''}券</View>
                  </View>
                  <View className={styles.couponInfo}>
                    <View className={styles.couponName}>{item.name}</View>
                    <View className={styles.couponTime}>
                      {item.usePeriod === 0 ? item.termStart + '~' + item.termEnd : '有效天数' + item.expDayCount + '天'}{' '}
                    </View>
                  </View>
                  <View className={item.userReceiveStatus === 0 ? styles.draw : styles.drawed} onClick={() => props.draw(item, item.userReceiveStatus === 0)}>
                    {{ 0: '领取', 1: '已领取', 2: '已抢完' }[item.userReceiveStatus]}
                  </View>
                </View>
              )
            })}

            {/* <View className={styles.couponItem} style={{ background: `url(${require('~/images/couponBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}>
            <View className={styles.couponType}>
              <View className={styles.couponPrice}>¥10</View>
              <View className={styles.couponTypeName}>满减券</View>
            </View>
            <View className={styles.couponInfo}>
              <View className={styles.couponName}>优惠券名称</View>
              <View className={styles.couponTime}>2021.01.21 ~2021.05.21</View>
            </View>
            <View className={styles.drawed}>已领取</View>
          </View> */}
          </ScrollView>
        )}
        <BottomButton title="关闭" onClick={() => props.onClose} />
        {isNewIphone && <View className="spacingIphone" />}
      </View>
    </MMModal>
  )
}

const ShopCoupon = memo(Component)
export default ShopCoupon
