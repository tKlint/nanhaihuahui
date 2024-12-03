import Taro, { useDidShow } from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import styles from './index.module.less'
import { IMineProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import Nav from './nav/index'
import GoodsItem from '~/components/goodsItem'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import MMTabBar from '~/components/tab-bar'
import { routeNames } from '~/routes'
import { api } from '~/request'
import { EGlobalDataKey, getGlobalData, setGlobalData } from '~/GlobalData'
import { Goods, User } from '~/request/data-contracts'

const Component: FC<IMineProps> = () => {
  const [userInfo, setUserInfo] = useState<User>({})
  const [goodsData, setGoodsData] = useState<Goods[]>([])
  const orderTabs = [
    {
      id: 1,
      title: '待支付',
      icon: require('~/images/tabberMine/waitPay.png'),
      url: routeNames.mineMyOrder
    },
    {
      id: 2,
      title: '待发货',
      icon: require('~/images/tabberMine/waitShipments.png'),
      url: routeNames.mineMyOrder
    },
    {
      id: 3,
      title: '待收货',
      icon: require('~/images/tabberMine/waitReceive.png'),
      url: routeNames.mineMyOrder
    },
    {
      id: 4,
      title: '待评价',
      icon: require('~/images/tabberMine/waitEvaluate.png'),
      url: routeNames.mineMyOrder
    },
    {
      id: 5,
      title: '售后',
      icon: require('~/images/tabberMine/afterSell.png'),
      url: routeNames.orderSale
    }
  ]

  const featureData = [
    {
      id: 1,
      title: '我的拼团',
      icon: require('~/images/tabberMine/myGroup.png'),
      url: routeNames.orderGroupBook
    },
    {
      id: 2,
      title: '参拍记录',
      icon: require('~/images/tabberMine/myCompete.png'),
      url: routeNames.mineAuctionRecord
    },
    {
      id: 3,
      title: '我的评价',
      icon: require('~/images/tabberMine/myEvaluate.png'),
      url: routeNames.mineMyEvaluation
    }
  ]

  const serviceData = [
    {
      id: 1,
      title: '邀请开店',
      icon: require('~/images/tabberMine/invite.png'),
      url: routeNames.mineInviteSetShop
    },
    {
      id: 2,
      title: '商家登录',
      icon: require('~/images/tabberMine/merchantLogin.png'),
      url: routeNames.businessBusinessLogin
    },
    {
      id: 3,
      title: '消息中心',
      icon: require('~/images/tabberMine/news.png'),
      url: routeNames.mineMessageCenter
    },
    {
      id: 4,
      title: '客服中心',
      icon: require('~/images/tabberMine/service.png'),
      url: routeNames.supportService
    }
  ]

  useDidShow(() => {
    const common = getGlobalData(EGlobalDataKey.CommonInfo)
    if (common && common.userNo) {
      getBaseInfo()
    }
  })

  const getBaseInfo = async () => {
    const { data = {} } = await api['/user/api/user/userInfo_GET']({})
    setUserInfo(data)
    setGlobalData({ userInfo: data })
    Taro.setStorageSync('userInfo', data)
    // Taro.setStorageSync('uInfo', data
  }

  return (
    <View className={styles.mineStyle}>
      <MMNavigation title="我的" />
      <Nav userInfo={userInfo} />
      <View className={styles.mineOrders}>
        <View className={styles.mineTop}>
          <Image className={styles.mineTopImg} src={require('~/images/tabberMine/titleIcon.png')} />
          <View className={styles.mineTopTitle}>我的订单</View>
          <View className={styles.mineTopRight} onClick={() => Taro.navigateTo({ url: routeNames.mineMyOrder })}>
            <View className={styles.mineTopRightTitle}>全部订单</View>
            <Image className={styles.mineTopRightImg} src={require('~/images/tabberMine/extra.png')} />
          </View>
        </View>
        <View className={styles.mineOrdersCont}>
          {orderTabs.map((item) => {
            return (
              <View key={item.id} className={styles.mineOrdersContItem} onClick={() => Taro.navigateTo({ url: item.url })}>
                <Image className={styles.mineOrdersContItemIcon} src={item.icon} />
                <Text className={styles.mineOrdersContItemTitle}>{item.title}</Text>
              </View>
            )
          })}
        </View>
      </View>
      <View className={styles.mineFeature}>
        {featureData.map((item) => {
          return (
            <View className={styles.mineFeatureItem} key={item.id} onClick={() => Taro.navigateTo({ url: item.url })}>
              <Image src={item.icon} className={styles.mineFeatureItemIcon} />
              <View className={styles.mineFeatureItemTitle}>{item.title}</View>
            </View>
          )
        })}
      </View>
      <View className={styles.mineMoreService}>
        <View className={styles.mineTop}>
          <Image className={styles.mineTopImg} src={require('~/images/tabberMine/titleIcon.png')} />
          <View className={styles.mineTopTitle}>更多服务</View>
        </View>
        <View className={styles.mineMoreServiceContent}>
          {serviceData.map((item, index) => {
            return (
              <View key={item.id} className={styles.mineMoreServiceContentItem} onClick={() => Taro.navigateTo({ url: item.url })}>
                <Image className={styles.mineMoreServiceContentItemImg} src={item.icon} />
                <View className={styles.mineMoreServiceContentItemTitle}>{item.title}</View>
              </View>
            )
          })}
        </View>
      </View>
      <View className={styles.guessLike}>
        <View className={styles.mineTop} style={{ marginBottom: '15px' }}>
          <Image className={styles.mineTopImg} src={require('~/images/tabberMine/titleIcon.png')} />
          <View className={styles.mineTopTitle}>猜你喜欢</View>
        </View>
        <View className={styles.guessLikeCont}>
          {goodsData.map((item) => {
            return <GoodsItem key={item.id} goodsInfo={item} />
          })}
        </View>
      </View>
      <MMTabBar path="/pages/mine/index" />
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const Mine = memo(Component)
export default Mine
