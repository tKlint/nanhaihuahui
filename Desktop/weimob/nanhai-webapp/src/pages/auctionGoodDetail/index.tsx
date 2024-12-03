import Taro, { getCurrentInstance } from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { ScrollView, View, Image, RichText, Input, Radio } from '@tarojs/components'
import styles from './index.module.less'
import { IAuctionGoodDetailProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import classNames from 'classnames'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import { MMModalJustifyContent, MMModalAnimationType } from '~/modules/@wmeimob/taro-design/src/components/modal/const'
import Stars from '~/components/stars'
import { api } from '~/request'

const Component: FC<IAuctionGoodDetailProps> = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [auctionGood, setAuctionGood] = useState<any>({})

  useEffect(() => {
    getAuctionGood()
  }, [])
  async function getAuctionGood() {
    const { data = {} } = await api['/user/api/auctionGoods/auctionGoods/{goodsNo}_GET'](getCurrentInstance().router?.params.goodsNo as any)
    setAuctionGood(data)
  }
  function onClose() {}
  return (
    <View className={styles.auctionGoodDetailStyle}>
      <MMNavigation title="拍卖商品详情" />
      <View className={styles.auctionGoodDetailWrap}>
        <ScrollView scrollY className={styles.sview}>
          <View className={styles.auctionGoodDetail}>
            <View className={styles.auctionGoodShop}>
              <Image className={styles.shopImg} src={auctionGood.storeLogo} />
              <View className={styles.attention}>{auctionGood.isAttention === true ? '已关注' : '关注'}</View>
              <View className={classNames(styles.attention, styles.privateMessage)}>私信</View>
            </View>
            <View className={styles.auctionGood}>
              <View className={styles.attentionGoodName}>{auctionGood.storeName}</View>
              {/* 规格 */}
              {auctionGood.goodsSpecs &&
                auctionGood.goodsSpecs.length > 0 &&
                auctionGood.goodsSpecs.map((item) => {
                  return (
                    <View key={item.id} className={styles.auctionGoodBasic}>
                      {item.specDetail} {item.specName}
                    </View>
                  )
                })}

              <View className={styles.auctionGoodIntro}>
                <View className={styles.introTitle}>{auctionGood.goodsName}</View>
                <View className={styles.introCont}>
                  <RichText nodes={auctionGood.detail} />
                </View>

                {auctionGood.bannerImgUrls && (
                  <View className={styles.introImgs}>
                    {auctionGood.bannerImgUrls.split(',').map((item, index) => {
                      return <Image key={index} className={styles.img} src={item} />
                    })}
                  </View>
                )}
              </View>
              <View className={styles.attentionStatus}>
                <Image
                  className={styles.attentionImg}
                  src={
                    auctionGood.attentionStatus === 1 || auctionGood.attentionStatus === 3
                      ? require('~/images/attention/attention.png')
                      : require('~/images/attention/notStart.png')
                  }
                />
                <View
                  className={styles.attentionStatusTitle}
                  style={{ color: auctionGood.attentionStatus === 1 || auctionGood.attentionStatus === 3 ? '#666666' : '#FD4F53' }}
                >
                  {{ 1: '未开始竞拍', 2: '正在竞拍', 3: '竞拍结束' }[auctionGood.attentionStatus]}
                </View>
                {auctionGood.attentionStatus === 2 && <View className={styles.attentionStatusDesc}>距离结束：00时00分50秒</View>}
              </View>
              <View className={styles.attentionInfo}>加价幅度：¥{auctionGood.minimumPrisePrice}</View>
              <View className={styles.attentionInfo}>配送至：{auctionGood.address}</View>
              <View className={styles.attentionInfo}>预估运费：{auctionGood.freight === 0 ? '免运费' : auctionGood.freight}</View>
              {auctionGood.auctionWorkGoodsDetails &&
                auctionGood.auctionWorkGoodsDetails.length > 0 &&
                auctionGood.auctionWorkGoodsDetails.map((item) => {
                  return (
                    <View key={item.id} className={styles.attentionParticipant}>
                      <Image className={styles.headImg} src={item.headImg} />
                      <View className={styles.member}>
                        <View className={styles.memberName}>{item.userName}</View>
                        <View className={styles.bid}>¥{item.offerPrice}</View>
                        <View className={styles.time}>{item.offerPriceTime}</View>
                      </View>
                      {item.activityStatus && (
                        <Image
                          className={styles.articipantStatus}
                          src={
                            {
                              1: require('~/images/attention/lead.png'),
                              0: require('~/images/attention/out.png'),
                              3: require('~/images/attention/bargain.png')
                            }[item.articipantStatus]
                          }
                        />
                      )}
                    </View>
                  )
                })}
            </View>
          </View>
          <View className={styles.attentionDescription}>
            <View className={styles.descriptionTop}>
              <View className={styles.attentionDescriptionTitle}>拍卖说明</View>
              <View className={styles.attentionDescriptionHandle} onClick={() => Taro.navigateTo({ url: '/pages/mine/allRule/index' })}>
                详细说明 <Image className={styles.extra} src={require('~/images/tabberMine/extra.png')} />
              </View>
            </View>
            <View className={styles.flow}>
              <View className={styles.flowItem}>
                <Image className={styles.flowImg} src={require('~/images/attention/flowOne.png')} />
                <View className={styles.flowTxt}>参与出价</View>
              </View>
              <Image className={styles.flowProgress} src={require('~/images/attention/progress.png')} />
              <View className={styles.flowItem}>
                <Image className={styles.flowImg} src={require('~/images/attention/flowOne.png')} />
                <View className={styles.flowTxt}>价高者得</View>
              </View>
              <Image className={styles.flowProgress} src={require('~/images/attention/progress.png')} />
              <View className={styles.flowItem}>
                <Image className={styles.flowImg} src={require('~/images/attention/flowOne.png')} />
                <View className={styles.flowTxt}>支付贷款</View>
              </View>
              <Image className={styles.flowProgress} src={require('~/images/attention/progress.png')} />
              <View className={styles.flowItem}>
                <Image className={styles.flowImg} src={require('~/images/attention/flowOne.png')} />
                <View className={styles.flowTxt}>获得宝贝</View>
              </View>
            </View>
          </View>
          <View className={styles.attentionShop}>
            <Image className={styles.attentionShopIcon} src={auctionGood.shopIcon} />
            <View className={styles.attentionShopInfo}>
              <View className={styles.attentionShopName}>{auctionGood.shopName}</View>
              <View className={styles.attentionShopInformation}>
                {auctionGood.isQuality === true && <Image className={styles.zhibao} src={require('~/images/qualityGuarantee.png')} />}
                <Stars grade={5} />
                <View className={styles.attentionCount}>{auctionGood.attentionCount}人关注</View>
              </View>
            </View>

            <View className={styles.toShop}>进店</View>
          </View>
        </ScrollView>
      </View>
      <View className={styles.auctionGoodHandle}>
        <View className={styles.handleLeft}>
          <View className={styles.handleItem}>
            <Image className={styles.handleImg} src={require('~/images/attention/shop.png')} />
            <View className={styles.handleTxt}> 店铺</View>
          </View>
          <View className={styles.handleItem}>
            <Image className={styles.handleImg} src={require('~/images/shareIcon.png')} />
            <View className={styles.handleTxt}> 分享</View>
          </View>
          <View className={styles.handleItem}>
            <Image className={styles.handleImg} src={require('~/images/attention/zixun.png')} />
            <View className={styles.handleTxt}> 咨询</View>
          </View>
        </View>
        <View className={styles.handle} onClick={() => setVisible(true)}>
          出个价
        </View>
      </View>
      <MMModal
        visible={visible}
        justifyContent={MMModalJustifyContent.flexEnd}
        animationType={MMModalAnimationType.down}
        className={styles.shopCartPopup}
        onClose={onClose}
      >
        <View className={styles.popWrap}>
          <View className={styles.popTitle}>邀您出价</View>
          <View className={styles.startPrice}>起拍价：￥10.00</View>
          <View className={styles.priceInput}>
            <View className={styles.priceInputItem}>
              ￥ <Input className={styles.Input} placeholder="66" placeholderStyle="color:#333; " />
              <Image className={styles.priceIcon} src={require('~/images/attention/bidIcon.png')} />
            </View>
          </View>
          <View className={styles.bidHandle}>确定出价</View>
          <View className={styles.bidSure}>
            {/* checked={value === item.id} disabled={disbaled(item, index)} */}
            <View className={styles.radio} />
            《XXX交易服务用户协议》《隐私保护协议》
          </View>
        </View>
      </MMModal>
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const AuctionGoodDetail = memo(Component)
export default AuctionGoodDetail
