import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { ScrollView, View, Image, Input } from '@tarojs/components'
import styles from './index.module.less'
import { ISupportServiceProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import classNames from 'classnames'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'

const Component: FC<ISupportServiceProps> = () => {
  return (
    <View className={styles.supportServiceStyle}>
      {/* 店铺名称 */}
      <MMNavigation title="客服" />
      <View className={styles.supportService}>
        <ScrollView scrollY className={styles.sview}>
          <View className={styles.service}>
            <View className={styles.serviceMember}>
              <Image className={styles.memberImg} src={require('~/images/goodImg.png')} />
              <View className={styles.memberMessage}>您好</View>
            </View>
            <View className={classNames(styles.serviceMember, styles.client)}>
              <Image className={styles.memberImg} src={require('~/images/goodImg.png')} />
              <View className={styles.memberMessage}>我想问下你们家的蓝猫多少钱啊？</View>
            </View>
            <View className={styles.serviceMember}>
              <Image className={styles.memberImg} src={require('~/images/goodImg.png')} />
              <View className={styles.memberMessage}>您好</View>
            </View>
            <View className={styles.serviceMember}>
              <Image className={styles.memberImg} src={require('~/images/goodImg.png')} />
              <View className={styles.memberMessage}>您好</View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View className={styles.supportServiceHandle}>
        <Input className={styles.supportServiceInput} />
        <Image className={styles.sendIcon} src={require('~/images/send.png')} />
      </View>
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const SupportService = memo(Component)
export default SupportService
