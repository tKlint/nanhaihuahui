import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Image, ScrollView, Text } from '@tarojs/components'
import styles from './index.module.less'
import { IGroupHomeProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import classNames from 'classnames'
import Tabber from '~/components/tabber'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import { api } from '~/request'
import { routeNames } from '~/routes'

const Component: FC<IGroupHomeProps> = () => {
  const [tabIndex, setTabIndex] = useState<string>('ONGOING')
  const [groupData, setGroupData] = useState<any>([])
  const [total, setTotal] = useState<number>(0)
  const [requestData, setRequestData] = useState<any>({
    pageNum: 1,
    pageSize: 10,
    type: tabIndex
  })
  const tabberArr = [
    {
      id: 'ONGOING',
      title: '拼团中'
    },
    {
      id: 'SUCCESSED',
      title: '拼团成功'
    },
    {
      id: 'EXPIRED',
      title: '已过期'
    },
    {
      id: 'ALL',
      title: '全部'
    }
  ]

  useEffect(() => {
    const req = { ...requestData, type: tabIndex }
    setRequestData(req)
    getGroup(req)
  }, [tabIndex])

  const getGroup = async (req) => {
    const { data = {} } = (await api['/user/api/activity/_GET'](req)) as any
    const { list = [], total: totals } = data
    setGroupData(list)
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
    <View className={styles.groupHomeStyle}>
      <MMNavigation title="拼团首页" />
      <Tabber tabIndex={tabIndex} setTabIndex={setTabIndex} tabArr={tabberArr} isBottomTxt={false} />
      {groupData && groupData.length > 0 && (
        <View className={styles.groupHome}>
          <ScrollView scrollY className={styles.sview} lowerThreshold={150} onScrollToLower={() => update()}>
            <View className={styles.group}>
              {groupData.map((item) => {
                return (
                  item.goods && (
                    <View key={item.id} className={styles.groupWrap}>
                      <View className={styles.groupWrapTop}>
                        <Image src={item.goods.coverImgUrl} className={styles.groupWrapTopImg} />
                        <View className={styles.groupGoodInfo}>
                          <View className={styles.groupGoodName}>{item.goods.goodName}</View>
                          <View className={styles.groupGoodDesc}>{item.goods.goodsSketch}</View>
                          <View className={styles.groupGoodPrice}>
                            <View className={styles.groupGoodCurrentPrice}>¥{item.goods.salesPrice}</View>
                            <View className={styles.groupGoodPrePrice}>
                              原价<Text>¥{item.goods.originPrice}</Text>
                            </View>
                          </View>
                        </View>
                        {item.attributionType === 2 && <View className={styles.groupShop}>自营</View>}
                      </View>
                      <View className={styles.groupProgress}>
                        <View style={{ width: (item.joinedPersonsCount / item.groupNum) * 100 + '%' }} className={styles.groupCurrentProgress} />
                      </View>
                      <View className={styles.groupPerson}>
                        <View className={styles.groupPersonCurrent} style={{ color: item.groupGoodsStatus === 3 ? '#ababab' : '#FD4F53' }}>
                          {item.groupGoodsStatus === 2 ? '已拼满' : `已拼${item.joinedPersonsCount}人`}{' '}
                        </View>
                        <View className={styles.groupPersonTotal}>{item.groupNum}人</View>
                      </View>
                      <View className={styles.groupHandle}>
                        <View className={styles.groupHint}>
                          {item.groupGoodsStatus === 1 && (
                            <View>
                              {/* item.endTimeStamp */}
                              剩余<Text style={{ color: '#FD4F53' }}>23:19:42</Text>
                            </View>
                          )}
                          {item.groupGoodsStatus === 0 && '未开始'}
                          {(item.groupGoodsStatus === 2 || item.groupGoodsStatus === 3) && (
                            <View>
                              {/* item.restTime */}
                              还剩<Text style={{ color: '#ababab' }}>23:19:42</Text>
                            </View>
                          )}
                        </View>
                        <View
                          onClick={() => Taro.navigateTo({ url: `${routeNames.activityGoodDetail}?goodsNo=${item.goods.goodsNo}&groupWorkId=${item.id}` })}
                          className={classNames(styles.handle, { 0: '', 1: '', 2: styles.handleElse, 3: styles.handlePast }[item.groupGoodsStatus] || '')}
                        >
                          {{ 0: '开启拼团', 1: '加入拼团', 2: '拼团成功', 3: '已过期' }[item.groupGoodsStatus] || ''}
                        </View>
                      </View>
                    </View>
                  )
                )
              })}
            </View>
          </ScrollView>
        </View>
      )}
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const GroupHome = memo(Component)
export default GroupHome
