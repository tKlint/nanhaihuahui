import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { IDefaultPageProps } from './const'
import styles from './index.module.less'

const Component: FC<IDefaultPageProps> = (props) => {
  // const { } = props;

  return (
    <View className={styles.defaultPageStyle}>
      <Image
        className={styles.defaultPageImg}
        src={props.imgSrc}
        style={{ width: props.imgHeight || '160px', height: props.imgHeight || '160px', marginTop: props.imgTop || '150px' }}
      />
      <View className={styles.defaultPageHint} style={{ color: props.defaultHintColor || '#999' }}>
        {props.defaultHint}
      </View>
    </View>
  )
}

const DefaultPage = memo(Component)
export default DefaultPage
