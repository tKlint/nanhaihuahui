/* eslint-disable react/no-children-prop */
import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { ScrollView, View, Image, Input, Swiper, SwiperItem, Text } from '@tarojs/components'
import styles from './index.module.less'
import { IcommunityClassifyProps } from './const'
import classNames from 'classnames'
import CommunityItem from '~/components/communityItem'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import { MMModalAnimationType, MMModalJustifyContent } from '~/modules/@wmeimob/taro-design/src/components/modal/const'
import MMTabBar from '~/components/tab-bar'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import { api } from '~/request'
import { CommunityClassification, CommunityPosts, UserDetailInfoVO } from '~/request/data-contracts'
import global from '~/globalStore'
import { routeNames } from '~/routes'
import MMPopup from '~/components/popup'
import { setGlobalData } from '~/GlobalData'

const Component: FC<IcommunityClassifyProps> = () => {
  const [dotIndex, setDotIndex] = useState<number>(0)
  const [couponFlag, setCouponFlag] = useState<boolean>(false)
  const [followTip, setFollowTip] = useState<boolean>(false)
  const [bannerList, setBannerList] = useState<any>([])
  const [classify, setClassify] = useState<CommunityClassification[]>([])
  const [total, setTotal] = useState<number>(0)
  const [requestData, setRequestData] = useState<any>({
    pageNum: 1,
    pageSize: 10,
    classificationId: ''
  })
  const [dataList, setDataList] = useState<CommunityPosts[]>([])
  const [personal, setPersonal] = useState<UserDetailInfoVO>({})
  const [currentObj, setCurrentObj] = useState<any>({})

  // banner
  // const bannerList = [
  //   {
  //     id:1,
  //     src:'https://cdn.uviewui.com/uview/swiper/swiper1.png'
  //   },
  //   {
  //     id:2,
  //     src:'https://cdn.uviewui.com/uview/swiper/swiper1.png'
  //   },
  //   {
  //     id:3,
  //     src:'https://cdn.uviewui.com/uview/swiper/swiper1.png'
  //   },
  //   {
  //     id:4,
  //     src:'https://cdn.uviewui.com/uview/swiper/swiper1.png'
  //   },
  //   {
  //     id:5,
  //     src:'https://cdn.uviewui.com/uview/swiper/swiper1.png'
  //   }
  // ]
  // 滑动轮播
  function changeBanner(e) {
    setDotIndex(e.detail.current)
  }
  // 关注
  function followFun(type, event) {
    event.stopPropagation()
    if (type === 1) {
      Taro.showToast({
        title: '已关注',
        icon: 'none',
        mask: true
      })
    } else {
      setFollowTip(true)
    }
  }
  // 关闭发布弹窗
  function onClose() {
    setCouponFlag(false)
  }
  function toRelease(type) {
    Taro.navigateTo({ url: `${routeNames.subcommunityRelease}?type=${type}` })
    setTimeout(() => {
      setCouponFlag(false)
    }, 1000)
  }

  async function getBanner() {
    const { data = {} } = await api['/user/api/community/getCommunityBanner_GET']({})
    setBannerList(data.list || [])
  }
  async function getClassify() {
    const { data = [] } = await api['/user/api/community/getCommunityClassification_GET']({})
    setClassify(data)
    setGlobalData({ communityclassify: data })
  }

  const updateData = async () => {
    const datas = requestData
    if (datas.pageSize < total) {
      datas.pageSize = datas.pageSize + 10
      setRequestData(datas)
      Taro.showLoading({ title: '', mask: true })
      await getData(requestData)
      Taro.hideLoading()
    }
  }

  const getData = async (req) => {
    const { data = {} } = (await api['/user/api/community/getCommunityPosts_GET'](req)) as any
    const { list = [], total: totals } = data
    setDataList(list)
    setTotal(totals)
  }

  async function followClick(type: number, item: CommunityPosts, handleType: number) {
    console.log('dianji')
    let newHandle = {}
    switch (handleType) {
      case 1:
        newHandle = { isFollow: type }
        break
      case 2:
        newHandle = { isCollection: type }
        break
      case 3:
        newHandle = { isGive: type }
        break

      default:
        break
    }
    if (handleType === 1 && type === 0) {
      setCurrentObj({ item, newHandle })
      setFollowTip(true)
    } else {
      follwHandle(item, newHandle)
    }
  }
  async function follwHandle(item, newHandle) {
    const newList = dataList.map((val) => {
      if (val.id!.toString() === item.id!.toString()) {
        return {
          ...val,
          ...newHandle
        } as any
      }
      return val
    })

    // 请求接口
    const { code = 0 } = (await api['/user/api/community/updateCommunityPostsByGiveNumber_POST']({ ...newHandle, postsId: item.id })) as any
    if (code === 0) {
      setDataList(newList)
      setFollowTip(false)
      setCurrentObj({})
    }
  }

  function toPersonal() {
    console.log(personal)
    if (personal && personal.userNo) {
      Taro.navigateTo({ url: `${routeNames.subcommunityPlayerCommunityIndex}?userNo=${personal.userNo}` })
    } else {
      global.toLogin(true)
    }
  }

  async function getPerson(userNo) {
    const { data = {} } = (await api['/user/api/community/getUserByUserNo/{userNo}_GET'](userNo)) as any
    setPersonal(data)
  }

  useEffect(() => {
    const commonInfo = Taro.getStorageSync('commonInfo')

    if (commonInfo && commonInfo.userNo) {
      getPerson(commonInfo.userNo)
    } else {
      // global.toLogin(true)
    }

    getBanner()
    getClassify()
    getData(requestData)
  }, [])

  useEffect(() => {
    getData(requestData)
  }, [requestData.classificationId])

  function onOk() {
    follwHandle(currentObj.item, currentObj.newHandle)
  }
  return (
    <View className={styles.communityClassifyStyle}>
      <MMNavigation title="社区" />
      {/* 发布按钮 */}
      <View onClick={() => setCouponFlag(true)} className={styles.releaseBtn}>
        +
      </View>
      <ScrollView scrollY className={styles.sview}>
        <View style={{ background: '#FFF', padding: '0 15px' }}>
          {/* 顶部搜索 */}
          <View className={styles.top}>
            <Image onClick={() => toPersonal()} className={styles.topImg} src={(personal && personal.headImg) || require('~/images/goodImg.png')} />
            <View className={styles.topSearch}>
              <View className={styles.mallSearch}>
                <Image className={styles.mallSearchIcon} src={require('~/images/home/search.png')} />
                <Input
                  disabled={true}
                  className={styles.mallSearchInput}
                  placeholder="内容标题"
                  placeholderStyle="color:#ABABAB;line-height:17px;"
                  onClick={() => Taro.navigateTo({ url: '/pages/subcommunity/search/index' })}
                />
              </View>
            </View>
          </View>
          {/* banner */}
          {bannerList && bannerList.length > 0 && (
            <Swiper onChange={(e) => changeBanner(e)} autoplay circular style={{ height: '114px', marginBottom: ' 10px', marginTop: ' 17px' }}>
              {bannerList.map((item, index) => {
                return (
                  <SwiperItem key={index} className={styles.swiperItem}>
                    <View className={styles.goodImg} style={{ background: 'url("' + item.pic + '") no-repeat', backgroundSize: '100% 100%' }} />
                  </SwiperItem>
                )
              })}
            </Swiper>
          )}
          {bannerList && bannerList.length > 0 && (
            <View className={styles.bannerCode}>
              {bannerList.map((item, index) => {
                return <View key={index} className={classNames(styles.code, index === dotIndex ? styles.currentCode : '')} />
              })}
            </View>
          )}

          {/* 分类导航 */}
          <View className={styles.tabber}>
            <ScrollView scrollX style={{ whiteSpace: 'nowrap', paddingBottom: '7px' }}>
              {classify.map((item, index) => {
                return (
                  <View key={item.id} className={styles.titem} onClick={() => setRequestData({ ...requestData, classificationId: item.id })}>
                    <View className={styles.tbox}>
                      <View className={classNames(styles.tabberItemTitle, item.id === requestData.classificationId ? styles.tabberItemTitleActive : '')}>
                        {item.name}
                      </View>
                      {item.id === requestData.classificationId && <Image className={styles.timg} src={require('~/images/city/tabImg.png')} />}
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          </View>
        </View>
        {/* 列表数据 */}
        <View className={styles.wrapper} style={{ marginTop: '10px', paddingBottom: isNewIphone ? '60px' : '20px' }}>
          <CommunityItem data={dataList} followClick={followClick} follow={() => followFun} update={() => updateData()} />
        </View>
      </ScrollView>
      <MMTabBar path="/pages/community/index" />
      {/* 发布弹窗 */}
      <MMModal visible={couponFlag} justifyContent={MMModalJustifyContent.flexEnd} animationType={MMModalAnimationType.down} onClose={onClose}>
        <View className={styles.checkListWrap}>
          <View className={styles.checkListTitle}>
            <View className={styles.checkTitle}>发布</View>
            <Image className={styles.checkClose} onClick={() => setCouponFlag(false)} src={require('~/images/close.png')} />
          </View>
          <View className={styles.btns}>
            <View className={styles.btn} onClick={() => toRelease(1)}>
              <View className={styles.btnbg}>
                <Image className={styles.icon} src={require('~/images/community/image.png')} />
              </View>
              <Text className={styles.text}>图片</Text>
            </View>
            <View className={styles.btn} onClick={() => toRelease(2)}>
              <View className={classNames(styles.btnbg, styles.btnbg2)}>
                <Image className={styles.icon} src={require('~/images/community/video.png')} />
              </View>
              <Text className={styles.text}>视频</Text>
            </View>
          </View>
          {isNewIphone && <View className="spacingIphone" />}
        </View>
      </MMModal>

      <MMPopup
        title="提示"
        visible={followTip}
        onClose={() => setFollowTip(false)}
        onOk={() => onOk()}
        cancelText="取消"
        okText="确定"
        children="您确定不再关注吗"
        footer={true}
      />
    </View>
  )
}

const community = memo(Component)
export default community
