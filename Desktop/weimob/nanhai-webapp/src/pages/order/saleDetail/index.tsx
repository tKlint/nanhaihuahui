import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Image, Text } from '@tarojs/components'
import styles from './index.module.less'
import { ISaleDetailProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import classNames from 'classnames'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import OrderGood from '~/components/orderGood'
import BottomButton from '~/components/bottomButton'

const Component: FC<ISaleDetailProps> = () => {
  const saleStatusIcon = {
    0: `${require('~/images/sales/applyIng.png')}`,
    1: `${require('~/images/sales/refundClose.png')}`,
    2: `${require('~/images/sales/apply.png')}`,
    3: `${require('~/images/sales/refundSuccessIcon.png')}`
  }
  const saleStatusTitle = {
    0: '退货申请成功',
    1: '退款关闭',
    2: '退货申请成功',
    3: '退款成功'
  }
  const saleStatusHint = {
    0: '2020年12月12日  10:00',
    1: '2020年12月12日  10:00',
    2: '2020年12月12日  10:00',
    3: '2020年12月12日  10:00'
  }
  const saleStatus = 0

  function fillExpressNo() {}
  return (
    <View className={styles.saleDetailStyle}>
      <MMNavigation title="退款/售后" />
      <View className={styles.saleDetail}>
        <View className={styles.saleStatus}>
          <Image className={styles.saleStatusIcon} src={saleStatusIcon[saleStatus]} />
          <Text className={styles.saleStatusTitle}>{saleStatusTitle[saleStatus]}</Text>
          <Text className={styles.saleStatusHint}>{saleStatusHint[saleStatus]}</Text>
        </View>
        {(saleStatus === 0 || saleStatus === 2) && (
          <View className={styles.saleStep}>
            <View className={styles.saleRefund}>
              <View className={styles.refundTitle}>退款金额</View>
              <View className={styles.refundAmount}>￥670.00</View>
            </View>
            {/* 当前步骤图片加 ed */}
            <View className={styles.refundStep}>
              <View className={styles.refundStepBox}>
                <Image className={styles.refundStepImg} src={require('~/images/sales/check.png')} />
                <View className={styles.refundStepTitle}>卖家审核</View>
              </View>
              <View className={classNames(styles.arrows, styles.arrowsCurrent)}>---&gt;</View>
              <View className={styles.refundStepBox}>
                <Image className={styles.refundStepImg} src={require('~/images/sales/refund.png')} />
                <View className={styles.refundStepTitle}>卖家退款</View>
              </View>
              <View className={styles.arrows}>---&gt;</View>
              <View className={styles.refundStepBox}>
                <Image className={styles.refundStepImg} src={require('~/images/sales/bank.png')} />
                <View className={styles.refundStepTitle}>银行受理</View>
              </View>
              <View className={styles.arrows}>---&gt;</View>
              <View className={styles.refundStepBox}>
                <Image className={styles.refundStepImg} src={require('~/images/sales/refundSuccess.png')} />
                <View className={styles.refundStepTitle}>退款成功</View>
              </View>
            </View>
          </View>
        )}
        {saleStatus === 1 && <View className={styles.closeHint}>卖家已关闭本次退款申请，如有疑问，可联系客服</View>}
        <View className={styles.refundGood}>
          <View className={styles.refundShopName}>店铺名称</View>
          <OrderGood />
        </View>

        <View className={styles.refundInfo}>
          <View className={styles.refundItem}>
            <View className={styles.refundItemLabel}>退款原因：</View>
            <View className={styles.refundItemValue}>7天无理由退货</View>
          </View>
          <View className={styles.refundItem}>
            <View className={styles.refundItemLabel}>退款金额：</View>
            <View className={styles.refundItemValue}>￥670.00</View>
          </View>
          <View className={styles.refundItem}>
            <View className={styles.refundItemLabel}>申请时间：</View>
            <View className={styles.refundItemValue}>2020-12-12 10:12:12</View>
          </View>
          <View className={styles.refundItem}>
            <View className={styles.refundItemLabel}>售后编号：</View>
            <View className={styles.refundItemValue}>61123525666</View>
          </View>
        </View>
      </View>
      {(saleStatus === 1 || saleStatus === 2) && (
        <BottomButton
          title={saleStatus === 1 ? '平台介入' : '填写快递单号'}
          onClick={() => fillExpressNo()}
          contentStyle={{ marginTop: '41px' }}
          contStyle={{ background: '#fff', color: ' #333333' }}
        />
      )}
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const SaleDetail = memo(Component)
export default SaleDetail
