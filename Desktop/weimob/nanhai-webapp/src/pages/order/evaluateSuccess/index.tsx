import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, Text, Textarea } from '@tarojs/components'
import { IEvaluateSuccessProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import classNames from 'classnames'

const Component: FC<IEvaluateSuccessProps> = () => {
  return (
    <View className={styles.evaluateSuccessStyle}>
      <MMNavigation title="评价" />
      <Image className={styles.evaluateSuccessImg} src={require('~/images/orders/successIcon.png')} />
      <View className={styles.evaluateSuccessHint}>评价成功</View>
      <View className={styles.evaluateSuccessHandle}>
        <View className={styles.evaluateSuccessBtn}>继续评价</View>
        <View className={classNames(styles.evaluateSuccessBtn, styles.evaluateSuccessBtnElse)}>返回订单</View>
      </View>
    </View>
  )
}

const EvaluateSuccess = memo(Component)
export default EvaluateSuccess
