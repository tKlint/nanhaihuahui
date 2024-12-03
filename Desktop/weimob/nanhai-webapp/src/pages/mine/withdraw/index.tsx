/* eslint-disable react/no-children-prop */
import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Input } from '@tarojs/components'
import styles from './index.module.less'
import { IWithdrawProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import MMPopup from '~/components/popup'
import { routeNames } from '~/routes'

const Component: FC<IWithdrawProps> = () => {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <View className={styles.withdrawStyle}>
      <MMNavigation title="提现" />
      <View className={styles.withdraw}>
        <View className={styles.withdrawWrap}>
          <View className={styles.withdrawExplain}>提现说明</View>
          <View className={styles.withdrawTitle}>可提现佣金</View>
          <View className={styles.withdrawAmount}>¥2478</View>
          <View className={styles.withdrawHandle}>
            <View className={styles.withdrawHandleLeft}>
              <View className={styles.withdrawHandleTitle}>提现佣金</View>
              <View style={{ display: 'flex', justifyContent: 'center' }}>
                ￥<Input value="100" className={styles.withdrawHandleLeftInput} />
              </View>
            </View>
            <View className={styles.withdrawHandleRight}>全部提现</View>
          </View>
        </View>
        <View className={styles.withdrawHint}>提现可能会产生手续费</View>
        <View className={styles.withdrawBtn}>提交申请</View>
        <View className={styles.withdrawRecord} onClick={() => Taro.navigateTo({ url: routeNames.mineWithdrawRecord })}>
          提现记录
        </View>
      </View>
      <MMPopup title="提示" visible={visible} onOk={() => setVisible(false)} okText="好的" children="您已经成功提交申请，请等待官方审核" footer={true} />
    </View>
  )
}

const Withdraw = memo(Component)
export default Withdraw
