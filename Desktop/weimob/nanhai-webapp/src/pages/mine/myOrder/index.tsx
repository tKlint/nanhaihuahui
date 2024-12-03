/* eslint-disable react/no-children-prop */
import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { IMyOrderProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import Tabber from '~/components/tabber'
import DefaultPage from '~/components/defaultPage'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import MMPopup from '~/components/popup'
import classNames from 'classnames'

const Component: FC<IMyOrderProps> = () => {
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)
  const [orders, setOrders] = useState<any>([
    {
      id: 1,
      status: 1
    },
    {
      id: 2,
      status: 2
    },
    {
      id: 3,
      status: 3
    },
    {
      id: 4,
      status: 4
    },
    {
      id: 5,
      status: 5
    },
    {
      id: 6,
      status: 6
    }
  ])
  function onClose() {}
  function onOk() {}
  const tabber = [
    {
      title: '全部',
      id: 0
    },
    {
      title: '待付款',
      id: 1
    },
    {
      title: '待发货',
      id: 2
    },
    {
      title: '待收货',
      id: 3
    },
    {
      title: '待评价',
      id: 4
    }
  ] as any

  const goodArr = [1, 2, 3, 4, 5, 6]
  return (
    <View className={styles.myOrderStyle}>
      <MMNavigation title="我的订单" />
      <Tabber tabIndex={tabIndex} setTabIndex={setTabIndex} tabArr={tabber} />
      <View className={styles.myOrderWrap}>
        <ScrollView scrollY className={styles.sview}>
          {orders.map((order) => {
            return (
              <View key={order.id} className={styles.myOrder}>
                <View className={styles.order}>
                  <View className={styles.orderTop}>
                    <View className={styles.shopName}>
                      店铺名称
                      <Image className={styles.shopExtra} src={require('~/images/tabberMine/extra.png')} />
                    </View>
                    {/* #FD4F53 */}
                    <View className={styles.orderStatus} style={{ color: order.status === 1 ? '#FD4F53' : '#333' }}>
                      {{ 1: '待支付', 2: '待发货', 3: '待收货', 4: '待评价', 5: '交易完成', 6: '交易取消' }[order.status] || ''}
                    </View>
                  </View>
                  <View className={styles.goods}>
                    <ScrollView enableFlex scrollX style={{ maxWidth: '280px' }}>
                      <View className={styles.goodsImg}>
                        {goodArr.map((item) => {
                          return <Image key={item} className={styles.goodsImage} src={require('~/images/goodImg.png')} />
                        })}
                      </View>
                    </ScrollView>
                    <View className={styles.goodsCount} onClick={() => Taro.navigateTo({ url: '/pages/mine/orderDetail/index' })}>
                      <View className={styles.goodsCountTitle}>共6件</View>
                      <Image className={styles.goodExtra} src={require('~/images/tabberMine/extra.png')} />
                    </View>
                  </View>

                  <View className={styles.orderHandle}>
                    {order.status === 1 && <View className={styles.handle}>取消订单</View>}
                    {order.status === 1 && (
                      <View className={classNames(styles.handle, styles.handleElse)} style={{ width: '70px' }}>
                        付款
                      </View>
                    )}
                    {[2, 3, 4].includes(order.status) && <View className={styles.handle}>加入购物车</View>}
                    {[2, 3, 4].includes(order.status) && <View className={styles.handle}>申请售后</View>}
                    {order.status === 3 && <View className={classNames(styles.handle, styles.handleElse)}>确认收货</View>}
                    {order.status === 4 && <View className={classNames(styles.handle, styles.handleElse)}>立即评价</View>}
                    {order.status === 6 && <View className={classNames(styles.handle, styles.handleElse)}>删除订单</View>}
                  </View>
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>

      {/* 无订单 */}
      {orders && !orders.length && <DefaultPage defaultHint="暂无订单" imgSrc={require('~/images/noOrder.png')} imgTop="100px" />}
      <MMPopup
        title="支付提示"
        visible={visible}
        onClose={onClose}
        onOk={onOk}
        okText="立即支付"
        cancelText="容我想想"
        children="您的订单与 XXX 店铺同时提交，为保证您优惠券的使用，也将同时支付"
        footer={true}
      />
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const MyOrder = memo(Component)
export default MyOrder
