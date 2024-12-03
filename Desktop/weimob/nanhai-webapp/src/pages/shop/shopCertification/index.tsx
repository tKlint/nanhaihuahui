import Taro, { getCurrentInstance } from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Image } from '@tarojs/components'
import styles from './index.module.less'
import { IShopCertificationProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { api } from '~/request'

const Component: FC<IShopCertificationProps> = () => {
  const [certificationInfo, setcertificationInfo] = useState<any>({})

  async function getCertification() {
    const { data = {} } = await api['/user/api/store/storeinfo/detail/{id}_GET'](getCurrentInstance().router?.params.shopId as any)
    setcertificationInfo(data)
  }
  useEffect(() => {
    getCertification()
  }, [])
  return (
    <View className={styles.shopCertificationStyle}>
      <MMNavigation title="商家资质" />
      <View className={styles.certification}>
        <View className={styles.certificationLabel}>企业注册号</View>
        <View className={styles.certificationValue}>{certificationInfo.businessLicenseNo}</View>
      </View>
      <View className={styles.certification}>
        <View className={styles.certificationLabel}>公司名称</View>
        <View className={styles.certificationValue}>{certificationInfo.name}</View>
      </View>
      <View className={styles.certification}>
        <View className={styles.certificationLabel}>营业期限</View>
        <View className={styles.certificationValue}>
          {certificationInfo.certificateDeadlineStart && certificationInfo.certificateDeadlineStart.substring(0, 10)}至
          {certificationInfo.certificateDeadlineEnd && certificationInfo.certificateDeadlineEnd.substring(0, 10)}
        </View>
      </View>
      <View className={styles.certification}>
        <View className={styles.certificationLabel}>类型</View>
        <View className={styles.certificationValue}>{certificationInfo.companyType}</View>
      </View>
      <View className={styles.certification}>
        <View className={styles.certificationLabel}>地址</View>
        <View className={styles.certificationValue}>
          {certificationInfo.area}
          {certificationInfo.areaDetail}
        </View>
      </View>
      <View className={styles.certification}>
        <View className={styles.certificationLabel}>成立时间</View>
        <View className={styles.certificationValue}>{certificationInfo.establishedTime}</View>
      </View>
      <View className={styles.certification}>
        <View className={styles.certificationLabel}>注册资本</View>
        <View className={styles.certificationValue}>{certificationInfo.registeredCapital}</View>
      </View>
      <View className={styles.certification}>
        <View className={styles.certificationLabel}>登记机关</View>
        <View className={styles.certificationValue}>{certificationInfo.registrationAuthority}</View>
      </View>
      <View className={styles.certification}>
        <View className={styles.certificationLabel}>营业执照</View>
        <View className={styles.certificationRight}>
          <View
            className={styles.certificationRightWrap}
            onClick={() => Taro.previewImage({ current: certificationInfo.businessLicensePic, urls: [certificationInfo.businessLicensePic] })}
          >
            <Image className={styles.certificationImg} src={certificationInfo.businessLicensePic} />
          </View>
          <View className={styles.certificationRightHint}>点击查看大图</View>
        </View>
      </View>
    </View>
  )
}

const ShopCertification = memo(Component)
export default ShopCertification
