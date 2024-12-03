import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { IInviteSetShopProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'

const Component: FC<IInviteSetShopProps> = () => {
  const [inviteInfo, setInviteInfo] = useState<any>({
    inviteCode: 'XH587UAB',
    shareImg: [
      {
        id: 1,
        imgUrl: `${require('~/images/goodImg.png')}`
      },
      {
        id: 2,
        imgUrl: `${require('~/images/goodImg.png')}`
      },
      {
        id: 3,
        imgUrl: `${require('~/images/goodImg.png')}`
      },
      {
        id: 4,
        imgUrl: `${require('~/images/goodImg.png')}`
      },
      {
        id: 5,
        imgUrl: `${require('~/images/goodImg.png')}`
      },
      {
        id: 6,
        imgUrl: `${require('~/images/goodImg.png')}`
      }
    ]
  })

  const shareImgArr = [1, 2, 3, 4, 5, 6]
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
    <View className={styles.inviteSetShopStyle}>
      <MMNavigation title="邀请开店" />
      <View className={styles.inviteCode}>
        <Image className={styles.headImg} src={require('~/images/icinfor_img.png')} />
        <View className={styles.myCode}>
          <Text className={styles.myCodeValue}>{inviteInfo.inviteCode}</Text>
          <View className={styles.myCodeCopy} onClick={() => fuzhi(inviteInfo.inviteCode)}>
            复制
          </View>
        </View>
        <View className={styles.myCodeTitle}>我的邀请码</View>
      </View>
      <View className={styles.inviteShare}>
        <View className={styles.inviteShareTitle}>您还可以选一张图片分享给朋友</View>
        <View className={styles.inviteShareSelectTitle}>选择图片</View>
        <ScrollView enableFlex scrollX style={{ maxWidth: '100%', marginBottom: '21px' }}>
          <View className={styles.inviteShareImg}>
            {inviteInfo.shareImg.map((item, index) => {
              return (
                <View key={item.id} className={styles.inviteShareImage} style={{ border: index === 0 ? '2px solid #FD4F53' : '', borderRadius: '10px' }}>
                  <Image className={styles.img} style={{ width: index === 0 ? '136px' : '140px', height: index === 0 ? '206' : '210px' }} src={item.imgUrl} />
                  {index === 0 && <View className={styles.inviteShareImageTitle}>长按识别小程序</View>}
                  {index === 0 && <View className={styles.smallCode} />}
                </View>
              )
            })}
          </View>
        </ScrollView>
        <View className={styles.inviteShareBg}>选择图片发送给好友</View>
      </View>
      <View className={styles.shareHandle}>
        <View className={styles.shareHandleTitle}>分享</View>
        <View className={styles.shareWx}>
          <Image className={styles.shareWxImg} src={require('~/images/city/shareWx.png')} />
          <Text className={styles.shareWxTxt}>微信好友</Text>
        </View>
        <View className={styles.shareWx}>
          <Image className={styles.shareWxImg} src={require('~/images/city/shareSave.png')} />
          <Text className={styles.shareWxTxt}>保存图片</Text>
        </View>
      </View>
    </View>
  )
}

const InviteSetShop = memo(Component)
export default InviteSetShop
