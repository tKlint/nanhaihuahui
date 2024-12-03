import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Image } from '@tarojs/components'
import styles from './index.module.less'
import { ISettingProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'

const Component: FC<ISettingProps> = () => {
  const setTabs = [
    {
      id: 1,
      title: '账户信息',
      url: '/pages/mine/accountInfo/index'
    },
    {
      id: 2,
      title: '收货地址',
      url: '/pages/mine/site/index'
    },
    {
      id: 3,
      title: '意见反馈',
      url: '/pages/mine/feedback/index'
    }
  ]
  return (
    <View className={styles.settingStyle}>
      <MMNavigation title="设置" />
      {setTabs.map((item) => {
        return (
          <View key={item.id} className={styles.setting} onClick={() => Taro.navigateTo({ url: item.url })}>
            <View className={styles.settingTitle}>{item.title}</View>
            <Image className={styles.settingImg} src={require('~/images/tabberMine/extra.png')} />
          </View>
        )
      })}
    </View>
  )
}

const Setting = memo(Component)
export default Setting
