import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Image, Input, Text } from '@tarojs/components'
import styles from './index.module.less'
import { IAccountInfoProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import { MMModalAnimationType, MMModalJustifyContent } from '~/modules/@wmeimob/taro-design/src/components/modal/const'
import Pup from './components/pup'
import MMPopup from '~/components/popup'
import useInput from '~/components/hooks/useInput'
import { getGlobalData } from '~/GlobalData'
import { User } from '~/request/data-contracts'
import { api } from '~/request'

const Component: FC<IAccountInfoProps> = () => {
  const [userInfo, setUserInfo] = useState<User>({})
  const [currentSex, setCurrentSex] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)
  const [sexFlag, setSexFlag] = useState<boolean>(false)
  const [ispup, setispup] = useState<boolean>(false)
  const nameHook = useInput()


  async function getUserInfo() {
    const { data = {} } = await api["/user/api/setting/getUserAccountInformation_GET"]();
    console.log(data);
  }

  useEffect(() => {
    const user = Taro.getStorageSync('userInfo') || {}
    setUserInfo(user)
    getUserInfo();
    nameHook.setValue(user.name)
    setCurrentSex(user.gender)
  }, [])
  function onClose() {
    // console.log('关闭')
  }
  function handleClick() {}

  function setHeadImg() {}

  async function setName() {
    const resData = await api['/user/api/user/userInfo_PUT']({ name: nameHook.value })
    if (resData.code === 0) {
      const data = { ...userInfo, name: nameHook.value }
      Taro.setStorageSync('userInfo', data)
      setUserInfo(data)
      setVisible(false)
    }
  }

  async function setSex() {
    const resData = await api['/user/api/user/userInfo_PUT']({ gender: currentSex })
    if (resData.code === 0) {
      const data = { ...userInfo, gender: currentSex }
      Taro.setStorageSync('userInfo', data)
      setUserInfo(data)
      setCurrentSex(currentSex)
      setSexFlag(false)
    }
  }

  // 更换头像
  const onimg = () => {
    setispup(true)
  }

  const setImg = (imgObj) => {}
  return (
    <View className={styles.accountInfoStyle}>
      <MMNavigation title="账户信息" />
      <View className={styles.infoTopWrap}>
        <View className={styles.info} style={{ height: '66px' }} onClick={onimg}>
          <View className={styles.infoTitle}>头像</View>
          <Image className={styles.infoHead} src={userInfo.headImg} />
          <Image className={styles.infoImg} onClick={() => setHeadImg()} src={require('~/images/tabberMine/extra.png')} />
        </View>
        <View className={styles.info}>
          <View className={styles.infoTitle}>昵称</View>
          <View className={styles.infoValue}>{userInfo.name}</View>
          <Image className={styles.infoImg} onClick={() => setVisible(true)} src={require('~/images/tabberMine/extra.png')} />
        </View>
        <View className={styles.info}>
          <View className={styles.infoTitle}>性别</View>
          <View className={styles.infoValue}>{userInfo.gender === 1 ? '男' : '女'}</View>
          <Image className={styles.infoImg} onClick={() => setSexFlag(true)} src={require('~/images/tabberMine/extra.png')} />
        </View>
      </View>
      <View className={styles.infoBottomWrap}>
        <View className={styles.info}>
          <View className={styles.infoTitle}>手机号码</View>
          <View className={styles.infoValue}>178****0912</View>
        </View>
        <View className={styles.info}>
          <View className={styles.infoTitle}>微信绑定</View>
          <View className={styles.infoValue}>张益达</View>
        </View>
      </View>
      {ispup ? <Pup onpup={setispup} setHeadImg={setImg} /> : ''}
      <MMPopup title="修改昵称" visible={visible} onClose={() => setVisible(false)} onOk={() => setName()} cancelText="取消" okText="确定" footer={true}>
        <Input
          className={styles.modalInput}
          maxlength={20}
          value={nameHook.value}
          onInput={nameHook.onInput}
          placeholder=" "
          placeholderStyle="color:#CCCCCC;line-height:40px"
        />
      </MMPopup>
      <MMPopup title="修改性别" visible={sexFlag} onClose={() => setSexFlag(false)} onOk={() => setSex()} cancelText="取消" okText="确定" footer={true}>
        <View className={styles.radioWrap}>
          <Image
            className={styles.radioImg}
            onClick={() => setCurrentSex(1)}
            style={{ marginLeft: '54px' }}
            src={currentSex === 1 ? require('~/images/tabberMine/radioSelected.png') : require('~/images/tabberMine/radioSelect.png')}
          />
          <Text className={styles.radioText} style={{ marginRight: '60px' }}>
            男
          </Text>
          <Image
            onClick={() => setCurrentSex(2)}
            className={styles.radioImg}
            src={currentSex === 2 ? require('~/images/tabberMine/radioSelected.png') : require('~/images/tabberMine/radioSelect.png')}
          />
          <Text className={styles.radioText}>女</Text>
        </View>
      </MMPopup>
    </View>
  )
}

const AccountInfo = memo(Component)
export default AccountInfo
