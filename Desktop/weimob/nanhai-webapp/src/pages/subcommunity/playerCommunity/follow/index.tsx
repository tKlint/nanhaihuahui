/* eslint-disable react/no-children-prop */
import Taro, { FC } from '@tarojs/taro'
import { memo, useEffect, useState } from 'react'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import { IIndexProps } from './const'
import classNames from 'classnames'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import styles from './index.module.less'
import { EGlobalDataKey, getGlobalData } from '~/GlobalData'
import { api } from '~/request'
import DefaultPage from '~/components/defaultPage'
import MMPopup from '~/components/popup'

const Component: FC<IIndexProps> = (props) => {
  const openId = getGlobalData(EGlobalDataKey.CommunityOpenId)
  const [list, setList] = useState<any>([])
  const [total, setTotal] = useState<number>(0)
  const [requestData, setRequestData] = useState<any>({ pageNum: 1, pageSize: 10, openId })
  const [currentItem, setCurrentItem] = useState<any>({})

  const [followTip, setFollowTip] = useState<boolean>(false)
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
      const newList = list.map((val) => {
        if (val.id!.toString() === item.id!.toString()) {
          return {
            ...val,
            focusStatus: item.focusStatus === '1' ? '0' : '1'
          } as any
        }
        return val
      })
      setList(newList)
      if (item.focusStatus === 0) {
        Taro.showToast({
          title: '已关注',
          icon: 'none',
          mask: true
        })
      }
    }
  }
  async function getFllows(req) {
    const { data = {} } = (await api['/user/api/community/getCommunityPostsByMyFollow_GET'](req)) as any
    const { list: lists = [], total: totals } = data
    setList(lists)
    setTotal(totals)
  }
  const update = async () => {
    const datas = requestData
    if (datas.pageSize < total) {
      datas.pageSize = datas.pageSize + 10
      setRequestData(datas)
      Taro.showLoading({ title: '', mask: true })
      getFllows(datas)
      Taro.hideLoading()
    }
  }
  useEffect(() => {
    getFllows(requestData)
  }, [])
  return (
    <View className={styles.indexStyle}>
      <MMNavigation title="我的关注" />
      <View className={styles.wrapper} style={{ marginTop: '10px', paddingBottom: isNewIphone ? '30px' : '20px' }}>
        {list && list.length > 0 && (
          <ScrollView scrollY lowerThreshold={150} onScrollToLower={() => update()} className={styles.sview}>
            {list.map((item, index) => {
              return (
                <View key={index} className={styles.item}>
                  <View className={styles.linfo}>
                    <Image className={styles.uimg} src={item.headImgB} />
                    <Text className={styles.name}>{item.nameB}</Text>
                  </View>

                  <View className={item.focusStatus === '0' ? styles.followbtn : styles.followedbtn} onClick={() => followHandle(item)}>
                    {item.focusStatus === '0' ? '取消关注' : '互相关注'}
                  </View>
                </View>
              )
            })}
          </ScrollView>
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
        {list && list.length === 0 && <DefaultPage imgSrc={require('~/images/nullCollection.png')} defaultHint="暂无关注" />}
      </View>
    </View>
  )
}

const Index = memo(Component)
export default Index
