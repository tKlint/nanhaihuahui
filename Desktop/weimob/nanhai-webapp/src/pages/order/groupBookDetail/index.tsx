import Taro, { getCurrentInstance } from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import styles from './index.module.less'
import { IGroupBookDetailProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import OrderAddress from '~/components/orderAddress'
import OrderGood from '~/components/orderGood'
import classNames from 'classnames'
import { Order } from '~/request/data-contracts'
import { api } from '~/request'

const Component: FC<IGroupBookDetailProps> = () => {
  const [groupOrder, setGroupDetail] = useState<Order>({})
  const [address, setAddress] = useState<any>({})
  const groupStatusIcon = {
    1: `${require('~/images/orders/groupIng.png')}`,
    3: `${require('~/images/orders/groupFail.png')}`,
    2: `${require('~/images/orders/groupSuccess.png')}`
  }
  const groupStatusTitle = {
    1: '拼团中',
    3: '拼团失败',
    2: '拼团成功'
  }
  const groupStatusHint = {
    1: '',
    3: '拼团失败，钱款将原路返回',
    2: '恭喜您，拼团成功，货物将尽快为您送达哦～'
  }

  useEffect(() => {
    getDetail()
  }, [])

  async function getDetail() {
    const { data = {} } = await api['/user/api/activity/groups/order/{orderNo}_GET'](getCurrentInstance().router?.params.orderNo!)

    setGroupDetail(data)
    setAddress({
      receiverAddress: data.receiverAddress,
      receiverArea: data.receiverArea,
      receiverMobile: data.receiverMobile,
      receiverName: data.receiverName,
      receiverProvince: data.receiverProvince
    })
  }

  return (
    <View className={styles.groupBookDetailStyle}>
      <MMNavigation title="拼团订单详情" />
      <View className={styles.groupBookDetail}>
        <View className={styles.groupBookDetailStatus}>
          <View className={styles.groupBookDetailStatusLeft}>
            <View className={styles.groupBookDetailStatusImgWrap}>
              <Image className={styles.groupBookDetailStatusImg} src={groupStatusIcon[groupOrder.groupWorkStatus]} />
              <View className={styles.groupBookDetailStatusHint}>{groupStatusTitle[groupOrder.groupWorkStatus]}</View>
            </View>
            {groupOrder.groupWorkStatus === 1 && <Text className={styles.waitSuccess}>支付成功，等待成团</Text>}
          </View>
          <View className={styles.groupBookDetailStatusTitle}>
            {groupStatusHint[groupOrder.groupWorkStatus] || ''}
            {groupOrder.groupWorkStatus === 1 ? groupOrder.gmtCreate : ''}
          </View>
        </View>
        <OrderAddress addressInfo={address} />
        <View className={styles.groupBookGood}>
          <OrderGood goodsInfo={groupOrder.orderGoods} />
        </View>
        <View className={styles.groupBookMember}>
          <View className={styles.members}>
            {groupOrder.orderGroupWorkItem &&
              groupOrder.orderGroupWorkItem.length > 0 &&
              groupOrder.orderGroupWorkItem.map((item, index) => {
                return index <= 2 && <Image key={item.id} className={styles.membersImg} src={item.headImg!} />
              })}

            <View className={styles.groupOwner}>拼主</View>
          </View>
          <View className={styles.invite}>
            邀请好友拼单
            <Image className={styles.inviteImg} src={require('~/images/tabberMine/extra.png')} />
          </View>
        </View>
        <View className={styles.orderMessage}>
          <View className={styles.orderMessageItem}>
            <View className={styles.orderMessageItemLeft}>应付金额：</View>
            <View className={styles.orderMessageItemRight}>¥{groupOrder.payShouldAmount}</View>
          </View>
          <View className={styles.orderMessageItem}>
            <View className={styles.orderMessageItemLeft}>商品数量：</View>
            <View className={styles.orderMessageItemRight}>x{groupOrder.orderGoods?.saleQuantity}</View>
          </View>
          <View className={styles.orderMessageItem}>
            <View className={styles.orderMessageItemLeft}>运费</View>
            <View className={styles.orderMessageItemRight}> {groupOrder.deliveryShouldAmount}</View>
          </View>
          <View className={styles.orderMessageItem}>
            <View className={styles.orderMessageItemLeft}>实付金额：</View>
            <View className={classNames(styles.orderMessageItemRight, styles.reduceValue)}>¥{groupOrder.payAmount!}</View>
          </View>
        </View>
        <View className={styles.orderMessage}>
          <View className={styles.orderMessageItem}>
            <View className={styles.orderMessageItemLeft}>订单编号</View>
            <View className={styles.orderMessageItemRight}>{groupOrder.orderNo}</View>
          </View>
          <View className={styles.orderMessageItem}>
            <View className={styles.orderMessageItemLeft}>创建时间：</View>
            <View className={styles.orderMessageItemRight}>{groupOrder.gmtCreate}</View>
          </View>
          <View className={styles.orderMessageItem}>
            <View className={styles.orderMessageItemLeft}>支付时间：</View>
            <View className={styles.orderMessageItemRight}>{groupOrder.payTime}</View>
          </View>
          {groupOrder.groupWorkStatus === 3 && (
            <View className={styles.orderMessageItem}>
              <View className={styles.orderMessageItemLeft}>失败时间：</View>
              <View className={styles.orderMessageItemRight}>{groupOrder.closeTime}</View>
            </View>
          )}
          {groupOrder.groupWorkStatus === 2 && (
            <View className={styles.orderMessageItem}>
              <View className={styles.orderMessageItemLeft}>成功时间：</View>
              <View className={styles.orderMessageItemRight}>{groupOrder.completionTime}</View>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

const GroupBookDetail = memo(Component)
export default GroupBookDetail
