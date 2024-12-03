import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { ScrollView, View } from '@tarojs/components'
import styles from './index.module.less'
import { IPartnerCenterProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { MMNavigationType } from '~/modules/@wmeimob/taro-design/src/components/navigation/const'
import classNames from 'classnames'
import BottomButton from '~/components/bottomButton'

const Component: FC<IPartnerCenterProps> = () => {
  // 是否正常
  const [isCommon, setIsCommon] = useState<boolean>(true)
  const [cashOrder, setcashOrder] = useState<any>([
    {
      id: 1,
      status: 1
    },
    {
      id: 2,
      status: 2
    },
    {
      id: 3,
      status: 3
    },
    {
      id: 4,
      status: 1
    },
    {
      id: 5,
      status: 2
    },
    {
      id: 6,
      status: 3
    }
  ])
  return (
    <View className={styles.partnerCenterStyle} style={{ backgroundSize: '100% 300px' }}>
      <MMNavigation title="城市合伙人中心" type={MMNavigationType.Transparent} />
      {isCommon === true ? (
        <View className={styles.inviteRule}>邀请规则</View>
      ) : (
        <View className={styles.disabledHint}>您的合伙人身份已被禁用，请联系管理员处理</View>
      )}
      <View className={styles.brokerageInfo}>
        <View className={styles.brokerage}>
          <View className={styles.brokerageAmount}>¥2478</View>
          <View className={styles.brokerageTitle}>当前佣金</View>
        </View>
        <View className={styles.cash} onClick={() => Taro.navigateTo({ url: '/pages/mine/withdraw/index' })}>
          马上提现
        </View>
      </View>
      <View className={styles.information}>
        <View className={styles.informationItem}>
          <View className={styles.informationCount}>8000</View>
          <View className={styles.informationTitle}>累计获得</View>
        </View>
        <View className={styles.divide} />
        <View className={styles.informationItem}>
          <View className={styles.informationCount}>8000</View>
          <View className={styles.informationTitle}>累计提现</View>
        </View>
        <View className={styles.divide} />
        <View className={styles.informationItem}>
          <View className={styles.informationCount}>8000</View>
          <View className={styles.informationTitle}>累计商户</View>
        </View>
      </View>
      <View className={styles.hint}>最近30天数据</View>
      <View className={styles.cashOrderList}>
        <ScrollView scrollY className={styles.sview}>
          {cashOrder &&
            cashOrder.length &&
            cashOrder.map((item) => {
              return (
                <View key={item.id} className={styles.cashOrder}>
                  <View className={styles.cashOrderTop}>
                    <View className={styles.cashOrderNo}>HL20211208222930123456</View>
                    <View className={classNames(styles.cashStatus, { 1: '', 2: styles.cancellation, 3: styles.intoAccount }[item.status])}>
                      {{ 1: '在途', 2: '作废', 3: '到账' }[item.status]}
                    </View>
                  </View>
                  <View className={styles.cashOrderInfo}>
                    <View className={styles.cashOrderItem}>应到：￥2.16</View>
                    <View className={styles.cashOrderItem}>订单总额：￥2.16</View>
                    <View className={styles.cashOrderItem}>店铺：淘玉阁</View>
                    <View className={styles.cashOrderItem}>实到：￥2.16</View>
                    <View className={styles.cashOrderItem}>日期：2021-12-08 22:29</View>
                  </View>
                </View>
              )
            })}
        </ScrollView>
      </View>
      <BottomButton title="邀请好友来开店" onClick={() => Taro.navigateTo({ url: '/pages/mine/makePartner/index' })} contentStyle={{ background: '#fff' }} />
    </View>
  )
}

const PartnerCenter = memo(Component)
export default PartnerCenter
