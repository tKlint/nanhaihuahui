/* eslint-disable react/no-children-prop */
import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, Text, ScrollView, RichText, Input } from '@tarojs/components'
import { IBusinessIndexProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import MMPopup from '~/components/popup'

const Component: FC<IBusinessIndexProps> = () => {
  const [visible, setVisible] = useState<boolean>(false)
  function onClose() {}
  function onOk() {}
  return (
    <View className={styles.businessIndexStyle}>
      <MMNavigation title="商家中心" />
      <View className={styles.businessIndex}>
        <RichText
          nodes="1.用户连续签到2天，获得2元无|门槛现金红包。
2.连续签到7天，获得20元满减现金红包，购买任意二手物品可享受满50减20优惠。
3.若用户有作弊行为(如同一用户使用多账号、多设备等行为)，则无法领取和使用红包。
4.领取的红包可在[我的] 一|我的红包] 列表查看。
5.红包领取后30天内有效，红包不可兑现现金。
6.活动期间，如发现通过非正常途径获得红包，转转有权利追回所得红包。
7.转转拥有在法律允许的范围内对本活动进行解释的权利。"
        />
      </View>
      <View className={styles.businessBottom}>
        {/* 未开通 弹框提示 visible为true */}
        <View className={styles.businessOpen}>立即开通</View>
        <View className={styles.businessHint}>我已经开通商家中心</View>
        <View className={styles.businessLogin}>立即登录</View>
      </View>
      {isNewIphone && <View className="spacingIphone" />}

      <MMPopup
        title="提示"
        visible={visible}
        onClose={() => setVisible(false)}
        onOk={() => Taro.navigateTo({ url: '/pages/business/openBusiness/index' })}
        cancelText="我再看看"
        okText="立即开通"
        children="您还未开通商家中心，可先提交信息开通商家中心"
        footer={true}
      />
    </View>
  )
}

const BusinessIndex = memo(Component)
export default BusinessIndex
