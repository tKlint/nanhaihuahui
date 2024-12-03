import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Textarea } from '@tarojs/components'
import { IApplyForLiveProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import classNames from 'classnames'
import useInput from '~/components/hooks/useInput'

const Component: FC<IApplyForLiveProps> = () => {
  const applyHook = useInput()
  return (
    <View className={styles.applyForLiveStyle}>
      <MMNavigation title="申请开通直播" />
      <View className={styles.applyForLiveWrap}>
        <View className={styles.applyForLive}>
          <View className={styles.applyForLiveItem}>
            <View className={styles.applyForLiveItemLabel}>店铺名称：</View>
            <View className={styles.applyForLiveItemCont}>宠物专卖店</View>
          </View>
          <View className={styles.applyForLiveItem}>
            <View className={styles.applyForLiveItemLabel}>商家名称：</View>
            <View className={styles.applyForLiveItemCont}>上海萌宠有限公司</View>
          </View>
          <View className={styles.applyForLiveItem} style={{ display: 'block' }}>
            <View className={styles.applyForLiveItemLabel}>申请理由：</View>
            <Textarea
              value={applyHook.value}
              onInput={applyHook.onInput}
              placeholder="您可以从多个角度对宝贝进行评价"
              placeholderStyle="color:#999"
              className={styles.applyForLiveItemTextArea}
            />
            <View className={styles.applyForLiveItemHint}>最多支持500字符</View>
          </View>
        </View>
      </View>
      <View className={styles.applyForLiveHandle}>
        <View className={styles.applyForLiveBtn} onClick={() => Taro.navigateBack()}>
          取消
        </View>
        <View className={classNames(styles.applyForLiveBtn, styles.applyForLiveBtnElse)}>确认</View>
      </View>
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const ApplyForLive = memo(Component)
export default ApplyForLive
