import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { ITabberProps } from './const'
import styles from './index.module.less'

const Component: FC<ITabberProps> = (props) => {
  // 使用解构处理deafultProps
  // const {} = props;
  const { tabIndex = 0, tabArr = [], isBottomTxt = true, titleColor = '' } = props
  console.log(props)
  return (
    <View
      className={styles.tabberStyle}
      style={{
        height: isBottomTxt === true ? '50px' : '56px'
      }}
    >
      {tabArr.map((item, index: number) => {
        return (
          <View
            key={item.id}
            className={styles.tabberItem}
            style={{
              height: isBottomTxt === true ? '50px' : '56px',
              paddingTop: isBottomTxt === true ? '15px' : '18px'
              // justifyContent: isBottomTxt === true ? ' space-between' : ''
            }}
            onClick={() => props.setTabIndex(item.id)}
          >
            <View className={styles.tabberTitle} style={{ color: tabIndex === item.id ? props.titleColor || '#FD4F53' : '#ABABAB' }}>
              {item.title}
            </View>
            {tabIndex === item.id && isBottomTxt === true && <View className={styles.tabberCur} style={{ background: props.tabberCurBg || '' }} />}
            {tabIndex === item.id && isBottomTxt !== true && <Image className={styles.currentImg} src={require('~/images/city/tabImg.png')} />}
          </View>
        )
      })}
      {/* <View className={styles.tabberItem} onClick={() => setTabIndex(0)}>
        <View className={styles.tabberTitle} style={{ color: tabIndex === 0 ? '#333333' : '#ABABAB' }}>
          店铺
        </View>
        {tabIndex === 0 && <View className={styles.tabberCur} />}
      </View>
      <View className={styles.tabberItem} onClick={() => setTabIndex(1)}>
        <View className={styles.tabberTitle} style={{ color: tabIndex === 1 ? '#333333' : '#ABABAB' }}>
          直播
        </View>
        {tabIndex === 1 && <View className={styles.tabberCur} />}
      </View> */}
    </View>
  )
}

const Tabber = memo(Component)
export default Tabber
