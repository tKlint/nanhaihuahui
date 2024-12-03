import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Image, Input, ScrollView, Text, Swiper, SwiperItem } from '@tarojs/components'
import styles from './index.module.less'
import { IHomeProps } from './const'
import classNames from 'classnames'
import GoodsItem from '~/components/goodsItem'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import { MMModalAnimationType, MMModalJustifyContent } from '~/modules/@wmeimob/taro-design/src/components/modal/const'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import MMTabBar from '~/components/tab-bar'
import { routeNames } from '~/routes'
import useInput from '~/components/hooks/useInput'
import { Banner, Goods } from '~/request/data-contracts'
import { api } from '~/request'

const Component: FC<IHomeProps> = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [couponFlag, setcouponFlag] = useState<boolean>(false)
  const [liveData, setLiveData] = useState<any>([
    {
      id: 1,
      liveName: '直播间名称',
      isSelf: true,
      liveStatus: 1,
      desc: '今天是好看的“美人鱼”看',
      watchCount: 1222,
      liveCover: `${require('~/images/goodImg.png')}`,
      headIcon: `${require('~/images/goodImg.png')}`
    },
    {
      id: 2,
      liveName: '直播间名称',
      isSelf: true,
      liveStatus: 2,
      desc: '今天是好看的“美人鱼”看',
      watchCount: 1222,
      liveCover: `${require('~/images/goodImg.png')}`,
      headIcon: `${require('~/images/goodImg.png')}`
    },
    {
      id: 3,
      liveName: '直播间名称',
      isSelf: true,
      liveStatus: 3,
      desc: '今天是好看的“美人鱼”看',
      watchCount: 1222,
      liveCover: `${require('~/images/goodImg.png')}`,
      headIcon: `${require('~/images/goodImg.png')}`
    }
  ])
  const [isRecommond, setIsRecommond] = useState<boolean>(true)
  const [recommondGood, setRecommondGood] = useState<Goods[]>([])
  const [groupData, setGroupData] = useState<any>([
    {
      id: 1,
      goodImg: `${require('~/images/goodImg.png')}`,
      goodName: '商品名称',
      goodDesc: '商品简述，文字最多两行，超过省略商品简述，文字最多两行，超过省略商…',
      prePrice: 600,
      price: 40,
      groupStatus: 1,
      needCount: 10,
      totalCount: 10,
      currentCount: 0,
      coutDown: 10000,
      isSelf: true
    },

    {
      id: 2,
      goodImg: `${require('~/images/goodImg.png')}`,
      goodName: '商品名称',
      goodDesc: '商品简述，文字最多两行，超过省略商品简述，文字最多两行，超过省略商…',
      prePrice: 600,
      price: 40,
      groupStatus: 2,
      needCount: 3,
      totalCount: 10,
      currentCount: 7,
      coutDown: 10000,
      isSelf: false
    }
  ])
  const [bannerList, setBannerList] = useState<Banner[]>([])
  const [currentIndex, setcurrentIndex] = useState<number>(0)
  const searchValue = useInput()
  const navList = [
    {
      id: 1,
      text: '直播',
      url: routeNames.liveHome,
      imgSrc: `${require('~/images/home/live.png')}`,
      elseClass: ''
    },
    {
      id: 2,
      text: '拼团',
      url: routeNames.activityGroupHome,
      imgSrc: `${require('~/images/home/group.png')}`,
      elseClass: `${styles.group}`
    },
    {
      id: 3,
      text: '店铺',
      url: routeNames.searchShopList,
      imgSrc: `${require('~/images/home/shop.png')}`,
      elseClass: `${styles.shop}`
    },
    {
      id: 4,
      text: '自营',
      url: routeNames.selfMallMall,
      imgSrc: `${require('~/images/home/self.png')}`,
      elseClass: `${styles.self}`
    }
  ]

  async function getBanners() {
    const { data = [] } = await api['/user/api/home/banners_GET']({})
    setBannerList(data)
  }

  async function getRecommend() {
    const { data = [] } = await api['/user/api/home/recommended/goods_GET']({})
    setRecommondGood(data)
  }
  async function getLive() {
    const { data = [] } = await api['/user/api/home/recommended/liveRooms_GET']({})
    setLiveData(data)
  }

  useEffect(() => {
    getBanners()
    getRecommend()
    getLive()
  }, [])

  function onClose() {}
  return (
    <View className={styles.homeStyle}>
      <View className={styles.search}>
        <Image className={styles.homeLogo} src={require('~/images/home/logo.png')} />
        <View className={styles.searchWrap}>
          <Image className={styles.searchIcon} src={require('~/images/home/search.png')} />
          <Input
            value={searchValue.value}
            onInput={searchValue.onInput}
            onClick={() => Taro.navigateTo({ url: routeNames.searchHomeSearch })}
            className={styles.searchInput}
            placeholder="波斯猫"
            placeholderStyle="color:#666;line-height:18px"
          />
        </View>
      </View>
      <View className={styles.homeCont}>
        <Swiper style={{ width: '100%', height: '230px' }} autoplay current={currentIndex}>
          {bannerList.map((item) => {
            return (
              <SwiperItem key={item.id} className={styles.banner}>
                {/* TODO::item.pic 暂时是假数据没有正确的图片地址 */}
                <Image className={styles.bannerImg} src={require('~/images/goodImg.png')} />
              </SwiperItem>
            )
          })}
        </Swiper>

        <View className={styles.bannerCode}>
          {bannerList.map((item, index) => {
            return (
              <View
                key={item.id}
                onClick={() => setcurrentIndex(index)}
                className={classNames(styles.code, currentIndex === index ? styles.currentCode : '')}
              />
            )
          })}
        </View>

        {/* 导航 */}
        <View className={styles.navWrap}>
          {navList.map((item) => {
            return (
              <View key={item.id} className={classNames(styles.nav, item.elseClass)} onClick={() => Taro.navigateTo({ url: item.url })}>
                <Image className={styles.navImg} src={item.imgSrc} />
                <Text className={styles.navTitle}>{item.text}</Text>
              </View>
            )
          })}
        </View>
        {/* 优选直播 */}
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
            {liveData.map((item, index) => {
              return (
                index <= 2 && (
                  <View key={item.id} className={styles.live}>
                    <View className={styles.liveCover} style={{ background: `url(${item.logoPic}) no-repeat`, backgroundSize: '100% 100%' }}>
                      {/* {item.liveStatus === 1 ? ( */}
                      <View className={styles.liveCoverTop}>
                        <View className={styles.liveTitle}>
                          <Image className={styles.liveImg} src={require('~/images/live.png')} />
                          直播中
                        </View>
                        <View className={styles.liveCount}>111人观看</View>
                      </View>
                      {/* ) : (
                        <View className={styles.liveCoverTop}>
                          <View className={classNames(styles.liveTitle, styles.resetWrap)}>
                            <Image className={styles.liveImg} src={require('~/images/reset.png')} />
                            回放
                          </View>
                        </View> */}
                      {/* } */}
                      {item.isSelf === true && <View className={styles.selfShop}>自营</View>}
                    </View>
                    <View className={styles.liveName}>
                      <View className={styles.head}>
                        <Image className={styles.headImg} src={item.headIcon} />
                      </View>
                      <View className={styles.name}>{item.anchorName}</View>
                    </View>
                    <View className={styles.headline}>{item.roomTitle}</View>
                  </View>
                )
              )
            })}
          </View>
        </View>
        {/* 广告页 */}
        <View className={styles.homeAd} />
        {/* 相关推荐 */}
        <View className={styles.homeRecommend}>
          <View className={styles.homeRecommendTop}>
            <View
              onClick={() => setIsRecommond(true)}
              className={classNames(styles.homeRecommendTopTitle, isRecommond === false ? styles.homeRecommendTopTitleElse : '')}
            >
              好物推荐
              {isRecommond === true && <Image className={styles.homeRecommendTopCurrent} src={require('~/images/home/homeRecommendTopCurrent.png')} />}
            </View>
            <View
              onClick={() => setIsRecommond(false)}
              className={classNames(styles.homeRecommendTopTitle, isRecommond === true ? styles.homeRecommendTopTitleElse : '')}
            >
              超值拼团
              {isRecommond === false && <Image className={styles.homeRecommendTopCurrent} src={require('~/images/home/homeRecommendTopCurrent.png')} />}
            </View>
          </View>
          {/* 好物推荐 */}
          {isRecommond === true ? (
            <View className={styles.homeRecommendBottom}>
              {recommondGood.map((item, index) => {
                return <GoodsItem key={item.id} goodsInfo={item} isShowShop={true} />
              })}
            </View>
          ) : (
            <View className={styles.groupList}>
              {groupData.map((item) => {
                return (
                  <View key={item.id} className={styles.groupWrap}>
                    <View className={styles.groupWrapTop}>
                      <Image src={item.goodImg} className={styles.groupWrapTopImg} />
                      <View className={styles.groupGoodInfo}>
                        <View className={styles.groupGoodName}>{item.goodName}</View>
                        <View className={styles.groupGoodDesc}>{item.goodDesc}</View>
                        <View className={styles.groupGoodPrice}>
                          <View className={styles.groupGoodCurrentPrice}>¥{item.price}</View>
                          <View className={styles.groupGoodPrePrice}>
                            原价<Text>¥{item.prePrice}</Text>
                          </View>
                        </View>
                      </View>
                      {item.isSelf === true && <View className={styles.groupShop}>自营</View>}
                    </View>
                    <View className={styles.groupProgress}>
                      <View style={{ width: (item.currentCount / item.totalCount) * 100 + '%' }} className={styles.groupCurrentProgress} />
                    </View>
                    <View className={styles.groupPerson}>
                      <View className={styles.groupPersonCurrent} style={{ color: item.groupStatus === 4 ? '#ababab' : '#FD4F53' }}>
                        {item.groupStatus === 3 ? '已拼满' : `已拼${item.currentCount}人`}{' '}
                      </View>
                      <View className={styles.groupPersonTotal}>{item.totalCount}人</View>
                    </View>
                    <View className={styles.groupHandle}>
                      <View className={styles.groupHint}>
                        {item.groupStatus === 2 && (
                          <View>
                            剩余<Text style={{ color: '#FD4F53' }}>23:19:42</Text>
                          </View>
                        )}
                        {item.groupStatus === 1 && '未开始'}
                        {(item.groupStatus === 3 || item.groupStatus === 4) && (
                          <View>
                            还剩<Text style={{ color: '#ababab' }}>23:19:42</Text>
                          </View>
                        )}
                      </View>
                      <View className={classNames(styles.handle, { 1: '', 2: '', 3: styles.handleElse, 4: styles.handlePast }[item.groupStatus] || '')}>
                        {{ 1: '开启拼团', 2: '加入拼团', 3: '拼团成功', 4: '已过期' }[item.groupStatus] || ''}
                      </View>
                    </View>
                  </View>
                )
              })}
            </View>
          )}
          {/* 超值拼团 */}
        </View>
      </View>
      <MMTabBar path="/pages/home/index" />
      {isNewIphone && <View className="spacingIphone" />}
      <MMModal
        visible={visible}
        justifyContent={MMModalJustifyContent.flexEnd}
        animationType={MMModalAnimationType.down}
        className={styles.shopCartPopup}
        onClose={onClose}
      >
        <View className={styles.popWrap}>
          <Image className={styles.popWrapImg} src={require('~/images/homePop.png')} />
          <Image className={styles.popWrapClose} onClick={() => setVisible(false)} src={require('~/images/close.png')} />
        </View>
      </MMModal>
      <MMModal
        visible={couponFlag}
        justifyContent={MMModalJustifyContent.flexEnd}
        animationType={MMModalAnimationType.down}
        className={styles.shopCartPopup}
        onClose={onClose}
      >
        <View className={styles.popWrap} style={{ background: '#fff', borderRadius: '10px' }}>
          <View className={styles.popTitle}>我们为您赠送以下优惠券：</View>
          <View className={styles.coupon} style={{ background: `url(${require('~/images/homeCouponBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}>
            <View className={styles.couponAmount}>¥30</View>
            <View className={styles.couponInfo}>
              <View className={styles.couponHint}>满￥200可用</View>
              <View className={styles.couponScope}>全场通用</View>
              <View className={styles.couponTime}>2021.01.21 ~2021.05.21</View>
            </View>
          </View>
          <View className={styles.coupon} style={{ background: `url(${require('~/images/homeCouponBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}>
            <View className={styles.couponAmount}>¥30</View>
            <View className={styles.couponInfo}>
              <View className={styles.couponHint}>满￥200可用</View>
              <View className={styles.couponScope}>全场通用</View>
              <View className={styles.couponTime}>2021.01.21 ~2021.05.21</View>
            </View>
          </View>
          <View className={styles.couponHandle}>开心收下</View>
        </View>
      </MMModal>
    </View>
  )
}

const Home = memo(Component)
export default Home
