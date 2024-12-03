import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { ILiveHomeProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { api } from '~/request'
import { routeNames } from '~/routes'

const Component: FC<ILiveHomeProps> = () => {
  const [searchLabel, setSearchLabel] = useState<any>([])
  const [liveData, setLiveData] = useState<any>([])
  // const [currentLive, setCurrentLive] = useState<any>([
  //   {
  //     id: 1,
  //     isLive: true,
  //     watchCount: 200,
  //     liveName: '直播 名称1111',
  //     liveIcon: `${require('~/images/goodImg.png')}`,
  //     liveDesc: 'qqqqqqqqqqqqq'
  //   },
  //   {
  //     id: 2,
  //     isLive: true,
  //     watchCount: 200,
  //     liveName: '直播 名称1111',
  //     liveIcon: `${require('~/images/goodImg.png')}`,
  //     liveDesc: 'qqqqqqqqqqqqq'
  //   }
  // ])
  const [categoryId, setcategoryId] = useState<number>()
  const [banners, setBanners] = useState<any>([])

  async function getLabel() {
    //
    const { data = [] } = await api['/user/api/home/primary/categoryList_GET']({})
    if (data && data.length > 0) {
      setcategoryId(data[0].id)
      getLive(data[0].id)
    }
    setSearchLabel(data)
  }
  async function getLive(id) {
    if (!id) {
      return
    }
    const { data = {} } = (await api['/user/api/home/recommended/liveRoomLists_GET']({ categoryId: id })) as any
    setLiveData(data.liveRoom!)
    setBanners(data.banner)
  }
  useEffect(() => {
    getLabel()
  }, [])
  useEffect(() => {
    getLive(categoryId)
  }, [categoryId])
  return (
    <View className={styles.liveHomeStyle}>
      <MMNavigation title="直播" />
      <View className={styles.liveHomeTop}>
        <View className={styles.liveHomeTopSearch}>
          <Image
            className={styles.icon}
            src={require('~/images/home/search.png')}
            onClick={() => Taro.navigateTo({ url: `${routeNames.searchHomeSearch}?type=1` })}
          />
        </View>
        <View className={styles.searchWrap}>
          <ScrollView enableFlex scrollX style={{ maxWidth: '100%', height: '36px' }}>
            {searchLabel.map((item) => {
              return (
                <View
                  onClick={() => setcategoryId(item.id)}
                  key={item.id}
                  className={styles.searchTxt}
                  style={{ color: item.id === categoryId ? '#FD4F53' : '#333' }}
                >
                  {item.categoryName}
                  {item.id === categoryId && <Image className={styles.timg} src={require('~/images/city/tabImg.png')} />}
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
      <View className={styles.liveHomeWrap}>
        <ScrollView scrollY className={styles.sview}>
          <View className={styles.liveHome}>
            <View className={styles.liveHomeAd} />
            <View className={styles.liveList}>
              {liveData.map((item) => {
                return item.status === 1 ? (
                  <View key={item.id} className={styles.currentLive} style={{ background: `url(${item.logoPic}) no-repeat`, backgroundSize: '100% 100%' }}>
                    <View className={styles.liveTop}>
                      <View className={styles.liveTitle}>
                        <Image className={styles.liveImg} src={require('~/images/live.png')} />
                        直播中
                      </View>
                      <View className={styles.liveCount}>{item.watchCount}人观看</View>
                    </View>
                    <View className={styles.shopInfo}>
                      <Image className={styles.liveShopImg} src={item.liveIcon} />
                      <View className={styles.liveShopInfo}>
                        <View className={styles.liveShopName}>{item.liveName}</View>
                        <View className={styles.liveShopAttention}>{item.liveDesc}</View>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View key={item.id} className={styles.attentionLive} style={{ background: `url(${item.logoPic}) no-repeat`, backgroundSize: '100% 100%' }}>
                    <View className={styles.attentionLiveStatus} style={{ marginBottom: item.isSubscribe === true ? '95px' : '113px' }}>
                      <Image className={styles.attentionLiveStatusImg} src={require('~/images/liveWait.png')} />
                      即将开播
                    </View>

                    <View className={styles.attentionLiveTime}>{item.liveDate}</View>
                    <View className={styles.attentionLiveHandle} style={{ height: item.isSubscribe === true ? '40px' : '24px' }}>
                      <View className={styles.attentionLiveTitle} style={{ width: item.liveStatus === 3 ? '100%' : '85px' }}>
                        {item.liveName}
                      </View>
                      {/* style={{ marginTop: '0' }}  */}
                      {item.liveStatus === 1 && (
                        <View
                          className={styles.attentionLiveBtn}
                          style={{
                            background: item.isSubscribe === true ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.25)',
                            border: item.isSubscribe === true ? 0 : '1px solid #FFFFFF',
                            marginTop: item.isSubscribe === true ? '16px' : 0
                          }}
                        >
                          {item.isSubscribe === true ? '已预约' : '预约'}
                        </View>
                      )}
                    </View>
                  </View>
                )
              })}
              {liveData.map((item) => {
                return (
                  <View key={item.id} className={styles.attentionLive}>
                    {/* {item.liveStatus === 1 ? ( */}
                    <View className={styles.attentionLiveStatus} style={{ marginBottom: item.isSubscribe === true ? '95px' : '113px' }}>
                      <Image className={styles.attentionLiveStatusImg} src={require('~/images/liveWait.png')} />
                      即将开播
                    </View>
                    {/* ) : (
                      <View className={styles.attentionLiveStatus} style={{ background: 'linear-gradient(90deg, #555555 0%, #333333 100%)' }}>
                        <Image className={styles.attentionLiveStatusImg} src={require('~/images/reset.png')} />
                        回放
                      </View>
                    )} */}

                    <View className={styles.attentionLiveTime}>{item.liveDate}</View>
                    <View className={styles.attentionLiveHandle} style={{ height: item.isSubscribe === true ? '40px' : '24px' }}>
                      <View className={styles.attentionLiveTitle} style={{ width: item.liveStatus === 3 ? '100%' : '85px' }}>
                        {item.liveName}
                      </View>
                      {/* style={{ marginTop: '0' }}  */}
                      {item.liveStatus === 1 && (
                        <View
                          className={styles.attentionLiveBtn}
                          style={{
                            background: item.isSubscribe === true ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.25)',
                            border: item.isSubscribe === true ? 0 : '1px solid #FFFFFF',
                            marginTop: item.isSubscribe === true ? '16px' : 0
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
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const LiveHome = memo(Component)
export default LiveHome
