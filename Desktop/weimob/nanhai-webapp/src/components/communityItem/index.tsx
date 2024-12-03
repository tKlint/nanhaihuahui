import Taro, { FC } from '@tarojs/taro'
import { memo, useState } from 'react'
import { View, Image, Input, Video, Text, ScrollView, RichText } from '@tarojs/components'
import { IIndexProps } from './const'
import styles from './index.module.less'
import { routeNames } from '~/routes'
import { api } from '~/request'
import { EGlobalDataKey, getGlobalData } from '~/GlobalData'

const Component: FC<IIndexProps> = (props) => {
  const [videoId, setVideoId] = useState<any>(null) // 当前播放视频的ID
  const ims = [
    {
      id: 1,
      url: 'https://cdn.uviewui.com/uview/swiper/swiper1.png'
    },
    {
      id: 2,
      url: 'https://cdn.uviewui.com/uview/swiper/swiper2.png'
    },
    {
      id: 3,
      url: 'https://cdn.uviewui.com/uview/swiper/swiper3.png'
    },
    {
      id: 4,
      url: 'https://cdn.uviewui.com/uview/swiper/swiper2.png'
    },
    {
      id: 5,
      url: 'https://cdn.uviewui.com/uview/swiper/swiper1.png'
    }
  ]
  const { isSelf = false } = props
  const [current, setCurrent] = useState<any>({ id: 0 })
  // 图片预览
  function bigImg(evevt, currentimg, imglist) {
    evevt.stopPropagation()
    const list = []
    imglist.map((item) => {
      list.push(item.url)
    })
    Taro.previewImage({
      current: currentimg,
      urls: list
    })
  }

  // 视频播放
  function playVideo(id) {
    // 没有播放时播放视频
    if (!videoId) {
      setVideoId(id)
      const videoContext = Taro.createVideoContext(String(id), this)
      videoContext.play()
    } else {
      // 有播放时先将prev暂停，再播放当前点击的current
      const videoContextPrev = Taro.createVideoContext(String(videoId), this)
      if (videoId !== id) {
        videoContextPrev.pause()
      }
      setVideoId(id)
      const videoContextCurrent = Taro.createVideoContext(String(id), this)
      videoContextCurrent.play()
    }
  }

  async function publishCont() {
    if (current.commentCon) {
      return
    }
    const commonInfo = Taro.getStorageSync('commonInfo')
    const { code = 0 } = (await api['/user/api/community/insertForCommunityComment_POST']({
      openId: commonInfo.openId,
      postsId: current.id,
      name: commonInfo.name,
      content: current.commentCon
    })) as any
    if (code === 0) {
      setCurrent({ id: 0, commentCon: '' })
      Taro.showToast({ title: '发表成功', icon: 'none' })
    }
  }

  return (
    <ScrollView scrollY lowerThreshold={150} onScrollToLower={props.update} className={styles.sview}>
      {props.data.map((item, index) => {
        return (
          <View key={index} className={styles.item} onClick={() => Taro.navigateTo({ url: routeNames.subcommunityDetail + '?id=' + item.id })}>
            <View className={styles.topinfo}>
              <View className={styles.user}>
                <Image className={styles.avater} src={require('~/images/goodImg.png')} />
                <View className={styles.info}>
                  <View className={styles.uname}>{item.name}</View>
                  {/* <View className={styles.ago}>一个小时前{item.gmtCreate}</View> */}
                </View>
              </View>
              {isSelf === false &&
                (item.isFollow === 1 ? (
                  <View
                    onClick={(ev) => {
                      ev.stopPropagation()
                      props.followClick(0, item, 1)
                    }}
                    className={styles.followed}
                  >
                    已关注
                  </View>
                ) : (
                  <View
                    onClick={(ev) => {
                      ev.stopPropagation()
                      props.followClick(1, item, 1)
                    }}
                    className={styles.follow}
                  >
                    关注
                  </View>
                ))}
            </View>
            <View className={styles.desc}>
              <RichText nodes={item.content} />
            </View>
            {item.resourceType === 0 && (
              <View className={styles.imgs}>
                {ims.map((img) => {
                  return <Image mode="aspectFill" onClick={(evevt) => bigImg(evevt, img.url, ims)} key={item.id} className={styles.img} src={img.url} />
                })}
              </View>
            )}
            {item.resourceType === 1 && (
              <Video
                className={styles.video}
                id={item.id}
                src="https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
                poster="https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg"
                initialTime={0}
                controls={true}
                autoplay={false}
                loop={false}
                muted={false}
                objectFit="cover"
                showFullscreenBtn={false}
                onPlay={() => playVideo(item.id)}
              />
            )}
            {isSelf === false && (
              <View className={styles.navs}>
                <View className={styles.btns}>
                  <View className={styles.btnitem}>
                    <Image className={styles.icons} src={require('~/images/community/n1.png')} />
                  </View>
                  <View className={styles.btnitem}>
                    <Image
                      onClick={(ev) => {
                        ev.stopPropagation()
                        props.followClick(item.isCollection === 1 ? 0 : 1, item, 2)
                      }}
                      className={styles.icons}
                      src={item.isCollection === 1 ? require('~/images/community/n2-1.png') : require('~/images/community/n2.png')}
                    />
                  </View>
                  <View className={styles.btnitem}>
                    <Image
                      onClick={(ev) => {
                        ev.stopPropagation()
                        props.followClick(item.isGive === 1 ? 0 : 1, item, 3)
                      }}
                      className={styles.icons}
                      src={item.isGive === 1 ? require('~/images/community/n3-1.png') : require('~/images/community/n3.png')}
                    />
                    <Text className={styles.num}>{item.giveNumber}</Text>
                  </View>
                </View>
              </View>
            )}

            <View className={styles.comment}>
              {current.id !== item.id && (
                <View className={styles.views}>
                  <Text className={styles.vnums}>{item.viewsNumber}</Text>人观看
                </View>
              )}
              {isSelf === false && (
                <View className={styles.commentputbox}>
                  {current.id === item.id ? (
                    <Input
                      className={styles.commentput}
                      onClick={(ev) => {
                        ev.stopPropagation()
                        setCurrent(item)
                      }}
                      placeholder="发表你的看法"
                      placeholderStyle="color:#ABABAB;line-height:17px;"
                      value={current.commentCon}
                      onInput={(evevt) => setCurrent({ ...current, commentCon: evevt.detail.value })}
                    />
                  ) : (
                    <Input
                      className={styles.commentput}
                      onClick={(ev) => {
                        ev.stopPropagation()
                        setCurrent(item)
                      }}
                      placeholder="发表你的看法"
                      placeholderStyle="color:#ABABAB;line-height:17px;"
                    />
                  )}
                  {/*   */}
                </View>
              )}

              {current.id === item.id && (
                <View
                  className={styles.publishBtn}
                  onClick={(ev) => {
                    ev.stopPropagation()
                    publishCont()
                  }}
                >
                  发表
                </View>
              )}
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

const CommunityItem = memo(Component)
export default CommunityItem
