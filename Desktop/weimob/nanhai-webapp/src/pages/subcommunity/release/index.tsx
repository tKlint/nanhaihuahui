import Taro, { FC, useRouter } from '@tarojs/taro'
import { memo, useState } from 'react'
import { View, Image, Text, Textarea, ScrollView, Video, CoverView } from '@tarojs/components'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { IIndexProps } from './const'
import styles from './index.module.less'
import classnames from '~/modules/@wmeimob/utils/src/react-native/classnames'
import { EGlobalDataKey, getGlobalData } from '~/GlobalData'

const Component: FC<IIndexProps> = (props) => {
  const [classIndex, setClassIndex] = useState<number>(-1)
  const [showBox, setShowBox] = useState<boolean>(false) // 选择分类弹窗
  const [selectType, setSelectType] = useState<string>('') // 选择分类
  const [videoSrc, setVideoSrc] = useState<string>('') // 视频地址
  const [imgList, setImgList] = useState<Array>([
    {
      id: 1,
      src: require('~/images/goodImg.png')
    },
    {
      id: 2,
      src: require('~/images/goodImg.png')
    },
    {
      id: 3,
      src: require('~/images/goodImg.png')
    },
    {
      id: 4,
      src: require('~/images/goodImg.png')
    },
    {
      id: 1,
      src: require('~/images/goodImg.png')
    },
    {
      id: 2,
      src: require('~/images/goodImg.png')
    },
    {
      id: 3,
      src: require('~/images/goodImg.png')
    },
    {
      id: 4,
      src: require('~/images/goodImg.png')
    },
    {
      id: 4,
      src: require('~/images/goodImg.png')
    }
  ]) // 图片集合

  const list = getGlobalData(EGlobalDataKey.CommunityClassify)
  const currentType = useRouter().params.type // 发布类型 1：图片 2：视频

  // 选择分类
  function selectTab(item, i) {
    setClassIndex(i)
    setSelectType(item.title)
  }
  // 删除单个图片
  function removeCurrentImg(i) {
    const lists = [...imgList]
    lists.splice(i, 1)
    setImgList(lists)
  }
  // 选择文件
  function chooseFile(t) {
    if (t === 1) {
      Taro.chooseImage({
        success(res) {
          const tempFilePaths = res.tempFilePaths
          upLoadFile(t, tempFilePaths[0])
        }
      })
    } else {
      Taro.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        compressed: true,
        success: (res) => {
          upLoadFile(t, res.tempFilePath)
        }
      })
    }
  }
  // 上传文件
  function upLoadFile(t, url) {
    if (t === 1) {
      // setVideoSrc(url)
    } else {
      setVideoSrc(url)
    }
    // Taro.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload',
    //   filePath: url,
    //   name: 'file',
    //   formData: {
    //     'user': 'test'
    //   },
    //   success (res){

    //   }
    // })
  }
  return (
    <View className={styles.indexStyle}>
      <MMNavigation title="发布" />
      {/* 顶部信息 */}
      <View className={styles.topnav}>
        <View className={styles.user}>
          <Image className={styles.avater} src={require('~/images/icinfor_img.png')} />
          <Text className={styles.name}>JINLEILEI</Text>
        </View>
        <View className={styles.rbtn}>发布</View>
      </View>
      {/* 选择分类 */}
      <View className={styles.selectClassity} onClick={() => setShowBox(true)}>
        <Text className={styles.stitle}>选择分类</Text>
        <View className={styles.sname}>
          <Text className={styles.title}>{selectType}</Text>
          <Image className={styles.right} src={require('~/images/community/right.png')} />
        </View>
      </View>
      {/* 内容 */}
      <Textarea className={styles.content} placeholder="说点什么吧（500字）" placeholderStyle="color:#ABABAB;line-height:20px;" />
      {/* 图片区域 */}
      {currentType === '1' && (
        <View className={styles.imgs}>
          {imgList.map((item, index) => {
            return (
              <View key={index} className={styles.item}>
                <Image className={styles.img} src={item.src} />
                <Image onClick={() => removeCurrentImg(index)} className={styles.deleteimg} src={require('~/images/imageClose.png')} />
              </View>
            )
          })}
          {imgList.length < 9 && (
            <View onClick={() => chooseFile(1)} className={classnames(styles.img, styles.fileBtn)}>
              +
            </View>
          )}
        </View>
      )}

      {/* 视频区域 */}
      {currentType === '2' && (
        <View className={styles.video}>
          {videoSrc && (
            <View className={styles.videoBox}>
              <Video
                className={styles.videos}
                id="video"
                src={videoSrc}
                poster=""
                initialTime={0}
                controls={true}
                autoplay={false}
                loop={false}
                muted={false}
                objectFit="cover"
                showFullscreenBtn={false}
              />
              <CoverView className={styles.closeVideo} onClick={() => setVideoSrc('')}>
                <Image className={styles.deleteimg} src={require('~/images/imageClose.png')} />
              </CoverView>
            </View>
          )}
          {!videoSrc && (
            <View onClick={() => chooseFile(2)} className={classnames(styles.img, styles.fileBtn)}>
              +
            </View>
          )}
        </View>
      )}

      {/* 关联商品 */}
      <View className={styles.relationGoods} onClick={() => Taro.navigateTo({ url: '/pages/subcommunity/regoods/index' })}>
        +关联商品
      </View>
      {/* 已选择关联商品 */}
      {/* <View className={styles.relationGoodsItem}>
          <Image className={styles.deleteimg} src={require('~/images/imageClose.png')} />
          <Image className={styles.img} src={require('~/images/goodImg.png')} />
          <View className={styles.info}>
            <View className={styles.title}>商品名称</View>
            <View className={styles.desc}>商品简述商品简述商品简述商品简述商品简商品简述商品简述商品简述商品简述</View>
          </View>
       </View> */}

      {/* 选择分类弹框 */}
      {showBox && (
        <View className={styles.selectClassityWrapper}>
          <View className={styles.box}>
            <View className={styles.top}>
              <Text className={styles.title}>选择分类</Text>
              <Image onClick={() => setShowBox(false)} className={styles.close} src={require('~/images/close.png')} />
            </View>
            <ScrollView scrollY>
              <View className={styles.list} style={{ height: list.length > 12 ? '200px' : 'auto' }}>
                {list.map((item, index) => {
                  return (
                    <View
                      key={index}
                      onClick={() => selectTab(item, index)}
                      className={classnames(styles.item, index === classIndex ? styles.classItemTitleActive : '')}
                    >
                      {item.title}
                    </View>
                  )
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  )
}

const Index = memo(Component)
export default Index
