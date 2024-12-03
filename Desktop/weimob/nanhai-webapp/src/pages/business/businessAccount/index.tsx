import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { IBusinessAccountProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'

const Component: FC<IBusinessAccountProps> = () => {
  const [accountInfo, setAccountInfo] = useState<any>({
    loginUrl: 'https://crmv2test.ihotwind.cn/login.html',
    username: 'admin',
    pwd: '123455'
  })
  function fuzhi(Data) {
    Taro.setClipboardData({
      data: Data,
      success(res) {
        return Taro.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
  return (
    <View className={styles.businessAccountStyle}>
      <MMNavigation title="账户密码" />
      <View className={styles.businessAccount}>
        <View className={styles.accountLabel}>登录地址：</View>
        <View className={styles.accountLink}>
          <View className={styles.link}>{accountInfo.loginUrl}</View>
          <View className={styles.copy} onClick={() => fuzhi(accountInfo.loginUrl)}>
            复制
          </View>
        </View>
        <View className={styles.linkHint}>复制地址，请在电脑上打开，建议使用谷歌浏览器</View>
        <View className={styles.accountLabel}>登录用户名：</View>
        <View className={styles.accountCont}>{accountInfo.username}</View>
        <View className={styles.accountLabel}>密码：</View>
        <View className={styles.accountCont} style={{ marginBottom: '0' }}>
          {accountInfo.pwd}
        </View>
      </View>
    </View>
  )
}

const BusinessAccount = memo(Component)
export default BusinessAccount
