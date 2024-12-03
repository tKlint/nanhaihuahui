import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, Input, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { ISaleProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import classNames from 'classnames'
import OrderGood from '~/components/orderGood'
import DefaultPage from '~/components/defaultPage'
import MMPopup from '~/components/popup'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import useInput from '~/components/hooks/useInput'
import { routeNames } from '~/routes'

const Component: FC<ISaleProps> = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [saleData, setSaleData] = useState<any>([
    {
      id: 1,
      shopName: '店铺名称',
      refundStatus: 1,
      refundType: 1,
      refundAmount: 100,
      goodsDetail: {}
    },
    {
      id: 2,
      shopName: '店铺名称',
      refundStatus: 2,
      refundType: 1,
      refundAmount: 100,
      goodsDetail: {}
    },
    {
      id: 3,
      shopName: '店铺名称',
      refundStatus: 3,
      refundType: 1,
      refundAmount: 100,
      goodsDetail: {}
    },
    {
      id: 4,
      shopName: '店铺名称',
      refundStatus: 1,
      refundType: 2,
      refundAmount: 100,
      goodsDetail: {}
    },
    {
      id: 5,
      shopName: '店铺名称',
      refundStatus: 2,
      refundType: 2,
      refundAmount: 100,
      goodsDetail: {}
    },
    {
      id: 6,
      shopName: '店铺名称',
      refundStatus: 3,
      refundType: 2,
      refundAmount: 100,
      goodsDetail: {}
    },
    {
      id: 7,
      shopName: '店铺名称',
      refundStatus: 4,
      refundType: 2,
      refundAmount: 100,
      goodsDetail: {}
    },
    {
      id: 8,
      shopName: '店铺名称',
      refundStatus: 5,
      refundType: 2,
      refundAmount: 100,
      goodsDetail: {}
    }
  ])

  const expressCompany = useInput()
  const expressNo = useInput()
  function onClose() {
    // console.log('关闭')
  }
  function onOk() {}
  return (
    <View className={styles.saleStyle}>
      <MMNavigation title="退款/售后" />
      <View className={styles.sale}>
        <ScrollView scrollY className={styles.sview}>
          {saleData.map((item) => {
            return (
              <View key={item.id} className={styles.saleItem} onClick={() => Taro.navigateTo({ url: routeNames.orderSaleDetail })}>
                <View className={styles.saleTop}>
                  <View className={styles.saleShopName}>{item.shopName}</View>
                  <View className={styles.saleTypeName}>{item.refundType === 1 ? '退款' : '退货'}</View>
                </View>
                <OrderGood isHidePrice={true} />
                <View className={styles.orderDivier} />
                <View className={styles.saleHadle}>
                  <View className={classNames(styles.saleTitle, item.refundStatus !== 3 ? styles.saleTitleElse : '')}>
                    {{
                      1: '申请中，等待商家审核',
                      2: '您的审核商家已拒绝',
                      3: `退款成功：￥${item.refundAmount}元`,
                      4: '商家已同意，请填写快递单号',
                      5: '等待商家收货'
                    }[item.refundStatus] || ''}
                  </View>
                  {item.refundStatus === 4 && (
                    <View className={styles.saleFill} onClick={() => setVisible(true)}>
                      填写快递单号
                    </View>
                  )}
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>
      {saleData && !saleData.length && <DefaultPage defaultHint="暂无订单" imgSrc={require('~/images/noOrder.png')} />}
      {isNewIphone && <View className="spacingIphone" />}
      <MMPopup
        title="快递单号"
        modalStyle={{ width: '325px', left: '25px' }}
        visible={visible}
        onClose={() => setVisible(false)}
        onOk={onOk}
        cancelText="取消"
        okText="确定"
        footer={true}
      >
        <View className={styles.inputWrap}>
          <View className={styles.inputLabel}>快递公司：</View>
          <Input
            className={styles.modalInput}
            value={expressCompany.value}
            onInput={expressCompany.onInput}
            placeholder=" "
            placeholderStyle="color:#CCCCCC;line-height:40px"
          />
        </View>
        <View className={styles.inputWrap}>
          <View className={styles.inputLabel}>快递公司：</View>
          <Input
            className={styles.modalInput}
            value={expressNo.value}
            onInput={expressNo.onInput}
            placeholder=" "
            placeholderStyle="color:#CCCCCC;line-height:40px"
          />
        </View>
      </MMPopup>
    </View>
  )
}

const Sale = memo(Component)
export default Sale
