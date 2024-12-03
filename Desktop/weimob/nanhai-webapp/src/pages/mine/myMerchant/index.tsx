import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Image } from '@tarojs/components'
import styles from './index.module.less'
import { IMyMerchantProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import BottomButton from '~/components/bottomButton'

const Component: FC<IMyMerchantProps> = () => {
  return (
    <View className={styles.myMerchantStyle}>
      <MMNavigation title="我的商户" />
      <View className={styles.headInfo}>
        <Image className={styles.headImg} src={require('~/images/icinfor_img.png')} />
        <View className={styles.headName}>昵称</View>
      </View>
      <View className={styles.myMerchantList}>
        <View className={styles.myMerchant}>
          <View className={styles.myMerchantTop}>
            <Image className={styles.myMerchantImg} src={require('~/images/icinfor_img.png')} />
            <View className={styles.myMerchantInfo}>
              <View className={styles.myMerchantName}>商家名称</View>
              <View className={styles.shopName}>店铺名称</View>
            </View>
          </View>
          <View className={styles.myMerchantBottom}>
            <View className={styles.myMerchantTime}>2020-03-17 17:01</View>
            <View className={styles.orderCount}>
              累计订单量：12笔 <Image className={styles.orderCountImg} src={require('~/images/tabberMine/extra.png')} />
            </View>
          </View>
        </View>
      </View>
      <BottomButton title="邀请好友来开店" onClick={() => Taro.navigateTo({ url: '/pages/mine/inviteSetShop/index' })} contentStyle={{ background: '#fff' }} />
    </View>
  )
}

const MyMerchant = memo(Component)
export default MyMerchant
