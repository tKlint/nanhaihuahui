import Taro, { FC } from '@tarojs/taro'
import { memo, useEffect, useState } from 'react'
import { View, ScrollView, Image, Input, Text } from '@tarojs/components'
import { IIndexProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import { Goods } from '~/request/data-contracts'
import { api } from '~/request'
const Component: FC<IIndexProps> = (props) => {
  // const {} = props;
  const [goodsList, setGoodsList] = useState<Goods[]>([])
  const [requestData, setRequestData] = useState<any>({ pageNum: 1, pageSize: 10 })
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    allGoods(requestData)
  })
  // 分页
  async function update() {
    const datas = requestData
    if (datas.pageSize < total) {
      datas.pageSize = datas.pageSize + 10
      setRequestData(datas)
      Taro.showLoading({ title: '', mask: true })
      await allGoods(requestData)
      Taro.hideLoading()
    }
  }
  // 请求所有商品
  async function allGoods(req) {
    const { data = {} } = (await api['/user/api/goods_GET'](req)) as any
    const { list = [], total: totals } = data
    setGoodsList(list)
    setTotal(totals)
  }

  return (
    <View className={styles.indexStyle}>
      <MMNavigation title="搜索" />
      {/* 顶部搜索 */}
      <View className={styles.top}>
        <View className={styles.topSearch}>
          <View className={styles.mallSearch}>
            <Image className={styles.mallSearchIcon} src={require('~/images/home/search.png')} />
            <Input className={styles.mallSearchInput} placeholder="您想找的商品名称" placeholderStyle="color:#ABABAB;line-height:17px;" />
          </View>
        </View>
        <View className={styles.searchBtn}>搜索</View>
      </View>

      {/* 商品列表 */}
      <View className={styles.wrapper}>
        <ScrollView scrollY className={styles.sview} lowerThreshold={150} onScrollToLower={() => update()}>
          <View className={styles.goodslist}>
            {goodsList.map((item, index) => {
              return (
                <View key={index} className={styles.gitem}>
                  <Image className={styles.limg} src={item.coverImgUrl!} />
                  <View className={styles.rdesc}>
                    <View className={styles.title}>{item.goodsName}</View>
                    <View className={styles.store}>{item.storeName}</View>
                    <View className={styles.price}>
                      <View className={styles.p_price}>￥{item.salesPrice}</View>
                      <View className={styles.t_price}>￥{item.minimumPrisePrice}</View>
                    </View>
                  </View>
                </View>
              )
            })}
          </View>
        </ScrollView>
      </View>
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const Index = memo(Component)
export default Index
