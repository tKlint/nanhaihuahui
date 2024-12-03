/* eslint-disable react/no-children-prop */
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { Swiper, SwiperItem, View, Text, Image, RichText, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { IGoodDetailProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import classNames from 'classnames'
import MMPopup from '~/components/popup'
import { Goods, GroupWork } from '~/request/data-contracts'
import { api } from '~/request'
import classnames from '~/modules/@wmeimob/utils/src/react-native/classnames'
import useCountDown from '~/hook/useCountDown'

const Component: FC<IGoodDetailProps> = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [popFlag, setPopFlag] = useState<boolean>(false)
  const [goodsDetail, setGoodsDetail] = useState<Goods>({})
  const [groupDetail, setGroupDetail] = useState<GroupWork>({})
  const [scrollIndex, setScrollIndex] = useState(1)

  useEffect(() => {
    getDetail()
  }, [])

  async function getDetail() {
    const { data = {} } = await api['/user/api/activity/goods/detail/_GET']({
      groupWorkId: getCurrentInstance().router?.params.groupWorkId!,
      goodsNo: getCurrentInstance().router?.params.goodsNo!
    })
    setGoodsDetail(data.goods!)
    setGroupDetail(data)
  }
  const onChange = (val) => {
    setScrollIndex(val.target.current + 1)
  }

  const { day, minute, hour, seconds } = useCountDown({
    endTime: groupDetail.groupGoodsStatus === 0 ? groupDetail.startTime : (groupDetail.endTime as any),
    onTimeEnd: onEnd
  })

  function onEnd() {
    if (groupDetail.groupGoodsStatus === 1) {
      setTimeout(() => {
        getDetail()
      }, 200)
    }
  }
  function onClose() {}
  function onOk() {}
  return (
    <View className={styles.goodDetailStyle}>
      <MMNavigation title="商品名称" />
      <View className={styles.goodDetail}>
        <ScrollView scrollY className={styles.sview}>
          {/* indicator-dots={true} */}
          <View className={styles.index}>
            {scrollIndex}/{goodsDetail.bannerImgUrls! && goodsDetail.bannerImgUrls!.split(',').length}
          </View>
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
              <View className={styles.currentPrice}>拼团价：￥{goodsDetail.salesPrice}</View>
              <View className={styles.prePrice}>
                原价：<Text>￥{goodsDetail.originPrice}</Text>
              </View>
            </View>
            <View className={styles.groupStatus}>{{ 0: '开启拼团', 1: '加入拼团', 2: '拼团成功', 3: '已过期' }[groupDetail.groupGoodsStatus!] || ''}</View>
          </View>
          <View className={styles.goodInfo}>
            <View className={styles.goodInfoTop}>
              <View className={styles.topLeft}>
                {groupDetail.groupNum}人成团｜<Text style={{ color: '#FD4F53' }}>已拼{groupDetail.joinedPersonsCount}人</Text>
              </View>
              <View className={styles.topRight}>
                <View
                  className={styles.groupShareTime}
                  style={{ background: `url(${require('~/images/countDownBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}
                >
                  {hour}
                </View>
                <View className={styles.groupShareCountColon}>:</View>
                <View
                  className={styles.groupShareTime}
                  style={{ background: `url(${require('~/images/countDownBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}
                >
                  {minute}
                </View>
                <View className={styles.groupShareCountColon}>:</View>
                <View
                  className={styles.groupShareTime}
                  style={{ background: `url(${require('~/images/countDownBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}
                >
                  {seconds}
                </View>

                <View className={styles.groupShareCountHint}>{groupDetail.groupGoodsStatus === 0 ? '后开始' : '后结束'}</View>
              </View>
            </View>
            <View className={styles.goodName}>{goodsDetail.goodsName}</View>
            <View className={styles.goodDesc}>{goodsDetail.goodsSketch}</View>
          </View>
          <View className={styles.detail}>
            <View className={styles.detailTop}>
              <Image className={styles.topImg} src={require('~/images/tabberMine/titleIcon.png')} />
              <View className={styles.topTitle}>商品详情</View>
            </View>
            <RichText nodes={goodsDetail.detail} />
          </View>
        </ScrollView>
      </View>
      <View className={styles.goodBottom}>
        <View className={styles.goodShare}>
          <Image className={styles.shareImg} src={require('~/images/shareIcon.png')} />
          <View className={styles.shareTitle}>分享</View>
        </View>
        {/* 过期 失效 开启拼团 样式加 goodHandleElse */}
        <View className={classnames(styles.goodHandle, [0, 2, 3].includes(groupDetail.groupGoodsStatus!) ? styles.goodHandleElse : '')}>
          加入拼团
          {{ 0: '开启拼团', 1: '加入拼团', 2: '拼团失效', 3: '拼团过期' }[groupDetail.groupGoodsStatus!] || ''}
          {/* 开启拼团 */}
        </View>
      </View>
      <MMPopup
        title="开启拼团"
        visible={visible}
        onClose={() => setVisible(false)}
        onOk={onOk}
        cancelText="暂不开团"
        okText="立即开团"
        children="开启拼团后，您需要先支付费用，成团后商家发货；如若未成团，则退还您支付的费用。您确定开启拼团？"
        footer={true}
      />

      <MMPopup
        title="提示"
        visible={popFlag}
        onClose={() => setPopFlag(false)}
        onOk={onOk}
        okText="好的"
        children={
          { 0: '拼团还未开始，暂时不能开启拼团', 2: '拼团活动已结束，您无法加入拼团', 3: '拼团活动已过期，您无法加入拼团' }[groupDetail.groupGoodsStatus!] || ''
        }
        footer={true}
      />
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const GoodDetail = memo(Component)
export default GoodDetail
