import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, Input, Textarea } from '@tarojs/components'
import styles from './index.module.less'
import { IAfterSaleDetailProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import classNames from 'classnames'
import MMImagePicker from '~/modules/@wmeimob/taro-design/src/components/image-picker'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import { MMModalAnimationType, MMModalJustifyContent } from '~/modules/@wmeimob/taro-design/src/components/modal/const'
import OrderGood from '~/components/orderGood'
import BottomButton from '~/components/bottomButton'
import useInput from '~/components/hooks/useInput'

const Component: FC<IAfterSaleDetailProps> = () => {
  const [imagevalue, setimagevalue] = useState<any>([`${require('~/images/goodImg.png')}`])
  const [couponVisible, setcouponVisible] = useState<boolean>(false)
  const [reasonid, setReasonId] = useState<number>(-1)
  const [reasonstr, setReasonStr] = useState<string>('')
  const elseReason = useInput()

  const reasonArr = [
    {
      id: 0,
      txt: '7天无理由退货'
    },
    {
      id: 1,
      txt: '卖家发错货'
    }
  ]

  function ImageonChange(value) {}
  function onClose() {}
  function onSubmit() {
    const str = reasonArr.find((item) => item.id === reasonid)?.txt || ''
    setReasonStr(reasonid === -2 ? '其他' : str)
    setcouponVisible(false)
  }
  return (
    <View className={styles.afterSaleDetailStyle}>
      <MMNavigation title="仅退款" />
      <View className={styles.afterSaleDetail}>
        <View className={styles.afterSaleGood}>
          <OrderGood />
        </View>
        <View className={styles.afterSaleItem}>
          <View className={classNames(styles.afterSaleItemLable, styles.afterSaleItemLableRequired)}>选择退款原因</View>
          <View className={styles.afterSaleItemTitle} onClick={() => setcouponVisible(true)}>
            {reasonstr || '请选择'}
            <Image className={styles.afterSaleItemExtra} src={require('~/images/moreIcon.png')} />
          </View>
        </View>
        {/* 退货退款 */}
        <View className={styles.afterSaleItem}>
          <View className={classNames(styles.afterSaleItemLable, styles.afterSaleItemLableRequired)}>退货方式</View>
          <View className={styles.afterSaleItemTitle}>快递寄回，我们收到后会尽快为您处理</View>
        </View>
        <View className={styles.afterSaleItem}>
          <View className={styles.afterSaleItemLable}>退款金额</View>
          {/* 退货退款可输入金额 */}
          <View className={classNames(styles.afterSaleItemTitle, styles.afterSaleDetailAmount)}>￥670.00</View>
        </View>
        <View className={styles.afterSaleItem}>
          <View className={styles.afterSaleItemLable}>问题描述</View>
          <View className={styles.afterSaleItemTitle}>
            <Input className={styles.siteInput} value="" placeholder="选填 " placeholderStyle="color:#999999;line-height:44px,text-align:right" />
          </View>
        </View>
        <View className={styles.afterSaleImage}>
          <View className={styles.afterSaleImagetTitle}>上传凭证（选填）</View>
          <MMImagePicker value={imagevalue} count={3} onChange={(value) => ImageonChange(value)} />
          {/* <View className={styles.imageWrap}>
            <View className={styles.imageItem}>
              <Image style={{ width: '100px', height: '100px' }} src={require('~/images/goodImg.png')} />
              <Image className={styles.imageItemClose} src={require('~/images/imageClose.png')} />
            </View>
            <View className={classNames(styles.imageItem, styles.imageItemSelect)}>
              <Image className={styles.imageCarema} src={require('~/images/carema.png')} />
              <View className={styles.imageItemHint}>上传凭证</View>
              <View className={styles.imageItemHint}>（最多3张）</View>
            </View>
          </View> */}
        </View>
      </View>
      <BottomButton title=" 提交" onClick={() => Taro.navigateTo({ url: '/pages/order/afterSaleSuccess/index' })} contentStyle={{ background: '#fff' }} />

      <MMModal
        visible={couponVisible}
        maskClosable={true}
        onClose={() => onClose()}
        animationType={MMModalAnimationType.down}
        justifyContent={MMModalJustifyContent.flexEnd}
      >
        <View className={styles.reasonWrap}>
          <View className={styles.modalTitle}>选择退款原因</View>
          {reasonArr &&
            reasonArr.length > 0 &&
            reasonArr.map((item) => {
              return (
                <View className={styles.reasonItem} key={item.id}>
                  <View className={styles.reasonItemLabel}>{item.txt}</View>
                  <Image
                    onClick={() => setReasonId(item.id)}
                    className={styles.reasonItemIcon}
                    src={reasonid === item.id ? require('~/images/orders/reasonSelected.png') : require('~/images/orders/reasonSelect.png')}
                  />
                </View>
              )
            })}
          <View className={styles.reasonItem} style={{ marginTop: '15px' }}>
            <View className={styles.reasonItemLabel}>其他</View>
            <Textarea
              style={{
                fontSize: '14px',
                outline: 'none',
                width: '250px',
                height: '69px!important',
                background: '#F6F8FA',
                boxSizing: 'border-box',
                borderRadius: '5px',
                padding: '15px'
              }}
              placeholder=" "
              placeholderStyle="color:#ABABAB"
              value={elseReason.value}
              onInput={elseReason.onInput}
            />
            <Image
              onClick={() => setReasonId(-2)}
              className={styles.reasonItemIcon}
              src={reasonid === -2 ? require('~/images/orders/reasonSelected.png') : require('~/images/orders/reasonSelect.png')}
            />
          </View>
          <BottomButton title=" 确定" onClick={onSubmit} contentStyle={{ background: '#fff', marginTop: '41px' }} />
        </View>
      </MMModal>
    </View>
  )
}

const AfterSaleDetail = memo(Component)
export default AfterSaleDetail
