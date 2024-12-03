import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, Input, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { IGoodListProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import GoodsItem from '~/components/goodsItem'
import classNames from 'classnames'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import { MMModalJustifyContent, MMModalAnimationType } from '~/modules/@wmeimob/taro-design/src/components/modal/const'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'

const Component: FC<IGoodListProps> = () => {
  const [visible, setVisible] = useState<boolean>(false)
  function onClose() {}
  return (
    <View className={styles.goodListStyle}>
      <MMNavigation title="商品列表" />
      <View className={styles.goodListTop}>
        <View className={styles.goodListSearch}>
          <Input className={styles.searchInput} placeholder="试试你想寻找的内容" placeholderStyle="color:#999;line-height:18px" />
          <Image className={styles.searchIcon} src={require('~/images/home/search.png')} />
        </View>
      </View>
      <View className={styles.searchSort}>
        <View className={styles.sortWrap}>
          <View className={styles.sortTitle}>综合</View>
          <Image className={styles.sortImg} src={require('~/images/home/defaultSort.png')} />
        </View>
        <View className={styles.sortWrap}>
          <View className={styles.sortTitle}>销量</View>
          <Image className={styles.sortImg} src={require('~/images/home/lowSort.png')} />
        </View>
        <View className={styles.sortWrap}>
          <View className={styles.sortTitle}>价格</View>
          <Image className={styles.sortImg} src={require('~/images/home/highSort.png')} />
        </View>
        <View className={styles.sortWrap}>
          <View className={styles.sortTitle}>筛选</View>
          <Image className={styles.sortImg} src={require('~/images/shop/screen.png')} />
        </View>
      </View>
      <View className={styles.shopWrap}>
        <ScrollView scrollY className={styles.sview}>
          <View className={styles.recommend} style={{ background: '#F6F8FA' }}>
            <View className={styles.recommendGood}>
              <GoodsItem isShowShop={true} />
              <GoodsItem isShowShop={true} />
              <GoodsItem isShowShop={true} />
              <GoodsItem isShowShop={true} />
              <GoodsItem isShowShop={true} />
              <GoodsItem isShowShop={true} />
              <GoodsItem isShowShop={true} />
            </View>
          </View>
        </ScrollView>
      </View>
      <MMModal
        visible={visible}
        justifyContent={MMModalJustifyContent.flexEnd}
        animationType={MMModalAnimationType.down}
        className={isNewIphone ? styles.shopCartPopup : styles.shopCartPopup1}
        onClose={onClose}
      >
        <View className={classNames(styles.wrap, isNewIphone ? styles.popWrap : styles.popWrap1)}>
          <View className={styles.warpTitle}>筛选</View>
          <View className={styles.wrapCont}>
            <View className={styles.group}>
              <View className={styles.groupTitle}>店铺</View>
              <View className={styles.groupWrap}>
                <View className={styles.groupItem}>店铺名称</View>
                <View className={styles.groupItem}>店铺名称</View>
                <View className={classNames(styles.groupItem, styles.groupItemAct)}>店铺名称</View>
                <View className={styles.groupItem}>店铺名称</View>
                <View className={styles.groupItem}>店铺名称</View>
              </View>
            </View>
            <View className={styles.group}>
              <View className={styles.groupTitle}>价格区间（元）</View>
              <View className={styles.groupWrap}>
                <Input className={styles.groupInput} value="" placeholder="  " />
                <View className={styles.groupHint}>到</View>
                <Input className={styles.groupInput} value="" placeholder="  " />
              </View>
            </View>
            <View className={styles.group}>
              <View className={styles.groupTitle}>一级分类</View>
              <View className={styles.groupWrap}>
                <View className={styles.groupItem}>分类名称</View>
                <View className={styles.groupItem}>分类名称</View>
                <View className={classNames(styles.groupItem, styles.groupItemAct)}>分类名称</View>
                <View className={styles.groupItem}>分类名称</View>
                <View className={styles.groupItem}>分类名称</View>
              </View>
            </View>
          </View>
          <View className={styles.wrapHandle}>
            <View className={styles.handleReset}>重置</View>
            <View className={classNames(styles.handleReset, styles.handleSure)}>确定</View>
          </View>
          {isNewIphone && <View className="spacingIphone" />}
        </View>
      </MMModal>
    </View>
  )
}

const GoodList = memo(Component)
export default GoodList
