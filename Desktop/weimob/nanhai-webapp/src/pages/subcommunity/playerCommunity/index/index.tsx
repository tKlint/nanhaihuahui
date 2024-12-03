import Taro, { FC, navigateBack, getSystemInfoSync, getMenuButtonBoundingClientRect, getCurrentInstance } from '@tarojs/taro'
import { memo, useEffect, useState } from 'react'
import { View, Text, Image, Textarea } from '@tarojs/components'
import { IIndexProps } from './const'
import MMIconFont from '~/modules/@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '~/modules/@wmeimob/taro-design/src/components/icon-font/const'
import CommunityItem from '~/components/communityItem'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import styles from './index.module.less'
import { api } from '~/request'
import { CommunityPosts, UserDetailInfoVO } from '~/request/data-contracts'
import { setGlobalData } from '~/GlobalData'
import { routeNames } from '~/routes'
import MMPopup from '~/components/popup'

const Component: FC<IIndexProps> = () => {
  const menuButtonBoundingClientRect =
    process.env.TARO_ENV === 'weapp'
      ? getMenuButtonBoundingClientRect()
      : {
          bottom: 56,
          height: 32,
          left: 278,
          right: 365,
          top: 24,
          width: 87
        }
  const statusBarHeight = process.env.TARO_ENV === 'weapp' ? getSystemInfoSync().statusBarHeight : 20
  const stateH = (menuButtonBoundingClientRect.top - statusBarHeight) * 2 + menuButtonBoundingClientRect.height
  const viewHeight = process.env.TARO_ENV === 'weapp' ? stateH + statusBarHeight + 'px' : stateH + 'px'
  // 简介信息
  const [detail, setDetail] = useState<UserDetailInfoVO>({})
  // 发布数据
  const [publishList, setPublishList] = useState<CommunityPosts[]>([])
  const [total, setTotal] = useState<number>(0)
  const [requestData, setRequestData] = useState<any>({
    pageNum: 1,
    pageSize: 10,
    openId: ''
  })
  // 修改简介
  const [visible, setVisible] = useState<boolean>(false)
  const [personalProfile, setPersonalProfile] = useState<string>('')

  useEffect(() => {
    getDetail()
  }, [])

  // 获取简介数据
  const getDetail = async () => {
    const { data = {} } = await api['/user/api/community/getUserByUserNo/{userNo}_GET'](getCurrentInstance().router?.params.userNo as any)

    setGlobalData({ communityOpenId: data.openId })
    setDetail(data)
    setRequestData({ ...requestData, openId: data.openId })
  }

  // 发布数据分页更新
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

  // 获取发布数据
  const getData = async (req) => {
    const { data = {} } = (await api['/user/api/community/getCommunityPostsByMyGive'](req)) as any
    const { list = [], total: totals } = data
    setPublishList(list)
    setTotal(totals)
  }

  const onSetProfile = (event) => {
    setPersonalProfile(event.detail.value)
  }

  // 修改简介
  const editInfo = async () => {
    const { code = 0 } = await api['/user/api/community/updateUserByPersonalProfile_POST']({ personalProfile, userNo: detail.userNo })
    if (code === 0) {
      setDetail({ ...detail, personalProfile })
      setPersonalProfile('')
      setVisible(false)
    }
  }

  return (
    <View className={styles.indexStyle}>
      {/* 顶部背景 */}
      <View className={styles.navTop} style={{ background: `url(${require('~/images/community/bg.png')}) no-repeat`, backgroundSize: '100% 100%' }}>
        <View className={styles.nav} style={{ height: viewHeight, paddingTop: process.env.TARO_ENV === 'weapp' ? statusBarHeight + 'px' : 0 }}>
          <View className={styles.back} onClick={() => navigateBack({ delta: 1 })}>
            <MMIconFont color="white" value={MMIconFontName.Back} />
          </View>
          <View className={styles.title}>玩家社区</View>
          <View className={styles.kong}> </View>
        </View>
        <Image className={styles.userImg} src={detail.headImg!} />
      </View>
      {/* 玩家信息 */}
      <View className={styles.playerInfo}>
        <View className={styles.editBtn}>
          <View className={styles.btn} onClick={() => setVisible(true)}>
            <Image className={styles.editicon} src={require('~/images/community/edit.png')} />
            <Text className={styles.edittext}>编辑</Text>
          </View>
        </View>
        <View className={styles.uname}>{detail.name}</View>
        {detail.personalProfile && <View className={styles.udesc}>{detail.personalProfile}</View>}

        <View className={styles.menus}>
          <View className={styles.item} onClick={() => Taro.navigateTo({ url: `${routeNames.subcommunityPlayerCommunityCollection}` })}>
            <Text className={styles.num}>{detail.myCollection}</Text>
            <View className={styles.title}>我的收藏</View>
          </View>
          <View className={styles.item} onClick={() => Taro.navigateTo({ url: `${routeNames.subcommunityPlayerCommunityFollow}` })}>
            <Text className={styles.num}>{detail.myFollow}</Text>
            <View className={styles.title}>我的关注</View>
          </View>
          <View className={styles.item} onClick={() => Taro.navigateTo({ url: '../fans/index' })}>
            <Text className={styles.num}>{detail.myFans}</Text>
            <View className={styles.title}>我的粉丝</View>
          </View>
          <View className={styles.item} onClick={() => Taro.navigateTo({ url: `${routeNames.subcommunityPlayerCommunityLike}` })}>
            <Text className={styles.num}>{detail.myGive}</Text>
            <View className={styles.title}>我的点赞</View>
          </View>
        </View>
      </View>
      {/* 我的发布信息 */}
      <View className={styles.wrapper} style={{ paddingBottom: isNewIphone ? '20px' : '10px' }}>
        <View className={styles.myfb}>
          <Image className={styles.fbicon} src={require('~/images/community/fb.png')} />
          <Text className={styles.fbtext}>我发布的</Text>
        </View>
      </View>
      <View className={styles.list}>
        <CommunityItem data={publishList} isSelf={true} update={() => updateData()} />
      </View>
      <MMPopup
        modalStyle={{ width: '340px', left: '18px' }}
        contentStyle={{ marginTop: '20px' }}
        title="编辑个人简介："
        visible={visible}
        onClose={() => setVisible(false)}
        onOk={() => editInfo()}
        cancelText="取消"
        okText="确定"
        footer={true}
      >
        <Textarea
          placeholder="输入个人简介"
          maxlength={200}
          value={personalProfile}
          onInput={onSetProfile}
          placeholderStyle="color:#999"
          className={styles.formTextArea}
        />
      </MMPopup>
    </View>
  )
}

const Index = memo(Component)
export default Index
