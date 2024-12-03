import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { IOrderDetailProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import classNames from 'classnames'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import OrderGood from '~/components/orderGood'
import OrderAddress from '~/components/orderAddress'

const Component: FC<IOrderDetailProps> = () => {
  const [orderDetail, setOrderDetail] = useState<any>({
    orderStatus: 1,
    shopIcon: `${require('~/images/icinfor_img.png')}`,
    shopName: '店铺名称',
    goods: [{}, {}],
    totalAmount: 189,
    freight: 10,
    discounts: 20,
    actualAmount: 100,
    orderNo: '2017122215030005927',
    submitTime: '2022-01-02 11:22:00',
    payTime: '2022-01-02 11:22:00',
    payTransaction: '22222211111',
    remark: '备注信息备注信息备注信息备注信息',
    summation: 122
  })
  const orderStatusIcon = {
    0: `${require('~/images/orders/waitPay.png')}`,
    1: `${require('~/images/orders/waitDeliver.png')}`,
    2: `${require('~/images/orders/waitRecive.png')}`,
    3: `${require('~/images/orders/complete.png')}`,
    4: `${require('~/images/orders/orderClose.png')}`
  }
  const orderStatusTitle = {
    0: '待支付',
    1: '待发货',
    2: '待收货',
    3: '交易完成',
    4: '交易关闭'
  }
  const orderDetailStatusHint = {
    0: '请在 00:15:39 前结算',
    1: '卖家将尽快为您发货',
    2: '卖家已发货',
    3: '卖家已发货',
    4: '已为您退款'
  }
  return (
    <View className={styles.orderDetailStyle}>
      <MMNavigation title="订单详情" />
      <View className={styles.orderDetail}>
        <ScrollView scrollY className={styles.sview}>
          <View className={styles.orderDetailStatus}>
            <Image className={styles.orderDetailStatusIcon} src={orderStatusIcon[orderDetail.orderStatus]} />
            <Text className={styles.orderDetailStatusTitle}>{orderStatusTitle[orderDetail.orderStatus]}</Text>
            <Text className={styles.orderDetailStatusHint}>{orderDetailStatusHint[orderDetail.orderStatus]}</Text>
          </View>
          <OrderAddress />
          <View className={styles.orderInfo}>
            <View className={styles.orderShop}>
              <Image className={styles.orderShopImg} src={orderDetail.shopIcon} />
              <View className={styles.orderShopName}>{orderDetail.shopName}</View>
              <View className={styles.concatShop}>联系商家</View>
            </View>
            {orderDetail.goods.map((item, index) => {
              return <OrderGood key={index} />
            })}

            <View className={styles.orderHandle}>
              <View className={styles.orderHandleBtn} onClick={() => Taro.navigateTo({ url: '/pages/order/appeal/index' })}>
                申诉
              </View>
              <View className={styles.orderHandleBtn} onClick={() => Taro.navigateTo({ url: '/pages/order/afterSale/index' })}>
                申请退款
              </View>
              <View className={styles.orderHandleBtn1}>退款中</View>
            </View>
          </View>
          <View className={styles.orderMessage}>
            <View className={styles.orderMessageItem}>
              <View className={styles.orderMessageItemLeft}>商品总计</View>
              <View className={styles.orderMessageItemRight}>¥{orderDetail.totalAmount}</View>
            </View>
            <View className={styles.orderMessageItem}>
              <View className={styles.orderMessageItemLeft}>运费</View>
              <View className={classNames(styles.orderMessageItemRight, styles.reduceValue)}>-¥{orderDetail.freight}</View>
            </View>
            <View className={styles.orderMessageItem}>
              <View className={styles.orderMessageItemLeft}>商品优惠</View>
              <View className={classNames(styles.orderMessageItemRight, styles.reduceValue)}>-¥{orderDetail.discounts}</View>
            </View>
            <View className={styles.orderMessageItem}>
              <View className={styles.orderMessageItemLeft}>实付金额</View>
              <View className={styles.orderMessageItemRight}>¥{orderDetail.actualAmount}</View>
            </View>
          </View>
          <View className={styles.orderMessage}>
            <View className={styles.orderMessageItem}>
              <View className={styles.orderMessageItemLeft}>订单编号</View>
              <View className={styles.orderMessageItemRight}>{orderDetail.orderNo}</View>
            </View>
            <View className={styles.orderMessageItem}>
              <View className={styles.orderMessageItemLeft}>提单时间</View>
              <View className={styles.orderMessageItemRight}>{orderDetail.submitTime}</View>
            </View>
            {orderDetail.orderStatus !== 0 && (
              <View className={styles.orderMessageItem}>
                <View className={styles.orderMessageItemLeft}>支付时间</View>
                <View className={styles.orderMessageItemRight}>{orderDetail.payTime}</View>
              </View>
            )}{' '}
            {orderDetail.orderStatus !== 0 && (
              <View className={styles.orderMessageItem}>
                <View className={styles.orderMessageItemLeft}>支付交易号</View>
                <View className={styles.orderMessageItemRight}>{orderDetail.payTransaction}</View>
              </View>
            )}
            <View className={styles.orderMessageItem}>
              <View className={styles.orderMessageItemLeft}>买家留言</View>
              <View className={styles.orderMessageItemRight}>{orderDetail.remark}</View>
            </View>
          </View>
        </ScrollView>
      </View>
      {orderDetail.orderStatus === 0 && (
        <View className={styles.orderBtn}>
          <View className={styles.orderHint}>合计：</View>
          <View className={styles.orderPayAccount}>￥{orderDetail.summation}</View>
          <View className={styles.orderCancel}>取消订单</View>
          <View className={styles.orderPay}>去支付</View>
        </View>
      )}
      {orderDetail.orderStatus !== 0 && orderDetail.orderStatus !== 1 && (
        <View className={styles.orderBtn}>
          <View className={styles.orderCancel} onClick={() => Taro.navigateTo({ url: '/pages/order/logistics/index' })}>
            查看物流
          </View>
          {orderDetail.orderStatus === 2 && <View className={styles.orderPay}>确认收货</View>}
          {(orderDetail.orderStatus === 3 || orderDetail.orderStatus === 4) && <View className={styles.orderPay}>评价</View>}
        </View>
      )}
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const OrderDetail = memo(Component)
export default OrderDetail
