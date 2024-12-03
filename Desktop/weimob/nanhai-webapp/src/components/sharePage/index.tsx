import Taro, { FC } from '@tarojs/taro'
import { memo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { ISharePageProps } from './const'
import styles from './index.module.less'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import { MMModalAnimationType, MMModalJustifyContent } from '~/modules/@wmeimob/taro-design/src/components/modal/const'

const Component: FC<ISharePageProps> = (props) => {
  // const {} = props;

  return (
    <MMModal justifyContent={MMModalJustifyContent.flexEnd} animationType={MMModalAnimationType.down} visible={props.visible}>
      <View className={styles.sharePageStyle}>
        <View className={styles.shareHandleTitle}>分享</View>
        <View className={styles.shareWrap}>
          <View className={styles.shareWx}>
            <Image className={styles.shareWxImg} src={require('~/images/city/shareWx.png')} />
            <Text className={styles.shareWxTxt}>微信好友</Text>
          </View>
          <View className={styles.shareWx}>
            <Image className={styles.shareWxImg} src={require('~/images/community/sharePoster.png')} />
            <Text className={styles.shareWxTxt}>保存图片</Text>
          </View>
        </View>
        <Image src={require('~/images/close.png')} className={styles.close} onClick={() => props.onClose} />
      </View>
    </MMModal>
  )
}

const SharePage = memo(Component)
export default SharePage
