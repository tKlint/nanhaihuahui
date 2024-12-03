/* eslint-disable react/no-children-prop */
import Taro, { FC } from '@tarojs/taro'
import { memo, useEffect, useState } from 'react'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import { IIndexProps } from './const'
import classNames from 'classnames'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import styles from './index.module.less'
import { api } from '~/request'
import { UserMutualConcern } from '~/request/data-contracts'
import MMPopup from '~/components/popup'

const Component: FC<IIndexProps> = (props) => {
  const [fansList, setFansList] = useState<UserMutualConcern[]>([])
  const [total, setTotal] = useState<number>(0)
  const [requestData, setRequestData] = useState<any>({
    pageNum: 1,
    pageSize: 10
  })
  const [currentItem, setCurrentItem] = useState<any>({})

  const [followTip, setFollowTip] = useState<boolean>(false)

  useEffect(() => {
    getData(requestData)
  }, [])

  const updateData = async () => {
    const datas = requestData
    if (datas.pageSize < total) {
      datas.pageSize = datas.pageSize + 10
      setRequestData(datas)
      Taro.showLoading({ title: '', mask: true })
      await getData(requestData)
      Taro.hideLoading()
    }
  }

  const getData = async (req) => {
    Taro.showLoading({ title: '', mask: true })
    const { data = {} } = (await api['/user/api/community/getCommunityPostsByMyCollection_GET'](req)) as any
    const { list = [], total: totals } = data
    setFansList(list)
    setTotal(totals)
    Taro.hideLoading({})
  }
  function followHandle(item) {
    //
    setCurrentItem(item)
    if (item.focusStatus === '1') {
      setFollowTip(true)
    } else {
      handleSure(item)
    }
  }
  async function handleSure(item) {
    const { code = 0 } = await api['/user/api/community/removeUserMutualConcernForWechat/{id}_POST'](item.id)
    if (code === 0) {
      setFollowTip(false)
      const newList = fansList.map((val) => {
        if (val.id!.toString() === item.id!.toString()) {
          return {
            ...val,
            focusStatus: item.focusStatus === '1' ? '0' : '1'
          } as any
        }
        return val
      })
      setFansList(newList)
      if (item.focusStatus === 0) {
        Taro.showToast({
          title: '已关注',
          icon: 'none',
          mask: true
        })
      }
    }
  }
  return (
    <View className={styles.indexStyle}>
      <MMNavigation title="我的粉丝" />
      {fansList && fansList.length > 0 ? (
        <View className={styles.wrapper} style={{ marginTop: '10px', paddingBottom: isNewIphone ? '30px' : '20px' }}>
          <ScrollView scrollY lowerThreshold={150} onScrollToLower={() => updateData()} className={styles.sview}>
            {fansList.map((item, index) => {
              return (
                <View key={item.id} className={styles.item}>
                  <View className={styles.linfo}>
                    <Image className={styles.uimg} src={item.headImgB!} />
                    <Text className={styles.name}>{item.nameB}</Text>
                  </View>

                  <View className={item.focusStatus === '0' ? styles.followbtn : styles.followedbtn} onClick={() => followHandle(item)}>
                    {{ '0': '关注', '1': '互相关注' }[item.focusStatus!]}
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      ) : (
        <View className={styles.nocollection}>
          <Image className={styles.img} src={require('~/images/nullCollection.png')} />
          <View className={styles.title}>暂无数据</View>
        </View>
      )}
      <MMPopup
        title="提示"
        visible={followTip}
        onClose={() => setFollowTip(false)}
        onOk={() => handleSure(currentItem)}
        cancelText="取消"
        okText="确定"
        children="您确定不再关注吗"
        footer={true}
      />
    </View>
  )
}

const Index = memo(Component)
export default Index
