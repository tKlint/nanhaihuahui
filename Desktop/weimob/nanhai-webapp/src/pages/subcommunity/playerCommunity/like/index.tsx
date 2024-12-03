/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-undef */
import Taro, { FC } from '@tarojs/taro'
import { memo, useState } from 'react'
import { View, Image } from '@tarojs/components'
import { IIndexProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import CommunityItem from '~/components/communityItem'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import styles from './index.module.less'
import { getGlobalData, EGlobalDataKey } from '~/GlobalData'
import { api } from '~/request'
import { CommunityPosts } from '~/request/data-contracts'
import DefaultPage from '~/components/defaultPage'
import MMPopup from '~/components/popup'

const Component: FC<IIndexProps> = (props) => {
  const openId = getGlobalData(EGlobalDataKey.CommunityOpenId)
  const [likeList, setLikeList] = useState<CommunityPosts[]>([])
  const [followTip, setFollowTip] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [requestData, setRequestData] = useState<any>({
    pageNum: 1,
    pageSize: 10,
    openId
  })

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
    const { data = {} } = (await api['/user/api/community/getCommunityPostsByMyGive'](req)) as any
    const { list = [], total: totals } = data
    setLikeList(list)
    setTotal(totals)
  }

  async function followClick(type: number, item: CommunityPosts, handleType: number) {
    let newHandle = {}
    switch (handleType) {
      case 1:
        newHandle = { isFollow: type }
        break
      case 2:
        newHandle = { isCollection: type }
        break
      case 3:
        newHandle = { isGive: type }
        break

      default:
        break
    }
    const newList = likeList.map((val) => {
      if (val.id!.toString() === item.id!.toString()) {
        return {
          ...val,
          ...newHandle
        } as any
      }
      return val
    })

    // 请求接口
    const { code = 0 } = (await api['/user/api/community/updateCommunityPostsByGiveNumber_POST']({ ...newHandle, postsId: item.id })) as any
    if (code === 0) {
      if (handleType === 3) {
        setLikeList(newList.filter((value) => value.id !== Number(item.id)))
      } else {
        setLikeList(newList)
      }
    }
  }

  // 关注
  function followFun(t, e) {
    e.stopPropagation()
    if (t === 1) {
      Taro.showToast({
        title: '已关注',
        icon: 'none',
        mask: true
      })
    } else {
      setFollowTip(true)
    }
  }

  function onOk() {}
  return (
    <View className={styles.indexStyle}>
      <MMNavigation title="我的点赞" />
      <View className={styles.wrapper} style={{ marginTop: '10px', paddingBottom: isNewIphone ? '20px' : '10px' }}>
        {likeList && likeList.length > 0 ? (
          <CommunityItem data={likeList} followClick={() => followClick} follow={() => followFun} update={() => updateData()} />
        ) : (
          <DefaultPage imgSrc={require('~/images/noOrder.png')} defaultHint="暂无点赞" />
        )}
      </View>
      {/* 不再关注提示 */}
      <MMPopup
        title="提示"
        visible={followTip}
        onClose={() => setFollowTip(false)}
        onOk={() => onOk()}
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
