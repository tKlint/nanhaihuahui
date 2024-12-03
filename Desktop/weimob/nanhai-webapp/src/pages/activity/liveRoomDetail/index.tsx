import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useRef, useState } from 'react'
import { Button, View, Text } from '@tarojs/components'
import styles from './index.module.less'
import { ILiveProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'

/**
 * 小程序推流插件
 * @description 默认宽度为100%、无默认高度，请通过css设置宽高
 * @link 文档地址 https://cloud.tencent.com/document/product/1078/34646
 */

const Component: FC<ILiveProps> = () => {
  // 需要从路由等地方获取
  const testUrl = 'rtmp://wxzb.bnhnyc.com/live/test'
  // 组件实例
  const liveRoomPlugin = useRef<any>(null)
  // 插件是否初始化完成
  const [isPluginComplete, setIsPluginComplete] = useState(false)

  const [testEventText, setTestEventText] = useState('')
  
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
    <View className={styles.liveStyle}>
      <MMNavigation title="live" />

      <Button type="warn" disabled={!isPluginComplete} onClick={() => liveRoomPlugin.current!.start()}>
        开始看播
      </Button>
      <Button type="warn" disabled={!isPluginComplete} onClick={() => liveRoomPlugin.current!.stop()}>
        停止看播
      </Button>
      {/* 下面这两个功能应该用不到 */}
      <Button type="warn" disabled={!isPluginComplete} onClick={() => liveRoomPlugin.current!.requestFullScreen(true)}>
        全屏看播
      </Button>
      <Button type="warn" disabled={!isPluginComplete} onClick={() => liveRoomPlugin.current!.requestFullScreen(false)}>
        退出全屏
      </Button>

      <View>
        <Text>{testEventText}</Text>
      </View>

      <View style={{ width: 200, height: 200 }}>
        <live-room-play liveAppID="1309745153" playUrl={testUrl} onPlayEvent={onPlayEvent} onAttachedEvent={onAttachedEvent} />
      </View>
    </View>
  )
}

const liveRoomDetail = memo(Component)
Component.displayName = 'liveRoomDetail'

export default liveRoomDetail
