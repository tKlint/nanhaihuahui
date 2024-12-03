import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { ICommentsAndLikesProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import DefaultPage from '~/components/defaultPage'

const Component: FC<ICommentsAndLikesProps> = () => {
  const arr = [1, 2, 3, 4, 5, 6]
  const [commentData, setCommentData] = useState<any>([
    {
      id: 1,
      shopName: '店铺名称',
      publishTime: '09:30',
      type: 1,
      reply: '种子星球里面的种子星球是最有意思的活动的',
      memberHeadImg: `${require('~/images/mine/like.png')}`,
      commentImg: `${require('~/images/mine/like.png')}`,
      commentTitle: '种子星球里面的种子星球是最有意思的活动的',
      publishDate: '2021-10-25'
    },
    {
      id: 2,
      shopName: '店铺名称',
      publishTime: '09:30',
      type: 2,
      reply: '',
      memberHeadImg: `${require('~/images/mine/like.png')}`,
      commentImg: `${require('~/images/mine/like.png')}`,
      commentTitle: '种子星球里面的种子星球是最有意思的活动的',
      publishDate: '2021-10-25'
    },
    {
      id: 3,
      shopName: '店铺名称',
      publishTime: '09:30',
      type: 1,
      reply: '种子星球里面的种子星球是最有意思的活动的',
      memberHeadImg: `${require('~/images/mine/like.png')}`,
      commentImg: `${require('~/images/mine/like.png')}`,
      commentTitle: '种子星球里面的种子星球是最有意思的活动的',
      publishDate: '2021-10-25'
    }
  ])
  return (
    <View className={styles.commentsAndLikesStyle}>
      <MMNavigation title="评论与点赞" />
      {commentData && commentData.length > 0 && (
        <View className={styles.commentsAndLikes}>
          <ScrollView scrollY className={styles.sview}>
            {commentData.map((item) => {
              return (
                <View key={item.id} className={styles.commentsAndLikesItem}>
                  <Image className={styles.commentsAndLikesHeadImg} src={item.memberHeadImg} />
                  <View className={styles.commentsAndLikesCont}>
                    <View className={styles.commentsAndLikesContTop}>
                      <View className={styles.shopName}>{item.shopName}</View>
                      <View className={styles.commentsAndLikesTime}>{item.publishTime}</View>
                    </View>
                    {/* 赞了您的作品～ */}
                    <View className={styles.commentsAndLikesType}>{item.type === 1 ? '评论' : '赞'}了您的作品</View>
                    {/* 只有评论才有 styles.comments的内容 */}
                    {item.type === 1 && <View className={styles.comments}>{item.reply}</View>}

                    <View className={styles.commentsWrap}>
                      <Image className={styles.commentsImg} src={item.commentImg} />
                      <View className={styles.commentsCont}>
                        <View className={styles.commentsTitle}>{item.commentTitle}</View>
                        <View className={styles.commentsTime}>{item.publishDate}</View>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      )}

      {commentData && commentData.length === 0 && <DefaultPage defaultHint="暂无评论或点赞" imgSrc={require('~/images/mine/noLikes.png')} />}
    </View>
  )
}

const CommentsAndLikes = memo(Component)
export default CommentsAndLikes
