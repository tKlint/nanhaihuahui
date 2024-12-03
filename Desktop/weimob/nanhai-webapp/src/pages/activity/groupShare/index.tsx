/* eslint-disable no-nested-ternary */
import Taro, { getCurrentInstance, useEffect } from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import styles from './index.module.less'
import { IGroupShareProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { api } from '~/request'
import { Goods, GroupWork, Order } from '~/request/data-contracts'
import useCountDown from '~/hook/useCountDown'

const Component: FC<IGroupShareProps> = () => {
  const [goodsDetail, setGoodsDetail] = useState<Goods>({})
  const [groupDetail, setGroupDetail] = useState<GroupWork>({})

  useEffect(() => {
    getDetail()
  }, [])

  async function getDetail() {
    const { data = {} } = await api['/user/api/activity/groups/share/_GET']({
      groupWorkId: getCurrentInstance().router?.params.groupWorkId!,
      goodsNo: getCurrentInstance().router?.params.goodsNo!
    })
    setGoodsDetail(data.goods!)
    setGroupDetail(data)
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
  return (
    <View className={styles.groupShareStyle}>
      <MMNavigation title="分享" />
      <View className={styles.groupShare}>
        <View className={styles.groupShareGood} style={{ background: `url(${goodsDetail.coverImgUrl}) no-repeat`, backgroundSize: '100% 100%' }} />
        <View className={styles.groupShareGoodInfo}>
          <View className={styles.groupShareGoodName}>{goodsDetail.goodsName}</View>
          {/* <View className={styles.groupShareGoodSpec}>已选：{goodsDetail.skuName}</View> */}
          <View className={styles.groupShareGoodDesc}>{goodsDetail.goodsSketch}</View>
        </View>
        <View className={styles.groupShareInfo}>
          <View className={styles.groupShareInfoPhoto}>
            {groupDetail.orderGroupWorkItem &&
              groupDetail.orderGroupWorkItem.map((item) => {
                return (
                  <View key={item.id} className={styles.photo}>
                    <Image className={styles.photoImg} src={item.headImg!} />
                    {item.captain === 1 && <View className={styles.owner}>拼主</View>}
                  </View>
                )
              })}

            <View className={styles.photo}>
              <Image className={styles.photoImg} src={require('~/images/goodImg.png')} />
            </View>
            {groupDetail.joinedPersonsCount !== 0 && (
              <View className={styles.photo}>
                <Image className={styles.photoImg} src={require('~/images/orders/groupMemberDefault.png')} />
              </View>
            )}
          </View>
          {groupDetail.groupGoodsStatus === 0 ? (
            <View className={styles.groupShareHint}>
              等你来开团，仅限 <Text style={{ color: '#FD4F53' }}>{groupDetail.groupNum}</Text> 个名额
            </View>
          ) : groupDetail.groupGoodsStatus === 1 ? (
            <View className={styles.groupShareHint}>
              {groupDetail.groupNum}人成团，剩下 <Text style={{ color: '#FD4F53' }}>{groupDetail.groupNum! - groupDetail.joinedPersonsCount!}</Text> 个名额
            </View>
          ) : groupDetail.groupGoodsStatus === 3 ? (
            <View className={styles.groupShareHint} style={{ marginBottom: '69px' }}>
              本期拼团活动失败，未达到制定人
            </View>
          ) : (
            <View className={styles.groupShareHint} style={{ marginBottom: '69px' }}>
              拼团已成功
            </View>
          )}
          {groupDetail.groupGoodsStatus !== 3 && groupDetail.groupGoodsStatus !== 2 && (
            <View className={styles.groupShareCount}>
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

              <View className={styles.groupShareCountHint}>后{groupDetail.groupGoodsStatus === 0 ? '开始' : '结束'}</View>
            </View>
          )}
          <View className={styles.groupShareCode}>
            <Image className={styles.code} src={groupDetail.groupWorkShareImg!} />
            <View className={styles.codeHint}>长按识别图中二维码 立即加入拼团</View>
          </View>
        </View>
      </View>
    </View>
  )
}

const GroupShare = memo(Component)
export default GroupShare
