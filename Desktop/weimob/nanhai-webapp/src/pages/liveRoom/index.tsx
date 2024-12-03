import Taro from '@tarojs/taro'
import { FC, memo, useRef, useState } from 'react'
import { View, Image, Text, Input } from '@tarojs/components'
import styles from './index.module.less'
import { ILiveRoomProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import { MMModalAnimationType, MMModalJustifyContent } from '~/modules/@wmeimob/taro-design/src/components/modal/const'

const Component: FC<ILiveRoomProps> = () => {
  const [couponVisible, setCouponVisible] = useState<boolean>(false)
  // 是否是拍卖直播
  const [isAuction, setIsAuction] = useState<boolean>(true)
  // 是否是多手出价
  const [auctionMore, setAuctionMore] = useState<boolean>(true)

  // 需要从路由等地方获取
  const testUrl = 'rtmp://wxzb.bnhnyc.com/live/test'
  // 组件实例
  const liveRoomPlugin = useRef<any>(null)
  // 插件是否初始化完成
  const [isPluginComplete, setIsPluginComplete] = useState(false)

  const [testEventText, setTestEventText] = useState('')

  function onClose() {
    setCouponVisible(false)
  }

  function onAttachedEvent(event) {
    console.log('插件加载完成回调', event)
    // 获取直播插件实例
    const plugin = Taro.requirePlugin('liveRoomPlugin')
    liveRoomPlugin.current = plugin.instance.getLiveRoomInstance()
    setIsPluginComplete(true)
    console.log('liveRoomPlugin', liveRoomPlugin)
  }

  function onPlayEvent(event) {
    console.log('播放状态变化事件回调', event)
    setTestEventText(JSON.stringify(event.detail))
  }
  return (
    <View className={styles.liveRoomStyle}>
      <View style={{ width: '100%', height: '100%', position: 'absolute', left: '0', top: '0', zIndex: '-1' }}>
        <live-room-play liveAppID="1309745153" playUrl={testUrl} onPlayEvent={onPlayEvent} onAttachedEvent={onAttachedEvent} />
      </View>
      <View className={styles.liveShop}>
        <Image className={styles.liveShopIcon} src={require('~/images/icinfor_img.png')} />
        <View className={styles.liveShopInfo}>
          <View className={styles.liveShopName}>店铺名称</View>
          <View className={styles.liveShopData}>
            <Text>111观看</Text>
            <Text style={{ marginLeft: '10px' }}>1111粉丝</Text>
          </View>
        </View>
        <View className={styles.liveShopAttention}>关注</View>
      </View>

      <View className={styles.liveBullet}>
        <View className={styles.bulletElse}>
          <Image className={styles.bulletMemberImg} src={require('~/images/icinfor_img.png')} />
          <View className={styles.bulletCont}>
            欢迎 吟游诗人：15块钱包邮吗 <Text style={{ color: '#FFEAA9' }}>进场</Text>
          </View>
        </View>
        <View className={styles.bullet}>
          <Image className={styles.bulletMemberImg} src={require('~/images/icinfor_img.png')} />
          <View className={styles.bulletCont}>小马哥：15块钱包邮吗</View>
        </View>
        <View className={styles.bullet}>
          <Image className={styles.bulletMemberImg} src={require('~/images/icinfor_img.png')} />
          <View className={styles.bulletCont}>小马哥：15块钱包邮吗</View>
        </View>
        <View className={styles.bullet}>
          <Image className={styles.bulletMemberImg} src={require('~/images/icinfor_img.png')} />
          <View className={styles.bulletCont}>小马哥：15块钱包邮吗</View>
        </View>
        <View className={styles.bullet}>
          <Image className={styles.bulletMemberImg} src={require('~/images/icinfor_img.png')} />
          <View className={styles.bulletCont}>小马哥：15块钱包邮吗</View>
        </View>
      </View>
      <View className={styles.liveGood} style={{ marginRight: isAuction === false && auctionMore === false ? '130px' : '15px' }}>
        <Image className={styles.liveGoodImg} src={require('~/images/icinfor_img.png')} />
        <View className={styles.liveGoodInfo} style={{ width: auctionMore === false ? '140px' : '230px' }}>
          <View className={styles.liveGoodName} style={{ marginBottom: isAuction === true ? '0' : '27px', width: auctionMore === false ? '129px' : '230px' }}>
            商品名称
          </View>
          {isAuction === true && <View className={styles.auctionCountDown}>00：54</View>}
          <View className={styles.liveGoodPrice}>
            <Text>¥128.00</Text>
            {auctionMore === true && <View style={{ marginLeft: 'auto', display: 'inline-block' }}>正在出价</View>}
          </View>
        </View>
        {isAuction === true && auctionMore === false && (
          <View className={styles.liveAuction}>
            <View className={styles.auctionOne}>
              <Text className={styles.auctionOneTitle}>加一手</Text>
              <Text className={styles.auctionOneTitle}>+18</Text>
            </View>
            <View className={styles.auctionMore}>多手出价</View>
          </View>
        )}
        <Image className={styles.liveGoodBottom} src={require('~/images/goodbottom.png')} />
      </View>

      {auctionMore === true ? (
        <View className={styles.auctionHandle}>
          <View className={styles.auctionReduce}>-18</View>
          <View className={styles.auctionCurrent}>¥18</View>
          <View className={styles.auctionAdd}>+18</View>
          {/* 样式需要修改 ui提供切图 */}
          <View className={styles.handlePrice}>出价</View>
        </View>
      ) : (
        <View className={styles.liveHandle}>
          <Image className={styles.shopCart} src={require('~/images/shopcartlive.png')} />
          <Input className={styles.liveInput} value="" placeholder="快和主播聊聊吧? " placeholderStyle="color:#fff;line-height:44px,text-align:right" />
          <Image className={styles.liveShare} src={require('~/images/sharelive.png')} />
        </View>
      )}

      {isNewIphone && <View className="spacingIphone" />}

      <MMModal
        visible={couponVisible}
        maskClosable={true}
        onClose={() => onClose()}
        animationType={MMModalAnimationType.down}
        justifyContent={MMModalJustifyContent.flexEnd}
      >
        <View className={styles.reasonWrap}>
          <View className={styles.modalTitle}>
            <Text>商品列表</Text>
            <Image className={styles.titleIcon} src={require('~/images/cart.png')} />
          </View>
          <View className={styles.modalGood}>
            <Image className={styles.modalGoodImg} src={require('~/images/icinfor_img.png')} />
            <View className={styles.modalGoodInfo}>
              <View className={styles.modalGoodName}>商品名称</View>
              <View className={styles.modalGoodHandle}>
                <View className={styles.modalGoodPrice}>¥660.00</View>
                <View className={styles.modalGoodPrePrice}>¥660.001</View>
                <View className={styles.handle}>马上抢</View>
              </View>
            </View>
          </View>
        </View>
      </MMModal>
    </View>
  )
}

const LiveRoom = memo(Component)
export default LiveRoom
