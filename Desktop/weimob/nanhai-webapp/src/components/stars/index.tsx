import Taro, { FC } from '@tarojs/taro'
import { memo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { IStarsProps } from './const'
import styles from './index.module.less'

const Component: FC<IStarsProps> = (props) => {
  // const {} = props;
  const stars = [0, 1, 2, 3, 4]
  return (
    <View className={styles.starsStyle} style={{ ...props.contentStyle }}>
      {stars.map((_ite, inde) => {
        return (
          <Image
            className={styles.evaluationGeneralStars}
            key={_ite}
            src={
              // eslint-disable-next-line no-nested-ternary
              (props.grade || 0) >= inde + 1
                ? require('~/images/star.png')
                : (props.grade || 0) >= inde + 0.5
                ? require('~/images/starHalf.png')
                : require('~/images/starEmpty.png')
            }
          />
        )
      })}
    </View>
  )
}

const Stars = memo(Component)
export default Stars
