import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { IBusinessProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { routeNames } from '~/routes'

const Component: FC<IBusinessProps> = () => {
  const [businessInfo, setBusinessInfo] = useState<any>({
    logo: `${require('~/images/business/logo.png')}`,
    businessName: '商家基本信息中的企业全称'
  })
  return (
    <View className={styles.businessStyle}>
      <MMNavigation title="商家中心" />
      <View className={styles.businessShop}>
        <Image className={styles.businessShopLogo} src={businessInfo.logo} />
        <View className={styles.businessShopName}>{businessInfo.businessName}</View>
      </View>
      <View className={styles.business}>
        <View className={styles.businessItem}>
          <View className={styles.businessItemLabel}>企业信息</View>
          <Image className={styles.extra} src={require('~/images/tabberMine/extra.png')} />
        </View>
        <View className={styles.businessItem}>
          <View className={styles.businessItemLabel}>邀请者信息</View>
          <Image className={styles.extra} src={require('~/images/tabberMine/extra.png')} />
        </View>
      </View>
      <View className={styles.business} onClick={() => Taro.navigateTo({ url: routeNames.businessBusinessAccount })}>
        <View className={styles.businessItem}>
          <View className={styles.businessItemLabel}>查看账户密码</View>
          <Image className={styles.extra} src={require('~/images/tabberMine/extra.png')} />
        </View>
        <View className={styles.businessItem} onClick={() => Taro.navigateTo({ url: routeNames.businessApplyForLive })}>
          <View className={styles.businessItemLabel}>直播</View>
          <Image className={styles.extra} src={require('~/images/tabberMine/extra.png')} />
        </View>
      </View>
    </View>
  )
}

const Business = memo(Component)
export default Business
