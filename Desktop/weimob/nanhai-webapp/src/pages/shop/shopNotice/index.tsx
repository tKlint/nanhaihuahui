import Taro, { getCurrentInstance } from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { RichText, ScrollView, View } from '@tarojs/components'
import styles from './index.module.less'
import { IShopNoticeProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import { api } from '~/request'

const Component: FC<IShopNoticeProps> = () => {
  const [total, setTotal] = useState<number>(0)
  const [requestData, setRequestData] = useState<any>({
    pageNum: 1,
    pageSize: 10,
    storeNo: getCurrentInstance().router?.params.storeNo
  })
  const [notice, setNotice] = useState<any>([])

  useEffect(() => {
    getNotice(requestData)
  }, [])
  const getNotice = async (req) => {
    const { data = {} } = (await api['/user/api/store/getStoreNotice_GET'](req)) as any
    const { list = [], total: totals } = data
    setNotice(list)
    setTotal(totals)
  }
  const update = async () => {
    const datas = requestData
    if (datas.pageSize < total) {
      datas.pageSize = datas.pageSize + 10
      setRequestData(datas)
      Taro.showLoading({ title: '', mask: true })
      await getNotice(requestData)
      Taro.hideLoading()
    }
  }
  return (
    <View className={styles.shopNoticeStyle}>
      <MMNavigation title="商家公告" />
      <View className={styles.shopNotice}>
        <ScrollView scrollY lowerThreshold={150} onScrollToLower={() => update()} className={styles.sview}>
          {notice.map((item) => {
            return (
              <View key={item.id} className={styles.notice}>
                <View className={styles.noticeTitle}>{item.title}</View>
                <View className={styles.noticeCont}>
                  <RichText nodes={item.content} />
                </View>
                <View className={styles.noticeTime}>{item.gmtCreate}</View>
              </View>
            )
          })}
        </ScrollView>
      </View>
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const ShopNotice = memo(Component)
export default ShopNotice
