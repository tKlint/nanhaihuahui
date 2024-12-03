import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Image, Text, ScrollView, RichText } from '@tarojs/components'
import styles from './index.module.less'
import { ICouponDetailProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import BottomButton from '~/components/bottomButton'

const Component: FC<ICouponDetailProps> = () => {
  const goodArr = [1, 2, 3, 4, 5, 6]

  function onSure() {}
  return (
    <View className={styles.couponDetailStyle}>
      <MMNavigation title="优惠券详情" />
      <View className={styles.couponDetail}>
        <View className={styles.couponInfo}>
          <View className={styles.couponInfoShop}>
            <Image className={styles.couponInfoShopIcon} src={require('~/images/icinfor_img.png')} />
            <View className={styles.couponInfoShopName}>店铺名称最多15个字符</View>
          </View>
          <View className={styles.couponCount}>¥50.00</View>
          <View className={styles.couponAstrict}>
            <View className={styles.couponCountTitle}>面值</View>
            <View className={styles.couponCondition}>满1000元可使用</View>
          </View>
        </View>
        <View className={styles.couponApply}>
          <View className={styles.couponApplyTop}>
            <View className={styles.couponApplyTitle}>适用商品</View>
            <View className={styles.couponApplyHandle}>
              <Text className={styles.couponApplyHandleTxt}>全部</Text>
              <Image className={styles.couponApplyExtra} src={require('~/images/moreIcon.png')} />
            </View>
          </View>
          <ScrollView enableFlex scrollX style={{ maxWidth: '100%', marginBottom: '15px' }}>
            <View className={styles.couponApplyImg}>
              {goodArr.map((item) => {
                return <Image key={item} className={styles.couponApplyImage} src={require('~/images/goodImg.png')} />
              })}
            </View>
          </ScrollView>
          <View className={styles.couponApplyProgress}>
            <View className={styles.couponApplyCurrentProgress} />
          </View>
        </View>

        <View className={styles.couponApply}>
          <View className={styles.couponApplyTop}>
            <View className={styles.couponApplyTitle}>适用商家</View>
            <View className={styles.couponApplyHandle}>
              <Text className={styles.couponApplyHandleTxt}>全部</Text>
              <Image className={styles.couponApplyExtra} src={require('~/images/moreIcon.png')} />
            </View>
          </View>
          <ScrollView enableFlex scrollX style={{ maxWidth: '100%', marginBottom: '15px' }}>
            <View className={styles.couponApplyImg}>
              {goodArr.map((item) => {
                return <Image key={item} className={styles.couponApplyImage} src={require('~/images/goodImg.png')} />
              })}
            </View>
          </ScrollView>
          <View className={styles.couponApplyProgress}>
            <View className={styles.couponApplyCurrentProgress} />
          </View>
        </View>

        <View className={styles.couponDateWrap}>
          <View className={styles.couponDateLabel}>开始时间</View>
          <View className={styles.couponDate}>2021-10-19 00:00:00</View>
          <View className={styles.couponDateLabel}>结束时间</View>
          <View className={styles.couponDate}>2021-10-19 00:00:00</View>
        </View>

        <View className={styles.couponRule}>
          <View className={styles.couponRuleTitle}>使用说明</View>
          <RichText
            style={{ color: '#999999' }}
            nodes="1.用户连续签到2天，获得2元无|门槛现金红包。
2.连续签到7天，获得20元满减现金红包，购买任意二手物品可享受满50减20优惠。
3.若用户有作弊行为(如同一用户使用多账号、多设备等行为)，则无法领取和使用红包。
4.领取的红包可在[我的] 一|我的红包] 列表查看。
5.红包领取后30天内有效，红包不可兑现现金。
6.活动期间，如发现通过非正常途径获得红包，转转有权利追回所得红包。
7.转转拥有在法律允许的范围内对本活动进行解释的权利。"
          />
        </View>
      </View>
      <BottomButton title="确定" onClick={() => onSure()} contentStyle={{ background: '#fff' }} />
    </View>
  )
}

const CouponDetail = memo(Component)
export default CouponDetail
