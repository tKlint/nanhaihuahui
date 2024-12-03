import Taro from '@tarojs/taro'
import { FC, memo, useState, useEffect } from 'react'
import { View, Text, Image, Input, ScrollView } from '@tarojs/components'
import { IConfirmOrderProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import OrderAddress from '~/components/orderAddress'
import classNames from 'classnames'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import { MMModalAnimationType, MMModalJustifyContent } from '~/modules/@wmeimob/taro-design/src/components/modal/const'
import OrderGood from '~/components/orderGood'
import useInput from '~/components/hooks/useInput'

const Component: FC<IConfirmOrderProps> = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [couponFlag, setCouponFlag] = useState<boolean>(false)
  const [isGroup, setIsGroup] = useState<boolean>(false)
  const [hasAddress, setHasAddress] = useState<boolean>(true)
  const [currentId, setCurrentId] = useState<number>(0)
  const [currentCouponAmount, setCurrentCouponAmount] = useState<number>(0)
  const [couponData, setCouponData] = useState<any>([
    { id: 1, amount: 100 },
    { id: 2, amount: 100 },
    { id: 3, amount: 100 }
  ])
  const messageHook = useInput()
  // useEffect(() => {
  //   setCurrentId(couponId)
  // }, [couponId])
  function onClose() {}

  function selectCoupon(item) {
    setCurrentId(item.id)
    setCurrentCouponAmount(item.amount)
    setCouponFlag(false)
  }
  return (
    <View className={styles.confirmOrderStyle}>
      <MMNavigation title="确认订单" />
      <View className={styles.confirmOrder}>
        <ScrollView scrollY className={styles.sview}>
          {hasAddress === true ? (
            <OrderAddress isShowExtra={true} />
          ) : (
            <View className={styles.noAddress} onClick={() => Taro.navigateTo({ url: '/pages/mine/setSite/index' })}>
              <Image className={styles.noAddressImg} src={require('~/images/addAddress.png')} />
              <View className={styles.noAddressHint}>添加收货地址</View>
            </View>
          )}

          <View className={styles.orderItem}>
            <View className={styles.orderItemShop}>
              <Image className={styles.orderItemShopImg} src={require('~/images/icinfor_img.png')} />
              <View className={styles.orderItemShopName}>店铺名称</View>
            </View>
            <View className={styles.orderGoodList}>
              <View className={styles.orderGood}>
                <Image className={styles.orderGoodImg} src={require('~/images/icinfor_img.png')} />
                <Image className={styles.orderGoodImg} src={require('~/images/icinfor_img.png')} />
                <Image className={styles.orderGoodImg} src={require('~/images/icinfor_img.png')} />
              </View>
              <View className={styles.orderGoodHandle} onClick={() => setVisible(true)}>
                <View className={styles.orderGoodCount}>共6件 </View>
                <Image className={styles.extra} src={require('~/images/tabberMine/extra.png')} />
              </View>
            </View>
            <View className={styles.leaveWord}>
              <View className={styles.leaveWordLabel}>买家留言</View>
              <Input className={styles.leaveWordInput} value="" placeholder="建议先与商家沟通 " placeholderStyle="color:#999999;line-height:20px" />
            </View>
          </View>
          <View className={styles.orderItem}>
            <View className={styles.orderItemShop}>
              <Image className={styles.orderItemShopImg} src={require('~/images/icinfor_img.png')} />
              <View className={styles.orderItemShopName}>店铺名称</View>
            </View>
            <View className={styles.orderGoodList}>
              <View className={styles.orderGood}>
                <Image className={styles.orderGoodImg} src={require('~/images/icinfor_img.png')} />
                <Image className={styles.orderGoodImg} src={require('~/images/icinfor_img.png')} />
                <Image className={styles.orderGoodImg} src={require('~/images/icinfor_img.png')} />
              </View>
              {isGroup === false && (
                <View className={styles.orderGoodHandle}>
                  <View className={styles.orderGoodCount}>共6件 </View>
                  <Image className={styles.extra} src={require('~/images/tabberMine/extra.png')} />
                </View>
              )}
            </View>
            <View className={styles.leaveWord}>
              <View className={styles.leaveWordLabel}>买家留言</View>
              <Input
                className={styles.leaveWordInput}
                value={messageHook.value}
                onInput={messageHook.onInput}
                placeholder="建议先与商家沟通 "
                placeholderStyle="color:#999999;line-height:20px"
              />
            </View>
          </View>
          <View className={styles.confirmOrderInfo}>
            {/* 正常订单 */}
            {isGroup === false ? (
              <View className={styles.confirmOrderInfoItem}>
                <View className={styles.confirmOrderInfoItemLeft}>商品金额</View>
                <View className={styles.confirmOrderInfoItemLeft}>¥320.00</View>
              </View>
            ) : (
              <View className={styles.confirmOrderInfoItem}>
                <View className={styles.confirmOrderInfoItemLeft}>商品原价</View>
                <View className={styles.confirmOrderInfoItemLeft}>¥320.00</View>
              </View>
            )}
            {/* 拼团订单 */}
            {isGroup === true && (
              <View className={styles.confirmOrderInfoItem}>
                <View className={styles.confirmOrderInfoItemLeft}>拼团价</View>
                <View className={styles.confirmOrderInfoItemLeft}>¥320.00</View>
              </View>
            )}

            <View className={styles.confirmOrderInfoItem}>
              <View className={styles.confirmOrderInfoItemLeft}>运费</View>
              <View className={styles.confirmOrderInfoItemLeft}>¥320.00</View>
            </View>
            {/* 正常订单 */}
            {isGroup === false && (
              <View className={styles.confirmOrderInfoItem}>
                <View className={styles.confirmOrderInfoItemLeft}>优惠券</View>
                <View onClick={() => setCouponFlag(true)} className={classNames(styles.confirmOrderInfoItemLeft, styles.confirmOrderInfoItemLeftElse)}>
                  {currentCouponAmount === 0 ? '请选择' : '¥' + currentCouponAmount}
                  <Image className={styles.confirmOrderInfoItemLeftExtra} src={require('~/images/moreIcon.png')} />
                </View>
              </View>
            )}

            <View className={styles.confirmOrderInfoItem} style={{ justifyContent: 'flex-end' }}>
              <View className={styles.confirmOrderInfoItemLeft} style={{ width: '42px' }}>
                合计：
              </View>
              <View className={classNames(styles.confirmOrderInfoItemLeft, styles.confirmOrderInfoItemLeftElse)}>¥320.00</View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View className={styles.orderBtn}>
        <View className={styles.orderHint}>合计：</View>
        <View className={styles.orderPayAccount}>￥129.00</View>
        <View className={styles.orderPay}>提交订单</View>
      </View>
      {isNewIphone && <View className="spacingIphone" />}
      <MMModal visible={visible} justifyContent={MMModalJustifyContent.flexEnd} animationType={MMModalAnimationType.down} onClose={onClose}>
        <View className={styles.checkListWrap}>
          <View className={styles.checkListTitle}>
            <View className={styles.checkTitle}>商品清单</View>
            <View className={styles.checkListCount}>共6件</View>
            <Image className={styles.checkClose} onClick={() => setVisible(false)} src={require('~/images/close.png')} />
          </View>
          <ScrollView enableFlex scrollY style={{ maxHeight: '450px' }}>
            <View className={styles.orderGoodWrap}>
              <OrderGood />
            </View>
            <View className={styles.orderGoodWrap}>
              <OrderGood />
            </View>
            <View className={styles.orderGoodWrap}>
              <OrderGood />
            </View>
            <View className={styles.orderGoodWrap}>
              <OrderGood />
            </View>
            <View className={styles.orderGoodWrap}>
              <OrderGood />
            </View>
            <View className={styles.orderGoodWrap}>
              <OrderGood />
            </View>
          </ScrollView>
        </View>
      </MMModal>
      <MMModal visible={couponFlag} justifyContent={MMModalJustifyContent.flexEnd} animationType={MMModalAnimationType.down} onClose={onClose}>
        <View className={styles.checkListWrap}>
          <View className={styles.checkListTitle}>
            <View className={styles.checkTitle}>选择优惠券</View>
            <Image className={styles.checkClose} onClick={() => setCouponFlag(false)} src={require('~/images/close.png')} />
          </View>
          <ScrollView enableFlex scrollY style={{ maxHeight: '450px' }}>
            {couponData.map((item) => {
              return (
                <View
                  key={item.id}
                  className={styles.couponItem}
                  onClick={() => selectCoupon(item)}
                  style={{ background: `url(${require('~/images/couponBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}
                >
                  <View className={styles.couponType}>
                    <View className={styles.couponPrice}>¥{item.amount}</View>
                    <View className={styles.couponTypeName}>满减券</View>
                  </View>
                  <View className={styles.couponInfo}>
                    <View className={styles.couponName}>优惠券名称</View>
                    <View className={styles.couponTime}>2021.01.21 ~2021.05.21</View>
                  </View>
                  {currentId === item.id && <Image className={styles.couponSelect} src={require('~/images/couponSelect.png')} />}
                </View>
              )
            })}

            <View className={styles.hint}>以下优惠券不可用</View>
            <View className={styles.history}>
              <View
                className={styles.couponItem}
                style={{ background: `url(${require('~/images/couponBgHistory.png')}) no-repeat`, backgroundSize: '100% 100%' }}
              >
                <View className={styles.couponType}>
                  <View className={styles.couponPrice}>¥10</View>
                  <View className={styles.couponTypeName}>满减券</View>
                </View>
                <View className={styles.couponInfo}>
                  <View className={styles.couponName}>优惠券名称</View>
                  <View className={styles.couponTime}>2021.01.21 ~2021.05.21</View>
                </View>
              </View>
              <View className={styles.historyHint}>当前商品不适用!</View>
            </View>
          </ScrollView>
        </View>
      </MMModal>
    </View>
  )
}

const ConfirmOrder = memo(Component)
export default ConfirmOrder
