import Taro, { getCurrentInstance } from '@tarojs/taro'
import { FC, memo, useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import styles from './index.module.less'
import { IMerchantInfoProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import classNames from 'classnames'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import { MMModalAnimationType, MMModalJustifyContent } from '~/modules/@wmeimob/taro-design/src/components/modal/const'
import MMStars from '~/modules/@wmeimob/taro-design/src/components/stars'
import IconFontName from '~/modules/@wmeimob/taro-design/src/components/icon-font/name'
import { MMStarsSize } from '~/modules/@wmeimob/taro-design/src/components/stars/const'
import Stars from '~/components/stars'
import { api } from '~/request'
import { Store } from '~/request/data-contracts'
import { routeNames } from '~/routes'

const Component: FC<IMerchantInfoProps> = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [quality, setquality] = useState<number>(0)
  const [afterSale, setafterSale] = useState<number>(0)
  const [serviceAttitude, setserviceAttitude] = useState<number>(0)

  const [shopInfo, setShopInfo] = useState<Store>({})
  // 关注、取消关注
  async function attentionShop() {
    const { code = 0 } = await api['/user/api/store/focusOrNot/{id}_POST'](shopInfo.id as any)
    if (code === 0) {
      if (shopInfo.hasFocus === 0) {
        Taro.showToast({
          title: '关注成功',
          icon: 'none'
        })
        setShopInfo({ ...shopInfo, hasFocus: 1 })
      } else {
        Taro.showToast({
          title: '您已取消关注',
          icon: 'none'
        })
        setShopInfo({ ...shopInfo, hasFocus: 0 })
      }
    }
  }
  function onChange() {}

  function onClose() {}

  async function getShopInfo() {
    const { data = {} } = await api['/user/api/store/detail/{id}_GET'](getCurrentInstance().router?.params.shopId as any)
    setShopInfo(data)
  }
  useEffect(() => {
    getShopInfo()
  }, [])
  useEffect(() => {
    if (visible === false) {
      setquality(0)
      setafterSale(0)
      setserviceAttitude(0)
    }
  }, [visible])

  async function submitEva() {
    const { code = 0 } = await api['/user/api/store/detail/_POST']({
      id: getCurrentInstance().router?.params.shopId as any,
      quality,
      afterSale,
      serviceAttitude
    })
    if (code === 0) {
      setShopInfo({ ...shopInfo, hasScored: 1 })
      Taro.showToast({ title: '提交评价成功', icon: 'none' })
      setVisible(false)
    }
  }

  return (
    <View className={styles.merchantInfoStyle}>
      {/* 店铺名称 */}
      <MMNavigation title={shopInfo.name} />
      <View className={styles.merchantInfo}>
        <View className={styles.merchant}>
          <View className={styles.shopDetailTop}>
            <Image className={styles.shopIcon} src={shopInfo.logo!} />
            <View className={styles.attentionShopInfo}>
              <View className={styles.attentionShopName}>
                {shopInfo.name}
                {shopInfo.marginStatus === 1 && <Image className={styles.zhibao} src={require('~/images/qualityGuarantee.png')} />}
              </View>
              <View className={styles.attentionShopInformation}>
                <View className={styles.attentionCount}>{shopInfo.focus}人关注</View>
              </View>
            </View>
            <View onClick={() => attentionShop()} className={classNames(styles.shopAttention, shopInfo.hasFocus === 1 ? styles.attentioned : '')}>
              {shopInfo.hasFocus === 1 ? '已关注' : '+关注'}
            </View>
          </View>

          <View className={styles.experience}>
            综合体验
            <Stars contentStyle={{ marginLeft: '10px' }} grade={shopInfo.score!} />
          </View>
          <View className={styles.experienceHint}>综合体验包含品质、服务、售后等多项内容，星星越高，体验约好</View>
        </View>
        <View className={styles.merchantGrade}>
          <View className={styles.merchantGradeLeft}>
            <View className={styles.experience}>
              品质相符
              <Stars contentStyle={{ marginLeft: '10px' }} grade={shopInfo.quality!} />
            </View>
            <View className={styles.experience}>
              服务态度
              <Stars contentStyle={{ marginLeft: '10px' }} grade={shopInfo.serviceAttitude!} />
            </View>
            <View className={styles.experience}>
              售后服务
              <Stars contentStyle={{ marginLeft: '10px' }} grade={shopInfo.afterSale!} />
            </View>
          </View>
          <View
            className={classNames(styles.merchantGradeRight, shopInfo.hasScored === 1 ? styles.attentioned : '')}
            onClick={() => shopInfo.hasScored === 0 && setVisible(true)}
          >
            {shopInfo.hasScored === 1 ? '已评价' : '写评价'}
          </View>
        </View>
        <View className={styles.basicInfo}>
          <View className={styles.title}>基础信息</View>
          <View className={styles.basic}>
            <View className={styles.basicLabel}>店铺名称</View>
            <View className={styles.basicValue}>{shopInfo.name}</View>
          </View>
          <View className={styles.basic}>
            <View className={styles.basicLabel}>所在地</View>
            <View className={styles.basicValue}>{shopInfo.provinceName || shopInfo.cityName}</View>
          </View>
          <View className={styles.basic}>
            <View className={styles.basicLabel}>企业资质</View>
            <View className={styles.basicValue} onClick={() => Taro.navigateTo({ url: routeNames.shopShopCertification + '?shopId=' + shopInfo.id })}>
              {shopInfo.marginStatus === 1 && <Image className={styles.zhibao} src={require('~/images/qualityGuarantee.png')} />}

              <Image className={styles.extra} src={require('~/images/tabberMine/extra.png')} />
            </View>
          </View>
          <View className={styles.basic}>
            <View className={styles.basicLabel}>店铺名片</View>
            <View
              className={classNames(styles.basicValue, styles.basicValueElse)}
              onClick={() => Taro.navigateTo({ url: routeNames.shopShopCard + '?shopId=' + shopInfo.id })}
            >
              点击查看
              <Image className={styles.extra} src={require('~/images/tabberMine/extra.png')} />
            </View>
          </View>
        </View>
      </View>
      <MMModal
        visible={visible}
        justifyContent={MMModalJustifyContent.flexEnd}
        animationType={MMModalAnimationType.down}
        className={styles.shopCartPopup}
        onClose={onClose}
      >
        <View className={styles.popWrap}>
          <View className={styles.popTop}>
            <View className={styles.popTitle}>评价商家</View>
            <Image className={styles.popWrapClose} onClick={() => setVisible(false)} src={require('~/images/close.png')} />
          </View>
          <View className={styles.evaluateOverAll}>
            <View className={styles.evaluateTitle}>品质相符</View>
            <MMStars value={quality} iconfontName={IconFontName.Rating} size={MMStarsSize.Big} onChange={(value) => setquality(value)} />
          </View>
          <View className={styles.evaluateOverAll}>
            <View className={styles.evaluateTitle}>服务态度</View>
            <MMStars value={serviceAttitude} iconfontName={IconFontName.Rating} size={MMStarsSize.Big} onChange={(value) => setserviceAttitude(value)} />
          </View>
          <View className={styles.evaluateOverAll}>
            <View className={styles.evaluateTitle}>售后服务</View>
            <MMStars value={afterSale} iconfontName={IconFontName.Rating} size={MMStarsSize.Big} onChange={(value) => setafterSale(value)} />
          </View>
          <View className={styles.popHandle} onClick={() => submitEva()}>
            提交评价
          </View>
        </View>
      </MMModal>
    </View>
  )
}

const MerchantInfo = memo(Component)
export default MerchantInfo
