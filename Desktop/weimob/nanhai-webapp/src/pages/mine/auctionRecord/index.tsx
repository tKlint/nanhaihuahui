import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { IAuctionRecordProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { AuctionStatusHandleStyle, AuctionStatusHandleTitle, AuctionStatusStyle, AuctionStatusTitle } from './auctionStatusEnum'
import DefaultPage from '~/components/defaultPage'
// import useMMPullToRefresh from '~/modules/@wmeimob/taro-design/src/components/pull-to-refresh/hook'
// import MMPullToRefresh from '~/modules/@wmeimob/taro-design/src/components/pull-to-refresh'

const Component: FC<IAuctionRecordProps> = () => {
  // const data = [1, 2, 3, 4, 5]
  const [data, setData] = useState<any>([
    {
      id: 1,
      goodsName: '商品名称',
      status: 1,
      price: 200,
      goodImg: `${require('~/images/icinfor_img.png')}`
    },
    {
      id: 2,
      goodsName: '商品名称',
      status: 2,
      price: 200,
      goodImg: `${require('~/images/icinfor_img.png')}`
    },
    {
      id: 3,
      goodsName: '商品名称',
      status: 3,
      price: 200,
      goodImg: `${require('~/images/icinfor_img.png')}`
    },
    {
      id: 4,
      goodsName: '商品名称',
      status: 4,
      price: 200,
      goodImg: `${require('~/images/icinfor_img.png')}`
    },
    {
      id: 5,
      goodsName: '商品名称',
      status: 5,
      price: 200,
      goodImg: `${require('~/images/icinfor_img.png')}`
    }
  ])
  // TODO:: 加价、详情跳转到拍卖商品详情，订单详情跳转到订单详情，去支付跳转到 确认订单页？
  return (
    <View className={styles.auctionRecordStyle}>
      <MMNavigation title="我的参拍记录" />
      {data && data.length > 0 && (
        <View className={styles.auctionRecordWrap}>
          <ScrollView scrollY className={styles.sview}>
            <View className={styles.auctionRecordList}>
              {data.map((item) => {
                return (
                  <View key={item.id} className={styles.auctionRecord}>
                    <Image className={styles.auctionRecordImg} src={item.goodImg} />
                    <View className={styles.auctionGoodName}>{item.goodsName}</View>
                    <View className={styles.auctionGoodPrice}>¥{item.price}</View>
                    <View className={styles.auctionGoodHandle} style={AuctionStatusHandleStyle[item.status]}>
                      {AuctionStatusHandleTitle[item.status] || ''}
                    </View>
                    <View className={styles.auctionStatus} style={AuctionStatusStyle[item.status]}>
                      {AuctionStatusTitle[item.status] || ''}
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
      )}

      {data && data.length === 0 && <DefaultPage defaultHint="暂无记录" imgSrc={require('~/images/noRecord.png')} />}
    </View>
  )
}

const AuctionRecord = memo(Component)
export default AuctionRecord
