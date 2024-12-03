import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { ScrollView, View } from '@tarojs/components'
import styles from './index.module.less'
import { IGroupBookProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import Tabber from '~/components/tabber'
import OrderGood from '~/components/orderGood'
import classNames from 'classnames'
import DefaultPage from '~/components/defaultPage'
import InviteMember from '~/pages/business/inviteMember'
import { api } from '~/request'
import { routeNames } from '~/routes'

const Component: FC<IGroupBookProps> = () => {
  const [tabIndex, setTabIndex] = useState<string>('ALL')
  const [groupData, setGroupData] = useState<any>([])
  const [total, setTotal] = useState<number>(0)
  const [requestData, setRequestData] = useState<any>({
    pageNum: 1,
    pageSize: 10,
    type: tabIndex
  })
  const tabber = [
    {
      id: 'ALL',
      title: '全部'
    },
    {
      id: 'ONGOING',
      title: '进行中'
    },
    {
      id: 'SUCCESSED',
      title: '成功'
    },
    {
      id: 'EXPIRED',
      title: '失败'
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
    <View className={styles.groupBookStyle}>
      <MMNavigation title="我的拼团" />
      <Tabber tabIndex={tabIndex} setTabIndex={setTabIndex} tabArr={tabber} />
      {groupData && groupData.length > 0 && (
        <View className={styles.groupBook}>
          <ScrollView scrollY className={styles.sview} lowerThreshold={150} onScrollToLower={() => update()}>
            {groupData.map((item) => {
              return (
                <View key={item.id} className={styles.groupBookItem}>
                  <View className={styles.groupBookTop}>
                    <View className={styles.groupBookShopName}>店铺名称</View>
                    <View
                      className={classNames(
                        styles.groupBookTypeName,
                        { 0: styles.groupBookTypeNameWait, 1: '', 2: styles.groupBookTypeNameSuccess, 3: '' }[item.groupWorkStatus] || ''
                      )}
                    >
                      {{
                        1: `待分享，差${item.groupNum - item.joinedPersonsCount}人`,
                        2: `失败，差${item.groupNum - item.joinedPersonsCount}人`,
                        3: `成功，满${item.groupNum}人`
                      }[item.groupWorkStatus] || ''}
                    </View>
                  </View>
                  <OrderGood goodsInfo={item.orderGoods} isHidePrice={true} />
                  <View
                    onClick={() => Taro.navigateTo({ url: `${routeNames.orderGroupBookDetail}?orderNO=${item.orderGoods.ordernNo}` })}
                    className={classNames(styles.groupBookHandle, item.groupWorkStatus === 1 ? styles.groupBookHandleElse : '')}
                  >
                    {item.groupWorkStatus === 1 ? '分享好友拼单' : '查看详情'}
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      )}

      {groupData && !groupData.length && <DefaultPage defaultHint="暂无拼团" imgSrc={require('~/images/noOrder.png')} imgTop="100px" />}
    </View>
  )
}

const GroupBook = memo(Component)
export default GroupBook
