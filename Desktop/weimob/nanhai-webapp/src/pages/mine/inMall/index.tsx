import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { IInMallProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'

const Component: FC<IInMallProps> = () => {
  return (
    <View className={styles.inMallStyle}>
      <MMNavigation title="站内信" />
      <View className={styles.inMall}>
        {/* 背景图 */}
        <View className={styles.inMallItem} style={{ background: '#ccc' }}>
          <View className={styles.inMallTitle}>标题标题标题，最多两行文字，超出省略标题标题标题，最多两行文字，超出省略</View>
        </View>
      </View>
    </View>
  )
}

const InMall = memo(Component)
export default InMall
