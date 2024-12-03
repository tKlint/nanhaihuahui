import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { ICollectionProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import GoodsItem from '~/components/goodsItem'
import DefaultPage from '~/components/defaultPage'
import { MyGoodsDetailVo } from '~/request/data-contracts'
import { api } from '~/request'

const Component: FC<ICollectionProps> = () => {
  const [goodsData, setGoodsData] = useState<MyGoodsDetailVo[]>([])
  const [total, setTotal] = useState<number>(0)
  const [requestData, setRequestData] = useState<any>({
    pageNum: 1,
    pageSize: 10
  })
  useEffect(() => {
    const req = { ...requestData }
    setRequestData(req)
    getGroup(req)
  }, [])

  const getGroup = async (req) => {
    const { data = {} } = (await api['/user/api/activity/_GET'](req)) as any
    const { list = [], total: totals } = data
    setGoodsData(list)
    setTotal(totals)
  }
  const update = async () => {
    const datas = requestData
    if (datas.pageSize < total) {
      datas.pageSize = datas.pageSize + 10
      setRequestData(datas)
      Taro.showLoading({ title: '', mask: true })
      await getGroup(requestData)
      Taro.hideLoading()
    }
  }
  return (
    <View className={styles.collectionStyle}>
      <MMNavigation title="收藏" />
      {goodsData && goodsData.length > 0 && (
        <View className={styles.collectionWrap}>
          <ScrollView scrollY className={styles.sview} lowerThreshold={150} onScrollToLower={() => update()}>
            <View className={styles.collectionList}>
              {goodsData.map((item) => {
                return <GoodsItem key={item.goodsId} goodsInfo={item} isShowShop={true} />
              })}
            </View>
          </ScrollView>
        </View>
      )}
      {/* 暂无收藏 */}
      {goodsData && goodsData.length === 0 && <DefaultPage defaultHint="暂无收藏" imgSrc={require('~/images/nullCollection.png')} />}
    </View>
  )
}

const Collection = memo(Component)
export default Collection
