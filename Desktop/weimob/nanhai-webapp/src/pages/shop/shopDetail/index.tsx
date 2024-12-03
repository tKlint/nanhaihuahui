/* eslint-disable no-nested-ternary */
/* eslint-disable complexity */
/* eslint-disable react/no-children-prop */
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { FC, memo, useState, useEffect } from 'react'
import { View, Image, ScrollView, Text, Input, Swiper, SwiperItem } from '@tarojs/components'
import styles from './index.module.less'
import { IShopDetailProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import classNames from 'classnames'
import GoodsItem from '~/components/goodsItem'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import IconFontName from '~/modules/@wmeimob/taro-design/src/components/icon-font/name'
import { MMModalJustifyContent, MMModalAnimationType } from '~/modules/@wmeimob/taro-design/src/components/modal/const'
import MMStars from '~/modules/@wmeimob/taro-design/src/components/stars'
import { MMStarsSize } from '~/modules/@wmeimob/taro-design/src/components/stars/const'
import MMMenu from '~/components/menu'
import DefaultPage from '~/components/defaultPage'
import MMPopup from '~/components/popup'
import Tabber from '~/components/tabber'
import Stars from '~/components/stars'
import { routeNames } from '~/routes'
import { api } from '~/request'
import { Banner, CouponDetail, Goods, GoodsClassify } from '~/request/data-contracts'
import ShopCoupon from './shopCoupon'
import useInput from '~/components/hooks/useInput'
import ShopIndex from './shopIndex'

const Component: FC<IShopDetailProps> = () => {
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)
  const [popFlag, setPopFlag] = useState<boolean>(false)
  const [shopDetail, setShopDetail] = useState<any>({ name: '' })
  const [couponList, setCouponList] = useState<CouponDetail[]>([])
  const [goodsList, setGoodsList] = useState<Goods[]>([])
  const [bannerList, setBannerList] = useState<Banner[]>([])
  const [noticeList, setNoticeList] = useState<any>([])
  const [allCoupon, setAllCoupon] = useState<any>([])
  const [requestData, setRequestData] = useState<any>({ pageNum: 1, pageSize: 10, classifyId: 0, priceRank: '', saleRank: '' })
  const [total, setTotal] = useState<number>(0)
  const [allGoood, setAllGood] = useState<Goods[]>([])
  const minimumPrice = useInput()
  const highestPrice = useInput()

  const [couponFlag, setCouponFlag] = useState<boolean>(false)
  const [classifyData, setClassifyData] = useState<GoodsClassify[]>([])

  const tabberArr = [
    {
      title: '首页',
      id: 0
    },
    {
      title: '全部商品',
      id: 1
    },
    {
      title: '分类',
      id: 2
    },
    {
      title: '直播',
      id: 3
    }
  ] as any

  function onChange() {}

  function onOk() {}

  // 店铺信息
  async function getShopInfo() {
    const { data = {} } = await api['/user/api/store/{id}_GET'](getCurrentInstance().router?.params.shopId as any)
    setRequestData({ pageNum: 1, pageSize: 10, storeNo: data.store!.storeNo, priceRank: '', saleRank: '' })
    setShopDetail(data.store)
    setCouponList(data.couponDetailList as any)
    setGoodsList(data.goodsList as any)
    setBannerList(data.bannerList as any)
  }
  async function getNotice() {
    const { data = {} } = await api['/user/api/store/getStoreNotice_GET']({ storeNo: getCurrentInstance().router?.params.storeNo as any })
    setNoticeList(data.list)
  }
  useEffect(() => {
    if (getCurrentInstance().router?.params.shopId) {
      getShopInfo()
    }
    if (getCurrentInstance().router?.params.storeNo) {
      getNotice()
    }
  }, [])

  useEffect(() => {
    setTotal(0)
    if (tabIndex === 1) {
      getClassify()
      allGoods({ pageNum: 1, pageSize: 10, storeNo: shopDetail.storeNo, priceRank: '', saleRank: '' })
    }
  }, [tabIndex])

  // 关注、取消关注
  async function attentionShop() {
    const { code = 0 } = await api['/user/api/store/focusOrNot/{id}_POST'](shopDetail.id || 2)
    if (code === 0) {
      if (shopDetail.hasFocus === 0) {
        Taro.showToast({
          title: '关注成功',
          icon: 'none'
        })
        setShopDetail({ ...shopDetail, hasFocus: 1 })
      } else {
        Taro.showToast({
          title: '您已取消关注',
          icon: 'none'
        })
        setShopDetail({ ...shopDetail, hasFocus: 0 })
      }
    }
  }
  // 领取优惠券
  async function drawCoupon(item, flag) {
    if (!flag) {
      return
    }
    const { data } = await api['/user/api/store/coupons/{couponNo}_POST'](item.couponNo)
    // 领取之后要刷新优惠券状态
    console.log(data)
  }

  // 全部优惠券
  async function getAllCoupon() {
    const { data = [] } = await api['/user/api/store/coupons/{id}_GET'](shopDetail.id)
    setAllCoupon(data)
    setCouponFlag(true)
  }
  function getAllGoods() {
    setTabIndex(1)
  }
  // 分页
  const update = async () => {
    const datas = requestData
    if (datas.pageSize < total) {
      datas.pageSize = datas.pageSize + 10
      setRequestData(datas)
      Taro.showLoading({ title: '', mask: true })
      await allGoods(requestData)
      Taro.hideLoading()
    }
  }
  // 请求所有商品
  async function allGoods(req) {
    const { data = {} } = (await api['/user/api/goods_GET'](req)) as any
    const { list = [], total: totals } = data
    setAllGood(list)
    setTotal(totals)
  }
  // 获取一级分类
  const getClassify = async () => {
    const { data = [] } = (await api['/user/api/goodsClassify_GET']({})) as any
    setClassifyData(data)
  }
  // 筛选清空
  function resetSearch() {
    setRequestData({ ...requestData, classifyId: 0 })
    minimumPrice.setValue('')
    highestPrice.setValue('')
  }
  // 筛选提交
  function handleSure() {
    if (minimumPrice.value! > highestPrice.value!) {
      Taro.showToast({ title: '最低价不得高于最高价', icon: 'none' })
      return
    }
    setRequestData({ ...requestData, minimumPrice: minimumPrice.value, highestPrice: highestPrice.value })
    allGoods({ ...requestData, minimumPrice: minimumPrice.value, highestPrice: highestPrice.value })

    setVisible(false)
  }
  // 全部商品 筛选条件
  function setCondition(type: string) {
    const req = { ...requestData }
    if (type === 'saleRank') {
      if (requestData.saleRank === '') {
        req.saleRank = 'desc'
      } else if (requestData.saleRank === 'desc') {
        req.saleRank = 'asc'
      } else {
        req.saleRank = ''
      }
    }
    if (type === 'priceRank') {
      if (requestData.priceRank === '') {
        req.priceRank = 'desc'
      } else if (requestData.priceRank === 'desc') {
        req.priceRank = 'asc'
      } else {
        req.priceRank = ''
      }
    }
    setRequestData(req)
    allGoods(req)
  }

  return (
    <View className={styles.shopDetailStyle}>
      {/* 店铺名称 最多九个字 多余+省略号 */}
      <MMNavigation title={shopDetail.name && shopDetail.name.length <= 9 ? shopDetail.name : shopDetail.name.substring(0, 9) + '...'} />
      {tabIndex === 0 && (
        <View className={styles.shopDetailTop} onClick={() => Taro.navigateTo({ url: routeNames.shopMerchantInfo + '?shopId=' + shopDetail.id })}>
          <Image className={styles.shopIcon} src={shopDetail.logo} />
          <View className={styles.attentionShopInfo}>
            <View className={styles.attentionShopName}>
              {shopDetail.name && shopDetail.name.length <= 9 ? shopDetail.name : shopDetail.name.substring(0, 9) + '...'}
            </View>
            <View className={styles.attentionShopInformation}>
              {shopDetail.marginStatus === 1 && <Image className={styles.zhibao} src={require('~/images/qualityGuarantee.png')} />}
              <Stars grade={shopDetail.score} />
              <View className={styles.attentionCount}>{shopDetail.focus}人关注</View>
            </View>
          </View>
          <View
            className={classNames(styles.shopAttention, shopDetail.hasFocus === 1 ? styles.attentioned : '')}
            onClick={(ev) => {
              ev.stopPropagation()
              attentionShop()
            }}
          >
            {shopDetail.hasFocus === 0 ? '+关注' : '已关注'}
          </View>
        </View>
      )}
      <View className={styles.shopDetailTabs}>
        <View style={{ width: '246px' }}>
          <Tabber tabIndex={tabIndex} setTabIndex={setTabIndex} tabArr={tabberArr} isBottomTxt={false} />
        </View>
        <View
          className={styles.shopSearch}
          onClick={() => Taro.navigateTo({ url: `${routeNames.searchHomeSearch}?isShop=1${shopDetail.attributionType === 2 ? '&type=2' : ''}` })}
        >
          <Image className={styles.search} src={require('~/images/shop/search.png')} />
        </View>
      </View>
      {tabIndex === 1 && (
        <View className={styles.searchSort}>
          <View
            className={styles.sortWrap}
            onClick={() => setRequestData({ pageNum: 1, pageSize: 10, storeNo: shopDetail.storeNo, priceRank: '', saleRank: '' })}
          >
            <View className={styles.sortTitle}>综合</View>
            <Image className={styles.sortImg} src={require('~/images/home/defaultSort.png')} />
          </View>
          <View className={styles.sortWrap} onClick={() => setCondition('saleRank')}>
            <View className={styles.sortTitle}>销量</View>
            <Image
              className={styles.sortImg}
              src={
                { '': require('~/images/home/defaultSort.png'), desc: require('~/images/home/lowSort.png'), asc: require('~/images/home/highSort.png') }[
                  requestData.saleRank
                ]
              }
            />
          </View>
          <View className={styles.sortWrap} onClick={() => setCondition('priceRank')}>
            <View className={styles.sortTitle}>价格</View>
            <Image
              className={styles.sortImg}
              src={
                { '': require('~/images/home/defaultSort.png'), desc: require('~/images/home/lowSort.png'), asc: require('~/images/home/highSort.png') }[
                  requestData.priceRank
                ]
              }
            />
          </View>
          <View className={styles.sortWrap} onClick={() => setVisible(true)}>
            <View className={styles.sortTitle}>筛选</View>
            <Image className={styles.sortImg} src={require('~/images/shop/screen.png')} />
          </View>
        </View>
      )}
      {tabIndex === 0 && (
        <ShopIndex
          getAllCoupon={getAllCoupon}
          getAllGoods={getAllGoods}
          drawCoupon={drawCoupon}
          noticeList={noticeList}
          shopDetail={shopDetail}
          bannerList={bannerList}
          couponList={couponList}
          goodsList={goodsList}
        />
      )}
      {tabIndex === 1 && (
        <View className={styles.shopWrap}>
          <ScrollView scrollY className={styles.sview} lowerThreshold={150} onScrollToLower={() => update()}>
            <View className={styles.recommend} style={{ background: '#F6F8FA' }}>
              <View className={styles.recommendGood}>
                {allGoood &&
                  allGoood.length > 0 &&
                  allGoood.map((item, index) => {
                    return <GoodsItem goodsInfo={item} key={item.id} />
                  })}
              </View>
            </View>
          </ScrollView>
        </View>
      )}
      {tabIndex === 2 && (
        <View className={styles.shopWrap}>
          {/* <MMMenu onChange={onChange} changeLeft={getStaticClassifyRight} onMore={onMore} data={typeListLeft} data2={typeListRight} /> */}
        </View>
      )}
      {tabIndex === 3 && (
        <View className={styles.shopWrap}>
          <ScrollView scrollY className={styles.sview}>
            {shopDetail.liveRoom && shopDetail.liveRoom.length !== 0 && (
              <View className={styles.liveArr}>
                {/* 开播中 */}
                {/* TODO:: 缺少观看人数 是否预约字段 */}
                {shopDetail.liveRoom.map((item) => {
                  return item.isCurrent === true ? (
                    item.status === 1 ? (
                      <View key={item.id} className={styles.currentLive}>
                        <View className={styles.liveTop}>
                          <View className={styles.liveTitle}>
                            <Image className={styles.liveImg} src={require('~/images/live.png')} />
                            直播中
                          </View>
                          <View className={styles.liveCount}>{item.watchCount}人观看</View>
                        </View>
                        <View className={styles.currentLiveHint}>直播中...</View>
                        <View className={styles.currentLiveName}>{item.liveName}</View>
                      </View>
                    ) : (
                      <View key={item.id} className={styles.currentLive}>
                        <View className={classNames(styles.liveTop, styles.liveTopWait)}>
                          <View className={styles.liveTitle}>
                            <Image className={styles.liveImg} src={require('~/images/liveWait.png')} />
                            即将开播
                          </View>
                          <View className={styles.liveCount}>{item.countDown || ''}</View>
                        </View>
                        <View className={styles.liveBottom}>
                          <View className={styles.bottomName}>{item.liveName}</View>
                          <View className={styles.bottomHandle}>{item.receiveStatus === 1 ? '已预约' : '预约'}</View>
                        </View>
                      </View>
                    )
                  ) : item.status === 0 ? (
                    <View key={item.id} className={styles.attentionLive}>
                      {/* style={{ marginBottom: '113px' }} */}
                      <View className={styles.attentionLiveStatus}>
                        <Image className={styles.attentionLiveStatusImg} src={require('~/images/liveWait.png')} />
                        即将开播
                      </View>
                      <View className={styles.attentionLiveTime}>{item.liveTime}</View>
                      <View className={styles.attentionLiveHandle} style={{ height: '24px' }}>
                        <View className={styles.attentionLiveTitle}>{item.liveName}</View>
                        <View
                          className={styles.attentionLiveBtn}
                          style={{
                            marginTop: '16',
                            background: item.receiveStatus === 1 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.25)',
                            border: item.receiveStatus === 1 ? 0 : '1px solid #FFFFFF'
                          }}
                        >
                          {item.receiveStatus === 1 ? '已预约' : '预约'}
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View className={styles.attentionLive}>
                      <View className={styles.attentionLiveStatus} style={{ background: 'linear-gradient(90deg, #555555 0%, #333333 100%)' }}>
                        <Image className={styles.attentionLiveStatusImg} src={require('~/images/reset.png')} />
                        回放
                      </View>
                      <View className={styles.attentionLiveTime}>{item.liveTime}</View>
                      <View className={styles.attentionLiveHandle}>
                        <View className={styles.attentionLiveTitle} style={{ width: '100%' }}>
                          {item.roomTitle}
                        </View>
                      </View>
                    </View>
                  )
                })}
              </View>
            )}

            {shopDetail.liveRoom && !shopDetail.liveRoom.length && (
              <DefaultPage imgHeight="94px" imgSrc={require('~/images/noRecord.png')} defaultHint="商家未开启直播过~" />
            )}
          </ScrollView>
        </View>
      )}
      <MMModal
        visible={visible}
        justifyContent={MMModalJustifyContent.flexEnd}
        animationType={MMModalAnimationType.down}
        className={isNewIphone ? styles.shopCartPopup : styles.shopCartPopup1}
        onClose={() => setVisible(false)}
      >
        <View className={classNames(styles.wrap, isNewIphone ? styles.popWrap : styles.popWrap1)}>
          <View className={styles.warpTitle}>筛选</View>
          <View className={styles.wrapCont}>
            <View className={styles.group}>
              <View className={styles.groupTitle}>价格区间（元）</View>
              <View className={styles.groupWrap}>
                <Input className={styles.groupInput} value={minimumPrice.value} onInput={minimumPrice.onInput} placeholder="  " />
                <View className={styles.groupHint}>到</View>
                <Input className={styles.groupInput} value={highestPrice.value} onInput={highestPrice.onInput} placeholder="  " />
              </View>
            </View>
            <View className={styles.group}>
              <View className={styles.groupTitle}>一级分类</View>
              <View className={styles.groupWrap}>
                {classifyData &&
                  classifyData.map((item) => {
                    return (
                      <View
                        key={item.id}
                        onClick={() => setRequestData({ ...requestData, classifyId: item.id })}
                        className={classNames(styles.groupItem, requestData.classifyId === item.id ? styles.groupItemAct : '')}
                      >
                        {item.name}
                      </View>
                    )
                  })}
              </View>
            </View>
          </View>
          <View className={styles.wrapHandle}>
            <View className={styles.handleReset} onClick={() => resetSearch()}>
              重置
            </View>
            <View className={classNames(styles.handleReset, styles.handleSure)} onClick={() => handleSure()}>
              确定
            </View>
          </View>
          {isNewIphone && <View className="spacingIphone" />}
        </View>
      </MMModal>
      <MMPopup
        title="提示"
        visible={popFlag}
        onClose={() => setPopFlag(false)}
        onOk={onOk}
        cancelText="取消"
        okText="确定"
        children="您将取消直播间开播提醒，取消后将无法接收到提醒。 请问是否确定取消？"
        footer={true}
      />
      <ShopCoupon couponFlag={couponFlag} allCoupon={allCoupon} draw={drawCoupon} onClose={() => setCouponFlag(false)} />
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const ShopDetail = memo(Component)
export default ShopDetail
