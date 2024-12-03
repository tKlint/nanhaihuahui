import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { INavProps } from './const'
import styles from './index.module.less'
import { routeNames } from '~/routes'
import { getGlobalData } from '~/GlobalData'
import global from '~/globalStore'

const Component: FC<INavProps> = (props) => {
  // 使用解构处理deafultProps
  // const {} = props;
  const { userInfo = {} } = props
  const commonInfo = Taro.getStorageSync('commonInfo')
  function login() {
    if (commonInfo && commonInfo.userNo) {
      //
    } else {
      global.toLogin(true)
    }
  }
  return (
    <View className={styles.navStyle}>
      <View className={styles.navHead}>
        <View className={styles.navHeadImg}>
          {/* src="../../../../images/tabberMine/headImg.png" */}
          <Image className={styles.navHeadImage} src={userInfo.headImg} />
        </View>
        <View className={styles.navHeadName} onClick={() => login()}>
          {commonInfo && commonInfo.userNo ? userInfo.name : '请先登录'}
        </View>
        {commonInfo && commonInfo.userNo ? (
          <View onClick={() => Taro.navigateTo({ url: routeNames.mineSign })} className={styles.navHeadSign}>
            签到
          </View>
        ) : (
          <View className={styles.navHeadSign}>签到</View>
        )}
        <Image
          className={styles.navHeadSet}
          src={require('~/images/tabberMine/setIcon.png')}
          onClick={() => Taro.navigateTo({ url: routeNames.mineSetting })}
        />
      </View>
      <View className={styles.navPerson}>
        <View className={styles.navPersonItem} onClick={() => Taro.navigateTo({ url: routeNames.mineCollection })}>
          <View className={styles.navCount}>{userInfo.collectionCount}</View>
          <View className={styles.navTitle}>收藏</View>
        </View>
        <View className={styles.navLink} />
        <View className={styles.navPersonItem} onClick={() => Taro.navigateTo({ url: routeNames.mineAttention })}>
          <View className={styles.navCount}>{userInfo.attentionCount}</View>
          <View className={styles.navTitle}>关注</View>
        </View>
        <View className={styles.navLink} />
        <View className={styles.navPersonItem} onClick={() => Taro.navigateTo({ url: routeNames.mineCoupon })}>
          <View className={styles.navCount}>{userInfo.couponCount}</View>
          <View className={styles.navTitle}>优惠券</View>
        </View>
        <View className={styles.navLink} />
        <View className={styles.navPersonItem} onClick={() => Taro.navigateTo({ url: routeNames.mineIntegral })}>
          <View className={styles.navCount}>{userInfo.integral}</View>
          <View className={styles.navTitle}>积分</View>
        </View>
      </View>
    </View>
  )
}

const Nav = memo(Component)
export default Nav
