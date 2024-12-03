import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { IOpenGroupSuccessProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'

const Component: FC<IOpenGroupSuccessProps> = () => {
  return (
    <View className={styles.openGroupSuccessStyle}>
      {/* 插入拼团成功 */}
      <MMNavigation title="开团成功" />
      <View className={styles.openGroupSuccess}>
        <Image className={styles.openGroupSuccessImg} src={require('~/images/orders/successIcon.png')} />
        <View className={styles.openGroupSuccessHint}>
          {/* 您已成功加入队伍 */}
          {/* 拼团成功，请等待商家发货 */}
          拼团开启成功
        </View>
        <View className={styles.openGroupSuccessTime}>
          剩余<Text style={{ color: '#FD4F53' }}>18:02:36</Text>
        </View>
        <View className={styles.openGroupSuccessInvite}>邀请好友加入拼团</View>
        <View className={styles.openGroupSuccessHandle}>
          <View className={styles.openGroupSuccessBtn}>首页</View>
          <View className={styles.openGroupSuccessBtn}>查看订单</View>
        </View>
      </View>
    </View>
  )
}

const OpenGroupSuccess = memo(Component)
export default OpenGroupSuccess
