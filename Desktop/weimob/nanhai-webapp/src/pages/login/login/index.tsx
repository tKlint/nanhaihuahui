import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Image, Button } from '@tarojs/components'
import styles from './index.module.less'
import { ILoginProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { api } from '~/request'
import { routeNames } from '~/routes'

const Component: FC<ILoginProps> = () => {
  // eslint-disable-next-line no-shadow
  async function savePhone(ev) {
    console.log(ev)
    const { code } = await Taro.login()
    if (ev.detail.errMsg === 'getPhoneNumber:ok') {
      try {
        Taro.removeStorageSync('token')
        const data = await api['/user/api/user/savePhone_POST']({
          ivStr: ev.detail.iv,
          encryptedData: ev.detail.encryptedData,
          code,
          userNo: Taro.getStorageSync('commonInfo').userNo || ''
        })
        console.log(data)
        const url = Taro.getStorageSync('loginToRedirect')
        if (url) {
          if (url === routeNames.tabberMine || url === routeNames.shopCart || url === routeNames.community) {
            Taro.switchTab({ url })
          } else {
            Taro.navigateTo({ url })
          }
        } else {
          Taro.switchTab({ url: routeNames.home })
        }
        Taro.removeStorageSync('loginToRedirect')
      } catch (error) {}
    }
  }

  async function onClick() {
    Taro.getUserProfile({
      desc: '获取你的昵称、头像、地区及性别',
      success: async (res) => {
        const putData = {
          headImg: res.userInfo.avatarUrl,
          ...res.userInfo
        }
      },
      fail: (ress) => {}
    })
  }

  return (
    <View className={styles.loginStyle}>
      <MMNavigation title="授权登录" />
      <Image className={styles.loginLogo} src={require('~/images/loginLogo.png')} />
      <Button openType="getPhoneNumber" onGetPhoneNumber={savePhone} className={styles.login}>
        微信手机号码一键登录
      </Button>
    </View>
  )
}

const Login = memo(Component)
export default Login
