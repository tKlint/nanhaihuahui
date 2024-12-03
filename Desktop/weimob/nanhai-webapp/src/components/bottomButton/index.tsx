import Taro, { FC } from '@tarojs/taro'
import { memo } from 'react'
import { View, Text } from '@tarojs/components'
import { IBottomButtonProps } from './const'
import styles from './index.module.less'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'

const Component: FC<IBottomButtonProps> = (props) => {
  // const {} = props;
  return (
    <View style={{ width: '100%' }}>
      <View className={styles.siteButton} style={{ ...props.contentStyle }}>
        <View className={styles.siteCont} onClick={() => props.onClick()} style={{ ...props.contStyle }}>
          {props.title}
        </View>
      </View>
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const BottomButton = memo(Component)
export default BottomButton
