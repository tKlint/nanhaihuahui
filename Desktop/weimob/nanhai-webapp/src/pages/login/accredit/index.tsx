import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Image, Button } from '@tarojs/components'
import styles from './index.module.less'
import { IAccreditProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { api } from '~/request'
import { setGlobalData } from '~/GlobalData'
import { routeNames } from '~/routes'

const Component: FC<IAccreditProps> = () => {
  async function onClick() {
    Taro.getUserProfile({
      desc: '获取你的昵称、头像、地区及性别',
      success: async (res) => {
        const { code } = await Taro.login()
        const putData = {
          headImg: res.userInfo.avatarUrl,
          name: res.userInfo.nickName,
          code
        }
        const { data = {} } = await api['/user/api/auth/miniLogin_POST']({ ...putData })
        Taro.setStorageSync('token', data.token)
        Taro.setStorageSync('commonInfo', data.user)
        setGlobalData({ commonInfo: data.user })

        Taro.navigateTo({ url: routeNames.loginLogin })
      },
      fail: (ress) => {}
    })
  }
  return (
    <View className={styles.loginStyle}>
      <MMNavigation title="授权登录" />
      <Image className={styles.loginLogo} src={require('~/images/loginLogo.png')} />
      <View className={styles.login} onClick={() => onClick()}>
        授权登录
      </View>
    </View>
  )
}

const Accredit = memo(Component)
export default Accredit
