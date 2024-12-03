/* eslint-disable react/no-children-prop */
import Taro, { FC, getCurrentInstance } from '@tarojs/taro'
import { memo, useEffect, useState } from 'react'
import { View, Image, Input, Video, Text, RichText, ScrollView } from '@tarojs/components'
import { IIndexProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import styles from './index.module.less'
import { CommunityPostsVO } from '~/request/data-contracts'
import { api } from '~/request'
import MMPopup from '~/components/popup'

const Component: FC<IIndexProps> = (props) => {
  // const {} = props;
  const [detail, setDetail] = useState<CommunityPostsVO>({})
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [commentCont, setCommentCont] = useState<string>('')
  const [followTip, setFollowTip] = useState<boolean>(false)

  useEffect(() => {
    getDetail()
  }, [])
  const getDetail = async () => {
    const { data = {} } = await api['/user/api/community/getCommunityPosts/{id}_GET'](getCurrentInstance().router?.params.id as any)
    setDetail(data)
  }
  async function publishCont() {
    if (!commentCont) {
      return
    }
    const commonInfo = Taro.getStorageSync('commonInfo')
    const { code = 0 } = (await api['/user/api/community/insertForCommunityComment_POST']({
      openId: commonInfo.openId,
      postsId: detail.id,
      name: commonInfo.name,
      content: commentCont
    })) as any
    if (code === 0) {
      setCommentCont('')
      getDetail()
      setIsFocus(false)
      Taro.showToast({ title: '发表成功', icon: 'none' })
    }
  }

  function onOk() {
    handle({ isFollow: 0 }, detail)
  }
  async function handle(newHandle, info) {
    const { code = 0 } = (await api['/user/api/community/updateCommunityPostsByGiveNumber_POST']({ ...newHandle, postsId: info.id })) as any
    if (code === 0) {
      setFollowTip(false)
      setDetail({ ...detail, ...newHandle })
    }
  }
  return (
    <View className={styles.indexStyle}>
      <MMNavigation title="帖子详情" />
      <View className={styles.wrapper}>
        <ScrollView scrollY className={styles.sview}>
          {/* 基本信息 */}
          <View className={styles.item}>
            <View className={styles.topinfo}>
              <View className={styles.user}>
                <Image className={styles.avater} src={require('~/images/goodImg.png')} />
                <View className={styles.info}>
                  <View className={styles.uname}>{detail.name}</View>
                  {/* <View className={styles.ago}>{detail.gmtCreate}</View> */}
                </View>
              </View>
              <View
                onClick={() => (detail.isFollow === 1 ? setFollowTip(true) : handle({ isFollow: 1 }, detail))}
                className={detail.isFollow === 1 ? styles.followed : styles.follow}
              >
                {detail.isFollow === 1 ? '已关注' : '关注'}
              </View>
            </View>
            <View className={styles.desc}>
              <RichText nodes={detail.content} />
            </View>
            {detail.resourceType === 1 && (
              <Video
                className={styles.video}
                id="video"
                src="https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
                poster="https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg"
                initialTime={0}
                controls={true}
                autoplay={false}
                loop={false}
                muted={false}
                objectFit="cover"
                showFullscreenBtn={false}
              />
            )}

            <View className={styles.navs}>
              {/* <View className={styles.location}>
              <Image className={styles.aicon} src={require('~/images/community/address.png')} />
              <Text className={styles.address}>合肥市蜀山区</Text>
            </View> */}
              <View className={styles.views}>
                <Text className={styles.vnums}>{detail.viewsNumber}</Text>人观看
              </View>
            </View>
            {/* 关联商品信息 */}
            <View className={styles.goods}>
              <Image className={styles.leftImg} src={require('~/images/goodImg.png')} />
              <View className={styles.rdesc}>
                <View className={styles.title}>商品名称商品名称商品名称</View>
                <View className={styles.tdesc}>
                  商品简述商品简述商品简述商品简述商品简述商品简述商品简述商品简述商品简述商品简述商品简述商品简述商品简述商品简述商品简述商品简述商品简述商品简述商品简述商品简述
                </View>
              </View>
            </View>
          </View>
          {/* 评论信息 */}
          {detail && detail.communityCommentList && detail.communityCommentList.length > 0 && (
            <View className={styles.comment}>
              {detail.communityCommentList.map((item) => {
                return (
                  <View key={item.id} className={styles.citem}>
                    {/* TODO::缺少头像字段 */}
                    <Image className={styles.avater} src={require('~/images/goodImg.png')} />
                    <View className={styles.info}>
                      <View className={styles.nackname}>{item.name}</View>
                      <View className={styles.time}>{item.commentTime}</View>
                      <View className={styles.content}>{item.content}</View>
                    </View>
                  </View>
                )
              })}
            </View>
          )}
        </ScrollView>
      </View>{' '}
      {/* 评论按钮 */}
      <View className={styles.commentBox}>
        <View className={styles.commentWrapper}>
          <Input
            value={commentCont}
            onClick={() => setIsFocus(true)}
            onInput={(event) => setCommentCont(event.detail.value)}
            className={styles.commentInput}
            placeholder="发表你的想法"
            placeholderStyle="color:#ABABAB;line-height:17px;"
          />
          {isFocus === false ? (
            <View className={styles.commentBtns}>
              <View className={styles.btnitem}>
                <Image className={styles.icons} src={require('~/images/community/n1.png')} />
              </View>
              <View className={styles.btnitem}>
                <Image
                  className={styles.icons}
                  onClick={() => handle({ isGive: detail.isCollection === 1 ? 0 : 1 }, detail)}
                  src={detail.isCollection === 1 ? require('~/images/community/n2-1.png') : require('~/images/community/n2.png')}
                />
                {/* <Text className={styles.num}>78</Text> */}
              </View>
              <View className={styles.btnitem}>
                <Image
                  className={styles.icons}
                  onClick={() => handle({ isGive: detail.isGive === 1 ? 0 : 1 }, detail)}
                  src={detail.isGive === 1 ? require('~/images/community/n3-1.png') : require('~/images/community/n3.png')}
                />
                <Text className={styles.num}>{detail.giveNumber}</Text>
              </View>
            </View>
          ) : (
            <View className={styles.publishBtn} onClick={() => publishCont()}>
              发表
            </View>
          )}
        </View>
        {isNewIphone && <View className="spacingIphone" style={{ background: '#FFF' }} />}
      </View>
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
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const CommunityDetail = memo(Component)
export default CommunityDetail
