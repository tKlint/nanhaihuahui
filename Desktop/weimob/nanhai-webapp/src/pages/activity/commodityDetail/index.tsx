import Taro, { getCurrentInstance } from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { Swiper, SwiperItem, View, Text, Image, RichText, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { IGoodDetailProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import classNames from 'classnames'
import Tabber from '~/components/tabber'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import SharePage from '~/components/sharePage'
import { api } from '~/request'
import { CouponDetail, Goods, Store } from '~/request/data-contracts'
import Stars from '~/components/stars'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import { MMModalJustifyContent, MMModalAnimationType } from '~/modules/@wmeimob/taro-design/src/components/modal/const'
import SkuPopup from '~/components/skuPopup'

const Component: FC<IGoodDetailProps> = () => {
  const [scrollIndex, setScrollIndex] = useState(1)
  const [tabIndex, setTabIndex] = useState(0)

  const [visible, setVisible] = useState<boolean>(false)
  const [tabArr, setTabArr] = useState([
    {
      id: 0,
      title: '详情'
    },
    {
      id: 1,
      title: '评价'
    }
  ])
  // 商品信息
  const [goodsDetail, setGoodsDetail] = useState<Goods>({ bannerImgUrls: '' })
  // 店铺信息
  const [storeInfo, setStoreInfo] = useState<Store>({})
  // 收藏人数
  const [collectNum, setCollectNum] = useState<number>(0)
  // 是否收藏
  const [isCollect, setisCollect] = useState<boolean>(false)
  // 优惠券相关
  const [couponFlag, setCouponFlag] = useState<boolean>(false)
  const [couponDetails, setcouponDetails] = useState<CouponDetail[]>([])
  // 规格相关
  const [showSkuPop, setShowSkuPop] = useState<boolean>(false)
  const [chooseSkuNo, setChooseSkuNo] = useState<string>('')
  const [chooseSkuNum, setChooseSkuNum] = useState<number>(0)

  useEffect(() => {
    getGoodDetail()
  }, [])
  const onChange = (val) => {
    setScrollIndex(val.target.current + 1)
  }
  function onClose() {}

  async function getGoodDetail() {
    const { data = {} } = await api['/user/api/goods/detail_GET']({
      storeNo: getCurrentInstance().router?.params.storeNo,
      goodsNo: getCurrentInstance().router?.params.goodsNo,
      source: 0 as any
    })
    setGoodsDetail(data.goods!)
    setStoreInfo(data.store!)
    setCollectNum(data.collectNum!)
    setisCollect(data.isCollect!)
    setcouponDetails(data.couponDetails!)
  }

  // 领取优惠券
  async function drawCoupon(item, flag) {
    if (!flag) {
      return
    }
    const { data } = await api['/user/api/store/coupons/{couponNo}_POST'](item.couponNo)
    // 领取之后要刷新优惠券状态
    setCouponFlag(false)
  }

  function handleSkuConfirm() {}
  return (
    <View className={styles.goodDetailStyle}>
      {goodsDetail.isDel === 0 && <MMNavigation title="详情" />}
      {goodsDetail.isDel === 0 ? (
        <View className={styles.goodDetail}>
          <ScrollView scrollY className={styles.sview}>
            <View className={styles.index}>
              {scrollIndex}/{goodsDetail.bannerImgUrls!.split(',').length}
            </View>
            {/* indicator-dots={true} */}
            <Swiper autoplay style={{ height: '260px', width: '100%', marginBottom: '-10px' }} onChange={onChange}>
              {goodsDetail.bannerImgUrls! &&
                goodsDetail.bannerImgUrls!.split(',').map((item: any, index) => {
                  return (
                    <SwiperItem className={styles.swiperItem} key={item + index}>
                      <View className={styles.goodImg} style={{ background: `url(${item}) no-repeat`, backgroundSize: '100% 100%' }} />
                    </SwiperItem>
                  )
                })}
            </Swiper>
            <View className={styles.goodGroupInfo}>
              <View className={styles.goodPrice}>
                <View className={styles.currentPrice}>
                  ￥{goodsDetail.salesPrice}
                  <Text className={styles.prePrice}>
                    原价：<Text>￥{goodsDetail.minimumPrisePrice}</Text>
                  </Text>
                </View>
              </View>
              <View className={styles.prePrice}>成交{goodsDetail.totalSales}笔</View>
            </View>
            <View className={styles.goodInfo}>
              <View className={styles.goodName}>{goodsDetail.goodsName}</View>
              <View className={styles.goodInfoImg}>
                {isCollect === false ? <Image src={require('~/images/xin.png')} /> : <Image src={require('~/images/xined.png')} />}
                <View>{collectNum}</View>
              </View>
            </View>
            <View className={styles.discount}>
              <View>优惠券</View>
              <Image src={require('~/images/moreIcon.png')} onClick={() => couponDetails && couponDetails.length > 0 && setCouponFlag(true)} />
            </View>
            <View className={styles.discount} onClick={() => setShowSkuPop(true)}>
              {/* goodsDetail && goodsDetail.goodsSkuDetailList && goodsDetail.goodsSkuDetailList.length > 0 && */}
              <View>选择规格</View>
              <Image src={require('~/images/moreIcon.png')} />
            </View>
            <View className={styles.shop}>
              <Image className={styles.left} src={storeInfo.logo!} />
              <View className={styles.center}>
                <View className={styles.title}>{storeInfo.name}</View>
                <View>
                  {storeInfo.marginStatus === 1 && <Image src={require('~/images/qualityGuarantee.png')} />}
                  <Stars grade={storeInfo.score!} />
                  <Text>{storeInfo.focus}人关注</Text>
                </View>
              </View>
              <View className={styles.right}> 进店</View>
            </View>
            <Tabber
              tabArr={tabArr}
              tabberCurBg="linear-gradient(90deg, #FF7132 0%, #FC2C77 100%)"
              tabIndex={tabIndex}
              setTabIndex={(val) => setTabIndex(val)}
            />
            {/* 详情 */}
            {tabIndex === 0 && <RichText nodes={goodsDetail.detail} />}
            {/*  */}
            {/* 评价 */}
            {tabIndex === 1 && (
              <View className={styles.evaluate}>
                {goodsDetail &&
                  goodsDetail.evaluateList &&
                  goodsDetail.evaluateList.map((item: any, index) => {
                    return (
                      <View key={index} className={styles.box}>
                        <View className={styles.head}>
                          <Image className={styles.left} src={item.img} />
                          <View className={styles.center}>
                            <View className={styles.title}>{item.title}</View>
                            <View className={styles.time}>{item.time}</View>
                          </View>
                          <View className={styles.right}>
                            <Stars grade={4} />
                          </View>
                        </View>
                        <View className={styles.content}>{item.content}</View>
                        {item.imgList.map((items: any, indexs) => {
                          return (
                            <Image className={styles.listImg} style={{ margin: (indexs + 1) % 3 === 2 ? '1.5px 3px' : '1.5px 0' }} key={indexs} src={items} />
                          )
                        })}
                      </View>
                    )
                  })}
              </View>
            )}
            <View className={styles.base}>到底啦～</View>
          </ScrollView>
        </View>
      ) : (
        <View>
          <MMNavigation title="商品不存在" />
          <View className={styles.noGood}>
            <Image src={require('~/images/noGood.png')} />
            <View>商品过期不存在</View>
          </View>
        </View>
      )}
      {goodsDetail.isDel === 0 && (
        <View className={styles.goodBottom}>
          <View className={styles.goodShare}>
            <Image className={styles.shareImg} src={require('~/images/shop.png')} />
            <View className={styles.shareTitle}>店铺</View>
          </View>
          <View className={styles.goodShare}>
            <Image className={styles.shareImg} src={require('~/images/shareIcon.png')} />
            <View className={styles.shareTitle}>分享</View>
          </View>
          <View className={styles.goodShare}>
            <Image className={styles.shareImg} src={require('~/images/service.png')} />
            <View className={styles.shareTitle}>咨询</View>
          </View>
          {goodsDetail.isShelved === 0 && (
            <View className={styles.goodHandle} style={{ color: '#FD4F53', background: '#fff', border: '1px solid #FD4F53' }}>
              加入购物车
            </View>
          )}

          <View className={classNames(styles.goodHandle, goodsDetail.isShelved === 0 ? '' : styles.noGoodHandle)}>
            {goodsDetail.isShelved === 0 ? '立即购买' : '商品已下架'}
          </View>
        </View>
      )}
      <SharePage visible={visible} onClose={() => onClose()} />
      <MMModal visible={couponFlag} justifyContent={MMModalJustifyContent.flexEnd} animationType={MMModalAnimationType.down} onClose={onClose}>
        <View className={styles.checkListWrap}>
          <View className={styles.checkListTitle}>
            <View className={styles.checkTitle}>选择优惠券</View>
            <Image className={styles.checkClose} onClick={() => setCouponFlag(false)} src={require('~/images/close.png')} />
          </View>
          <ScrollView enableFlex scrollY style={{ maxHeight: '450px' }}>
            {couponDetails &&
              couponDetails.map((item) => {
                return (
                  <View
                    key={item.id}
                    className={styles.couponItem}
                    style={{ background: `url(${require('~/images/couponBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}
                  >
                    <View className={styles.couponType}>
                      <View className={styles.couponPrice}>¥{item.price}</View>
                      <View className={styles.couponTypeName}>{{ 0: '满减', 1: '满折' }[item.couponType!] || ''}券</View>
                    </View>
                    <View className={styles.couponInfo}>
                      <View className={styles.couponName}>{item.name}</View>
                      <View className={styles.couponTime}>
                        {item.usePeriod === 0 ? item.termStart + '~' + item.termEnd : '有效天数' + item.expDayCount + '天'}{' '}
                      </View>
                    </View>
                    <View className={item.userReceiveStatus === 0 ? styles.draw : styles.drawed} onClick={() => drawCoupon(item, item.userReceiveStatus === 0)}>
                      {{ 0: '领取', 1: '已领取', 2: '已抢完' }[item.userReceiveStatus!]}
                    </View>
                  </View>
                )
              })}
            {/* <View className={styles.couponItem} style={{ background: `url(${require('~/images/couponBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}>
              <View className={styles.couponType}>
                <View className={styles.couponPrice}>¥10</View>
                <View className={styles.couponTypeName}>满减券</View>
              </View>
              <View className={styles.couponInfo}>
                <View className={styles.couponName}>优惠券名称</View>
                <View className={styles.couponTime}>2021.01.21 ~2021.05.21</View>
              </View>
              <View className={styles.draw}>领取</View>
            </View>
            <View className={styles.couponItem} style={{ background: `url(${require('~/images/couponBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}>
              <View className={styles.couponType}>
                <View className={styles.couponPrice}>¥10</View>
                <View className={styles.couponTypeName}>满减券</View>
              </View>
              <View className={styles.couponInfo}>
                <View className={styles.couponName}>优惠券名称</View>
                <View className={styles.couponTime}>2021.01.21 ~2021.05.21</View>
              </View>
              <View className={styles.drawed}>已领取</View>
            </View> */}
            {isNewIphone && <View className="spacingIphone" />}
          </ScrollView>
        </View>
      </MMModal>
      <SkuPopup
        visible={showSkuPop}
        skuNo={chooseSkuNo}
        quantity={chooseSkuNum}
        storeNo={goodsDetail.storeNo}
        mallGoodsSpecs={goodsDetail.goodsSpecList}
        goodsSkuWebVoList={goodsDetail.goodsSkuDetails}
        onClose={() => setShowSkuPop(false)}
        onComfirm={handleSkuConfirm}
      />
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const CommodityDetail = memo(Component)
export default CommodityDetail
