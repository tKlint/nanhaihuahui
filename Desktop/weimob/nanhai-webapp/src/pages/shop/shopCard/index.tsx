import Taro, { getCurrentInstance } from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import styles from './index.module.less'
import { IShopCardProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { api } from '~/request'

const Component: FC<IShopCardProps> = () => {
  const [shopCard, setShopCard] = useState<any>({})

  async function getShopCard() {
    const { data = {} } = await api['/user/api/store/businesscard/{id}_GET'](getCurrentInstance().router?.params.shopId as any)
    setShopCard(data)
  }
  useEffect(() => {
    getShopCard()
  }, [])
  return (
    <View className={styles.shopCardStyle}>
      <MMNavigation title="商家名片" />
      <View className={styles.shopCardCode}>
        <Image className={styles.shopCardIcon} src={shopCard.logo} />
        <Image className={styles.code} src={shopCard.wxQrCode} />
        <View className={styles.codeHint}>微信扫一扫</View>
      </View>
      <View className={styles.shopPhone}>
        直接联系店家：<Text style={{ color: '#FD4F53' }}>{shopCard.contactNumber}</Text>
      </View>
    </View>
  )
}

const ShopCard = memo(Component)
export default ShopCard
