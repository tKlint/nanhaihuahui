import Taro, { useDidShow } from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { ISiteProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import DefaultPage from '~/components/defaultPage'
import BottomButton from '~/components/bottomButton'
import { api } from '~/request'

const Component: FC<ISiteProps> = () => {
  const [siteData, setSiteData] = useState<any[]>([])
  async function onDel(params) {
    const { code } = await api["/user/api/setting/removeUserReceivingAddress/{id}_DELETE"](params.id);
    if (code !== 0) {
      return Taro.showToast({ title: "删除失败", icon: "none" });
    }
    Taro.showToast({ title: "删除成功", icon: "success" });
    Taro.removeStorageSync("userRecevingAddress");
    getAddressList();
  }

  /**
   * 获取收货地址列表
   * 获取成功后存入缓存中以供下次使用
   */
  async function getAddressList() {
    const { data = [] } = await api["/user/api/setting/getUserReceivingAddress_GET"]();
    setSiteData(data);
    Taro.setStorageSync("userRecevingAddress", data)
  }

  /**
   * 跳转到编辑地址页面
   * @param params 
   */
  function toEditAddress (params = {}) {
    // 将对象转化为query string格式
    let queryString = Object.keys(params).reduce((pre, current) => {
      return `${pre}&${current}=${params[current]}`
    }, "");

    // 将第一个&符转为?符
    queryString = queryString.replace("&", "?");
  
    Taro.navigateTo({ 
      url: `/pages/mine/setSite/index${queryString}`
    });
  }

  /**
   * 优先从缓存中获取收货地址
   * 如果缓存中不存在 从接口中获取
   */
  useDidShow(() => {
    const addressCache = Taro.getStorageSync("userRecevingAddress");
    if (addressCache && addressCache.length > 0) {
      setSiteData(addressCache);
      return;
    }
    getAddressList();
  })

  return (
    <View className={styles.siteStyle}>
      <MMNavigation title="我的地址" />
      <View className={styles.siteWrap}>
        {siteData && siteData.length > 0 && (
          <ScrollView scrollY className={styles.sview}>
            <View className={styles.siteList}>
              {siteData.map((item) => {
                return (
                  <View key={item.id} className={styles.site}>
                    <View className={styles.siteTop}>
                      <View className={styles.siteName}>{item.name}</View>
                      <View className={styles.siteMobile}>{item.phone}</View>
                    </View>
                    <View className={styles.address}>
                      {item.provinceName || ''}
                      {item.cityName || ''}
                      {item.areaName || ''}
                      {item.singleAddress || ''}
                    </View>
                    <View className={styles.addressSet}>
                      <View className={styles.addressDefault}>
                        <Image className={styles.addressDefaultImg} src={require( item.isDefault ? '~/images/site/selected.png' : '~/images/site/select.png')} />
                        默认地址
                      </View>
                      <View className={styles.addressHandle}>
                        <Image
                          className={styles.addressHandleImg}
                          onClick={() => toEditAddress(item) }
                          src={require('~/images/site/edit.png')}
                        />
                        <View className={styles.divier} />
                        <Image className={styles.addressHandleImg} onClick={() => onDel(item)} src={require('~/images/site/delete.png')} />
                      </View>
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        )}

        {/* 无地址 */}
        {siteData && siteData.length === 0 && <DefaultPage defaultHint="暂无收货地址" imgSrc={require('~/images/site/null.png')} imgTop="150px" />}
      </View>
      <BottomButton title=" +新增地址" onClick={() => Taro.navigateTo({ url: '/pages/mine/setSite/index' })} contentStyle={{ background: '#fff' }} />
    </View>
  )
}

const Site = memo(Component)
export default Site
