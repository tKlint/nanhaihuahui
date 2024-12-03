import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image } from '@tarojs/components'
import styles from './index.module.less'
import { IAttentionProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import Tabber from '~/components/tabber'
import Stars from '~/components/stars'
import classNames from 'classnames'
import DefaultPage from '~/components/defaultPage'

const Component: FC<IAttentionProps> = () => {
  const [tabIndex, setTabIndex] = useState<number>(1)
  const [shopData, setShopData] = useState<any>([
    {
      id: 1,
      shopName: '店铺名称',
      shopIcon: `${require('~/images/icinfor_img.png')}`,
      isquality: true,
      grade: 4.3,
      attentionCount: 122,
      hasLive: true,
      live: [
        {
          id: 1,
          isLive: true,
          watchCount: 200,
          liveName: '直播 名称1111'
        }
      ],
      contList: [
        {
          id: 2,
          goodCover: `${require('~/images/icinfor_img.png')}`
        },
        {
          id: 3,
          goodCover: `${require('~/images/icinfor_img.png')}`
        }
      ]
    },
    {
      id: 2,
      shopName: '店铺名称',
      shopIcon: `${require('~/images/icinfor_img.png')}`,
      isquality: true,
      grade: 4.3,
      attentionCount: 122,
      hasLive: false,
      contList: [
        {
          id: 21,
          goodCover: `${require('~/images/icinfor_img.png')}`
        },
        {
          id: 31,
          goodCover: `${require('~/images/icinfor_img.png')}`
        },
        {
          id: 41,
          goodCover: `${require('~/images/icinfor_img.png')}`
        }
      ]
    }
  ])
  const [liveData, setLiveData] = useState<any>([
    {
      id: 1,
      liveStatus: 1,
      liveName: '直播间名称',
      liveDate: '2021-01-02',
      liveCover: ``,
      isSubscribe: true
    },
    {
      id: 2,
      liveStatus: 1,
      liveName: '直播间名称',
      liveDate: '2021-01-02',
      liveCover: ``,
      isSubscribe: false
    },
    {
      id: 3,
      liveStatus: 2,
      liveName: '直播间名称',
      liveDate: '2021-01-02',
      liveCover: ``,
      isSubscribe: true
    },
    {
      id: 4,
      liveStatus: 2,
      liveName: '直播间名称',
      liveDate: '2021-01-02',
      liveCover: ``,
      isSubscribe: false
    }
  ])
  const tabArr = [
    {
      id: 0,
      title: '店铺'
    },
    {
      id: 1,
      title: '直播'
    }
  ]
  return (
    <View className={styles.attentionStyle}>
      <MMNavigation title="我的关注" />
      <Tabber tabIndex={tabIndex} setTabIndex={setTabIndex} tabArr={tabArr} titleColor="#333" />
      {tabIndex === 0 && (
        <View className={styles.attention}>
          {shopData.map((item) => {
            return (
              <View key={item.id} className={styles.attentionItem}>
                <View className={styles.attentionShop}>
                  <Image className={styles.attentionShopIcon} src={item.shopIcon} />
                  <View className={styles.attentionShopInfo}>
                    <View className={styles.attentionShopName}>{item.shopName}</View>
                    <View className={styles.attentionShopInformation}>
                      {item.isquality && <Image className={styles.zhibao} src={require('~/images/qualityGuarantee.png')} />}
                      <Stars grade={item.grade} />
                      <View className={styles.attentionCount}>{item.attentionCount}人关注</View>
                    </View>
                  </View>

                  <View className={styles.toShop}>进店</View>
                </View>
                {item.hasLive && item.hasLive === true ? (
                  <View className={styles.goodsArr}>
                    {item.live.map((liveItem) => {
                      return (
                        <View
                          key={liveItem.id}
                          className={styles.live}
                          style={{ background: `url(${liveItem.logoPic}) no-repeat`, backgroundSize: '100% 100%' }}
                        >
                          <View className={styles.liveTop}>
                            <View className={styles.liveTitle}>
                              <Image className={styles.liveImg} src={require('~/images/live.png')} />
                              直播中
                            </View>
                            <View className={styles.liveCount}>{liveItem.watchCount}人观看</View>
                          </View>
                          <View className={styles.liveName}>{liveItem.liveName}</View>
                        </View>
                      )
                    })}
                    <View className={styles.liveGood}>
                      {item.contList.map((cont, index) => {
                        return <Image key={cont.id} src={cont.goodCover} className={classNames(styles.goodImg, index === 1 ? styles.goodImg1 : '')} />
                      })}
                    </View>
                  </View>
                ) : (
                  <View className={styles.goodsArr}>
                    {item.contList.map((cont, index) => {
                      return <Image key={cont.id} src={cont.goodCover} className={styles.goodImg} />
                    })}
                  </View>
                )}
              </View>
            )
          })}
        </View>
      )}
      {tabIndex === 1 && (
        <View className={styles.liveArr}>
          {liveData.map((item) => {
            return (
              <View key={item.id} className={styles.attentionLive}>
                <View
                  className={styles.attentionLiveStatus}
                  style={{
                    background: item.liveStatus === 1 ? 'linear-gradient(90deg, #FF7132 0%, #FC2C77 100%)' : 'linear-gradient(90deg, #555555 0%, #333333 100%)'
                  }}
                >
                  <Image
                    className={styles.attentionLiveStatusImg}
                    src={item.liveStatus === 1 ? require('~/images/liveWait.png') : require('~/images/reset.png')}
                  />
                  {item.liveStatus === 1 ? '即将开播' : '回放'}
                </View>
                <View className={styles.attentionLiveTime}>{item.liveDate}</View>
                <View className={styles.attentionLiveHandle}>
                  <View className={styles.attentionLiveTitle}>{item.liveName}</View>
                  {item.liveStatus === 1 && (
                    <View
                      className={styles.attentionLiveBtn}
                      style={{
                        background: item.isSubscribe === true ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.25)',
                        border: item.isSubscribe === true ? 0 : '1px solid #FFFFFF'
                      }}
                    >
                      {item.isSubscribe === true ? '已预约' : '预约'}
                    </View>
                  )}
                </View>
              </View>
            )
          })}
        </View>
      )}
      {shopData && !shopData.length && liveData && !liveData.length && <DefaultPage imgSrc={require('~/images/nullCollection.png')} defaultHint="暂无关注" />}
    </View>
  )
}

const Attention = memo(Component)
export default Attention
