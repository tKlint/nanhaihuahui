import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Text, Image, Input } from '@tarojs/components'
import { IBusinessLoginProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import useInput from '~/components/hooks/useInput'

const Component: FC<IBusinessLoginProps> = () => {
  const businessPhone = useInput()
  const businessCode = useInput()
  return (
    <View className={styles.businessLoginStyle}>
      <MMNavigation title="登录商家中心" />
      <Image className={styles.businessLoginLogo} src={require('~/images/business/logo.png')} />
      <View className={styles.businessLoginInputWrap}>
        <Input
          className={styles.businessLoginInput}
          value={businessPhone.value}
          onInput={businessPhone.onInput}
          placeholder="请输入手机号码 "
          placeholderStyle="color:#ABABAB;line-height:20px"
        />
      </View>
      <View className={styles.hint}>您申请开通商家中心预留的联系方式</View>
      <View className={styles.businessLoginInputWrap}>
        <Input
          className={styles.businessLoginInput}
          value={businessCode.value}
          onInput={businessCode.onInput}
          placeholder="请输入手机号码 "
          placeholderStyle="color:#ABABAB;line-height:20px"
        />
        <View className={styles.businessLoginInputHint}>获取验证码</View>
      </View>
      <View className={styles.businessLogin}>提交</View>
    </View>
  )
}

const BusinessLogin = memo(Component)
export default BusinessLogin
