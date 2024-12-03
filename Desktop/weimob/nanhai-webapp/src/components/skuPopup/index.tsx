import Taro from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { ISkuPopupProps } from './const'
import styles from './index.module.less'
import MMPopup from '../popup'
import classNames from 'classnames'
import MMItem from '~/modules/@wmeimob/taro-design/src/components/item'
import MMStepper from '~/modules/@wmeimob/taro-design/src/components/stepper'
import MMButton from '~/modules/@wmeimob/taro-design/src/components/button'
import { MMButtonColor, MMButtonSize, MMButtonType } from '~/modules/@wmeimob/taro-design/src/components/button/const'
import MMSkuList from '~/modules/@wmeimob/taro-design/src/components/sku-list'
import { FC, useEffect, useMemo, useState } from 'react'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import { MMModalJustifyContent, MMModalAnimationType } from '~/modules/@wmeimob/taro-design/src/components/modal/const'
import { api } from '~/request'

const Component: FC<ISkuPopupProps> = (props) => {
  const {
    quantity = 1,
    mallGoodsSpecs = [],
    goodsSkuWebVoList = [],
    activitySkuWebVo = [],
    isPrize = '',
    isGroup = false,
    isActivityGood = false,
    showPrice = 1,
    onClose
  } = props
  // isPrize用来判断是否是选择奖品规格
  const [skuInventoryWebVo, setSkuInventoryWebVo] = useState<any>({})
  const [innerQuantity, setInnerQuantity] = useState(quantity)
  const [specList, setSpecList] = useState<any>([])
  const [customSku, setCustomSku] = useState([])
  const [selectSkuList, setSelectSkuList] = useState<any>([])
  const [currentSkuSelect, setcurrentSkuSelect] = useState<any>({})
  // const currentSkuSelect = activitySkuWebVo.find(item => item.skuNo === skuInventoryWebVo.skuNo) || {}

  const skuNames = useMemo(() => {
    const skuWebVo = goodsSkuWebVoList.find((item) => item.skuNo === skuInventoryWebVo.skuNo)
    if (skuWebVo) {
      // return skuWebVo.specNames!.split(':').filter((item) => !!item)
      return skuWebVo.specNames!
    }
    return []
  }, [goodsSkuWebVoList, skuInventoryWebVo])

  useEffect(() => {
    // const newSpecList = mallGoodsSpecs!.map((list, index) => {
    //   return {
    //     title: list.propName,
    //     items: list.values!.map((lis) => {
    //       return {
    //         id: lis,
    //         text: lis
    //       }
    //     })
    //   }
    // })
    // setSpecList(newSpecList)

    // const customSkuList = []
    // // 活动sku
    // if (isActivityGood) {
    //   activitySkuWebVo!.forEach((ele) => {
    //     const str = ele.specNames!.slice(0, ele.specNames!.length - 1)
    //     customSkuList.push(str.split(':'))
    //   })
    // } else {
    //   goodsSkuWebVoList!.forEach((ele) => {
    //     const str = ele.specNames!.slice(0, ele.specNames!.length - 1)
    //     customSkuList.push(str.split(':'))
    //   })
    // }
    // setCustomSku(customSkuList)
    console.log(props)
    if (props.visible) {
      let goodSku = {} as any
      if (props.skuNo) {
        goodSku = goodsSkuWebVoList.find((item) => item.skuNo === props.skuNo) || {}
        const str = goodSku.skuName
        // setSelectSkuList(str.split(':'))
      } else {
        goodSku = goodsSkuWebVoList[0] || {}
      }
      // handleSkuChange(goodSku.skuNo!, goodSku.goodsNo!)
      setSkuInventoryWebVo(goodSku)
      setInnerQuantity(quantity)
    }
  }, [props.visible, props.skuNo, quantity])

  const changeSpec = (value) => {
    setSelectSkuList(value)
    const skuNoSting = value.filter((it) => !!it).join(':') + ':'
    const result = goodsSkuWebVoList.find((e) => {
      return e.specNames === skuNoSting
    })
    if (result) {
      setInnerQuantity(1)
      handleSkuChange(result.skuNo!, result.goodsNo!)
    }
  }

  const hanldeConfirm = () => {
    const selSkuList = selectSkuList.filter((it) => !!it)
    if (selSkuList.length < specList.length) {
      Taro.showToast({ title: '请选择规格', icon: 'none' })
      return
    }
    if (isPrize) {
      if (!skuInventoryWebVo.stock || skuInventoryWebVo <= 0 || skuInventoryWebVo.stock < quantity) {
        return Taro.showToast({ icon: 'none', title: '库存不足' })
      }
    }

    props.onComfirm && props.onComfirm(skuInventoryWebVo.skuNo!, innerQuantity, isGroup && currentSkuSelect.activityIs === true ? '1' : '2')
  }

  const handleSkuChange = async (skuNo: string, goodsNo: string) => {
    if (!skuNo) {
      return
    }
    Taro.showLoading({ title: '' })
    const skuInventory: any = {}
    try {
      // const { data = {} } = await api.mallMall['/mall/web/goods/getGoodsSkuInventoryWebVo_GET']({ skuNo, goodsNo, type: isActivityGood ? 1 : 0 })
      // skuInventory = data
    } catch (error) {}
    // setSkuInventoryWebVo(skuInventory)
    setcurrentSkuSelect(activitySkuWebVo.find((item) => item.skuNo === skuInventory.skuNo) || {})
    Taro.hideLoading()
  }

  const handleCountChange = (value: number) => {
    if (!skuInventoryWebVo.stock || skuInventoryWebVo <= 0 || skuInventoryWebVo.stock < value) {
      return Taro.showToast({ icon: 'none', title: '库存不足' })
    }

    if (value <= 0) {
      return Taro.showToast({ icon: 'none', title: '数量不能小于1' })
    }
    // 改变数量
    setInnerQuantity(value)
  }
  const toPushCart = async () => {
    //
    const common = Taro.getStorageSync('commonInfo')
    const { code = 0 } = await api['/user/api/shoppingCart/addShoppingCatInfo_POST']({
      goodsNo: skuInventoryWebVo.goodsNo,
      skuNo: skuInventoryWebVo.skuNo,
      quantity: innerQuantity,
      storeNo: props.storeNo,
      // TODO::暂时使用写死的
      userNo: '3843059256544e21bc8b39cc8cd6fa7d'
    })

    if (code === 0) {
      onClose && onClose()
    }
  }

  return (
    <MMModal
      visible={props.visible}
      justifyContent={MMModalJustifyContent.flexEnd}
      animationType={MMModalAnimationType.down}
      className={styles.shopCartPopup}
      onClose={onClose}
    >
      <View className={styles.modalcontent}>
        <View className={styles.specModal}>
          <View className={styles.goodsInfo}>
            {skuInventoryWebVo.skuImgUrl && <Image className={styles.goodsMainImg} src={skuInventoryWebVo.skuImgUrl!} />}
            <View className={styles.goodsInfoRight}>
              <View className={styles.goodsPrice}>
                <Text className={styles.sign}>¥{skuInventoryWebVo.salesPrice}</Text>
                <View className={styles.orgPrice}>¥ {skuInventoryWebVo.marketPrice}</View>
                <Image className={styles.close} src={require('~/images/close.png')} />
              </View>

              <View className={styles.stock}>库存：{skuInventoryWebVo.stock}件</View>
              <View className={styles.spec}>已选择：灰色</View>
            </View>
          </View>

          <View className={styles.centerBox}>
            <ScrollView scrollY style={{ maxHeight: '178px' }}>
              <MMSkuList onClick={(value) => changeSpec(value)} value={selectSkuList} sku={customSku} list={specList} />
            </ScrollView>
            {!isPrize && (
              <View className={styles.buyNum}>
                <MMItem renderLeft={<View className={styles.buyNumLeft}> 数量</View>}>
                  <MMStepper min={1} max={1000} step={1} value={innerQuantity} onChange={handleCountChange} />
                </MMItem>
              </View>
            )}
          </View>
        </View>
        <View className={styles.specModalBtnBox}>
          {/* {!goodsDetail.goodsType && (

          )}
           */}
          <View className={styles.btn} onClick={() => toPushCart()}>
            加入购物车
          </View>
          <View className={classNames(styles.btn)}>立即下单</View>
        </View>
        <View style={{ height: '58px' }} />
      </View>

      <View style={{ height: '58px' }} />
    </MMModal>
  )
}

// Component.options = {
//   addGlobalClass: true
// }

const SkuPopup = Component
export default SkuPopup
