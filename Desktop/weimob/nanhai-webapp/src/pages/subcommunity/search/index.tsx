import Taro, { FC } from '@tarojs/taro'
import { memo, useEffect, useState } from 'react'
import { View, ScrollView, Image, Input, Text } from '@tarojs/components'
import { IIndexProps } from './const'
import styles from './index.module.less'
import CommunityItem from '~/components/communityItem'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { CommunityHotWords } from '~/request/data-contracts'
import { api } from '~/request'

const Component: FC<IIndexProps> = (props) => {
  const [hotSearch, setHotSearch] = useState<CommunityHotWords[]>([])
  // const {} = props;
  const hotSearchIocn = [
    require('~/images/community/r1.png'),
    require('~/images/community/r2.png'),
    require('~/images/community/r3.png'),
    require('~/images/community/r4.png'),
    require('~/images/community/r5.png'),
    require('~/images/community/r6.png'),
    require('~/images/community/r7.png'),
    require('~/images/community/r8.png'),
    require('~/images/community/r9.png'),
    require('~/images/community/r10.png')
  ]

  async function getHot() {
    const { data = {} } = await api['/user/api/community/_GET']({})
    setHotSearch(data.list!)
  }

  useEffect(() => {
    getHot()
  }, [])
  return (
    <View className={styles.indexStyle}>
      <MMNavigation title="搜索" />
      <ScrollView scrollY className={styles.sview}>
        {/* 顶部搜索 */}
        <View className={styles.top}>
          <View className={styles.topSearch}>
            <View className={styles.mallSearch}>
              <Image className={styles.mallSearchIcon} src={require('~/images/home/search.png')} />
              <Input className={styles.mallSearchInput} placeholder="试试您想寻找的内容" placeholderStyle="color:#ABABAB;line-height:17px;" />
            </View>
          </View>
          <View className={styles.searchBtn}>搜索</View>
        </View>
        {/* 搜索无结果 */}
        <view className={styles.empty}>
          <Image className={styles.emptyImg} src={require('~/images/noSearch.png')} />
          <View className={styles.emptyTip}>Ops！未搜索到相关内容</View>
        </view>
        {/* 热搜榜 */}
        {hotSearch && hotSearch.length > 0 && (
          <View className={styles.hotSearch}>
            <View className={styles.title}>热搜榜</View>
            <View className={styles.hotArea}>
              <View className={styles.leftArea}>
                {hotSearch.map((item, index) => {
                  if (index <= 4) {
                    return (
                      <View key={index} className={styles.hotitem}>
                        <Image className={styles.itemicon} src={hotSearchIocn[index]} />
                        <View className={styles.itemtitle}>{item.hotWords}</View>
                        <Text className={styles.nums}>{item.hotWordsIndex}</Text>
                      </View>
                    )
                  }
                })}
              </View>
              {hotSearch.length > 5 && (
                <View className={styles.rightArea}>
                  {hotSearch.map((item, index) => {
                    if (index >= 5 && index < 10) {
                      return (
                        <View key={index} className={styles.hotitem}>
                          <Image className={styles.itemicon} src={hotSearchIocn[index + 5]} />
                          <View className={styles.itemtitle}>{item.hotWords}</View>
                          <Text className={styles.nums}>{item.hotWordsIndex}</Text>
                        </View>
                      )
                    }
                  })}
                </View>
              )}
            </View>
          </View>
        )}

        {/* 搜索有结果列表数据 */}
        {/* <View className={styles.wrapper}>
              <CommunityItem />
          </View> */}
      </ScrollView>
    </View>
  )
}

const CommunitySearch = memo(Component)
export default CommunitySearch
