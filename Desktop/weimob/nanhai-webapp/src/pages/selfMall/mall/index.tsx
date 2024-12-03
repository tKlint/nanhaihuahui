import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { ScrollView, View, Image, Input, Swiper, SwiperItem, Text } from '@tarojs/components'
import styles from './index.module.less'
import { IMallProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import classNames from 'classnames'
import GoodsItem from '~/components/goodsItem'
import { api } from '~/request'

const Component: FC<IMallProps> = () => {
  const [banners, setBanners] = useState<any>([])
  const [recommonGood, setRecommonGood] = useState<any>([])
  const [currentIndex, setcurrentIndex] = useState<number>(0)
  async function getBanners() {
    const { data = [] } = await api['/user/api/home/banners_GET']({})
    setBanners(data)
  }
  async function getGoods() {
    const { data = [] } = await api['/user/api/home/primary/goods_GET']({})
    setRecommonGood(data)
  }
  //

  useEffect(() => {
    getBanners()
    getGoods()
  }, [])
  return (
    <View className={styles.mallStyle}>
      <MMNavigation title="自营商城" />
      <View className={styles.mall}>
        <ScrollView scrollY className={styles.sview}>
          <View className={styles.sviewWrap}>
            <View className={styles.mallSearch}>
              <Image className={styles.mallSearchIcon} src={require('~/images/home/search.png')} />
              <Input className={styles.mallSearchInput} placeholder="波斯猫" placeholderStyle="color:#666;line-height:18px" />
              <View className={styles.division} />
              <View className={styles.mallSearchHint}>进店逛逛</View>
            </View>
            <Swiper current={currentIndex} autoplay style={{ height: '114px', width: '100%', marginBottom: ' 10px' }}>
              {banners.map((item, index) => {
                return (
                  <SwiperItem key={item.id} className={styles.swiperItem}>
                    {/* TODO:: item.pic */}
                    <View className={styles.goodImg} style={{ background: `url(${require('~/images/goodImg.png')}) no-repeat`, backgroundSize: '100% 100%' }} />
                  </SwiperItem>
                )
              })}
            </Swiper>
            <View className={styles.bannerCode}>
              {banners.map((item, index) => {
                return (
                  <View
                    key={item.ids}
                    onClick={() => setcurrentIndex(index)}
                    className={classNames(styles.code, index === currentIndex ? styles.currentCode : '')}
                  />
                )
              })}
            </View>
            {/* 直播 */}
            <View className={styles.liveStreamingWrap}>
              <View className={styles.liveTop}>
                <Image className={styles.liveTopLogo} src={require('~/images/home/liveIcon.png')} />
                <Image className={styles.liveNameIcon} src={require('~/images/home/liveNameIcon.png')} />
                <View className={styles.liveExtra}>
                  查看更多
                  <Image className={styles.extra} src={require('~/images/tabberMine/extra.png')} />
                </View>
              </View>
              <View className={styles.liveList}>
                <View className={styles.live}>
                  <View className={styles.liveCover} style={{ background: `url(${require('~/images/goodImg.png')}) no-repeat`, backgroundSize: '100% 100%' }}>
                    <View className={styles.liveCoverTop}>
                      <View className={styles.liveTitle}>
                        <Image className={styles.liveImg} src={require('~/images/live.png')} />
                        直播中
                      </View>
                      <View className={styles.liveCount}>111人观看</View>
                    </View>
                    <View className={styles.selfShop}>自营</View>
                  </View>
                  <View className={styles.liveName}>
                    <View className={styles.head}>
                      <Image className={styles.headImg} src={require('~/images/goodImg.png')} />
                    </View>
                    <View className={styles.name}>南海吴彦祖</View>
                  </View>
                  <View className={styles.headline}>今天是好看的“美人鱼”看</View>
                </View>
                <View className={styles.live}>
                  <View className={styles.liveCover} style={{ background: `url(${require('~/images/goodImg.png')}) no-repeat`, backgroundSize: '100% 100%' }}>
                    <View className={styles.liveCoverTop}>
                      <View className={styles.liveTitle}>
                        <Image className={styles.liveImg} src={require('~/images/live.png')} />
                        直播中
                      </View>
                      <View className={styles.liveCount}>111人观看</View>
                    </View>
                    <View className={styles.selfShop}>自营</View>
                  </View>
                  <View className={styles.liveName}>
                    <View className={styles.head}>
                      <Image className={styles.headImg} src={require('~/images/goodImg.png')} />
                    </View>
                    <View className={styles.name}>南海吴彦祖</View>
                  </View>
                  <View className={styles.headline}>今天是好看的“美人鱼”看</View>
                </View>
                <View className={styles.live}>
                  <View className={styles.liveCover} style={{ background: `url(${require('~/images/goodImg.png')}) no-repeat`, backgroundSize: '100% 100%' }}>
                    <View className={styles.liveCoverTop}>
                      <View className={classNames(styles.liveTitle, styles.resetWrap)}>
                        <Image className={styles.liveImg} src={require('~/images/reset.png')} />
                        回放
                      </View>
                    </View>
                    <View className={styles.selfShop}>自营</View>
                  </View>
                  <View className={styles.liveName}>
                    <View className={styles.head}>
                      <Image className={styles.headImg} src={require('~/images/goodImg.png')} />
                    </View>
                    <View className={styles.name}>南海吴彦祖</View>
                  </View>
                  <View className={styles.headline}>今天是好看的“美人鱼”看</View>
                </View>
              </View>
            </View>
            <View className={styles.homeRecommend}>
              <View className={styles.homeRecommendTop}>
                <View className={styles.homeRecommendTopTitle}>
                  好物推荐
                  <Image className={styles.homeRecommendTopCurrent} src={require('~/images/home/homeRecommendTopCurrent.png')} />
                </View>
                <View className={classNames(styles.homeRecommendTopTitle, styles.homeRecommendTopTitleElse)}>超值拼团</View>
              </View>{' '}
              {/* 好物推荐 */}
              <View className={styles.homeRecommendBottom}>
                {recommonGood.map((item) => {
                  return <GoodsItem key={item.id} goodsInfo={item} isShowShop={true} />
                })}
              </View>
              {/* 超值拼团 */}
              {/* <View className={styles.groupList}>
                <View className={styles.groupWrap}>
                  <View className={styles.groupWrapTop}>
                    <Image src={require('~/images/goodImg.png')} className={styles.groupWrapTopImg} />
                    <View className={styles.groupGoodInfo}>
                      <View className={styles.groupGoodName}>商品列表商品列表商品列表商...</View>
                      <View className={styles.groupGoodDesc}>商品简述，文字最多两行，超过省略商品简述，文字最多两行，超过省略商…</View>
                      <View className={styles.groupGoodPrice}>
                        <View className={styles.groupGoodCurrentPrice}>¥660.00</View>
                        <View className={styles.groupGoodPrePrice}>
                          原价<Text>¥660.00</Text>
                        </View>
                      </View>
                    </View>
                    <View className={styles.groupShop}>自营</View>
                  </View>
                  <View className={styles.groupProgress}>
                    <View className={styles.groupCurrentProgress} />
                  </View>
                  <View className={styles.groupPerson}>
                    <View className={styles.groupPersonCurrent}>已拼2人</View>
                    <View className={styles.groupPersonTotal}>10人</View>
                  </View>
                  <View className={styles.groupHandle}>
                    <View className={styles.groupHint}>
                      还剩<Text style={{ color: '#FD4F53' }}>23:19:42</Text>
                    </View>
                    <View className={styles.handle}>加入拼团</View>
                  </View>
                </View>
                <View className={styles.groupWrap}>
                  <View className={styles.groupWrapTop}>
                    <Image src={require('~/images/goodImg.png')} className={styles.groupWrapTopImg} />
                    <View className={styles.groupGoodInfo}>
                      <View className={styles.groupGoodName}>商品列表商品列表商品列表商...</View>
                      <View className={styles.groupGoodDesc}>商品简述，文字最多两行，超过省略商品简述，文字最多两行，超过省略商…</View>
                      <View className={styles.groupGoodPrice}>
                        <View className={styles.groupGoodCurrentPrice}>¥660.00</View>
                        <View className={styles.groupGoodPrePrice}>
                          原价<Text>¥660.00</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View className={styles.groupProgress}> </View>
                  <View className={styles.groupPerson}>
                    <View className={styles.groupPersonCurrent}>已拼0人</View>
                    <View className={styles.groupPersonTotal}>10人</View>
                  </View>
                  <View className={styles.groupHandle}>
                    <View className={styles.groupHint}>未开始</View>
                    <View className={styles.handle}>开启拼团</View>
                  </View>
                </View>
              </View> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const Mall = memo(Component)
export default Mall
