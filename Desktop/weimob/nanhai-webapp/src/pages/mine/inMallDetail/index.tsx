import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, RichText } from '@tarojs/components'
import styles from './index.module.less'
import { IInMallDetailProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'

const Component: FC<IInMallDetailProps> = () => {
  return (
    <View className={styles.inMallDetailStyle}>
      <MMNavigation title="站内信" />
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
  )
}

const InMallDetail = memo(Component)
export default InMallDetail
