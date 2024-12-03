import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { IMessageCenterProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import DefaultPage from '~/components/defaultPage'

const Component: FC<IMessageCenterProps> = () => {
  const [messageData, setmessageData] = useState<any>([1, 2, 3, 4, 5])
  return (
    <View className={styles.messageCenterStyle}>
      <MMNavigation title="消息中心" />
      <View className={styles.messageCenterTab}>
        <View className={styles.messageCenterTabItem} onClick={() => Taro.navigateTo({ url: '/pages/mine/inMall/index' })}>
          <Image className={styles.messageCenterTabItemImg} src={require('~/images/mine/message.png')} />
          <Text className={styles.messageCenterTabItemTxt}>站内信</Text>
        </View>
        <View
          className={styles.messageCenterTabItem}
          style={{ margin: '0 63px' }}
          onClick={() => Taro.navigateTo({ url: '/pages/mine/commentsAndLikes/index' })}
        >
          <Image className={styles.messageCenterTabItemImg} src={require('~/images/mine/like.png')} />
          <Text className={styles.messageCenterTabItemTxt}>评论与点赞</Text>
        </View>
        <View className={styles.messageCenterTabItem} onClick={() => Taro.navigateTo({ url: '/pages/supportService/index' })}>
          <Image className={styles.messageCenterTabItemImg} src={require('~/images/mine/service.png')} />
          <Text className={styles.messageCenterTabItemTxt}>客服中心</Text>
        </View>
      </View>
      {messageData && messageData.length > 0 && (
        <View className={styles.messageCenter}>
          <ScrollView scrollY className={styles.sview}>
            <View className={styles.messageList}>
              {messageData.map((item) => {
                return (
                  <View key={item} className={styles.message}>
                    <Image className={styles.messageImg} src={require('~/images/mine/message.png')} />
                    <View className={styles.messageCont}>
                      <View className={styles.messageContTop}>
                        <View className={styles.messageName}>i你改成www</View>
                        <View className={styles.messageTime}>09:30</View>
                      </View>
                      <View className={styles.messageContBottom}>
                        <View className={styles.messageNews}>111</View>
                        {/* 未读状态 */}
                        {/* <View className={styles.unread} /> */}
                      </View>
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
      )}
      {messageData && !messageData.length && <DefaultPage defaultHint="暂无消息" imgSrc={require('~/images/mine/noNews.png')} imgTop="126px" />}
    </View>
  )
}

const MessageCenter = memo(Component)
export default MessageCenter
