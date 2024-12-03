import Taro, { useDidShow } from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { IShopCartProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import MMStepper from '~/modules/@wmeimob/taro-design/src/components/stepper'
import classNames from 'classnames'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import { MMModalAnimationType, MMModalJustifyContent } from '~/modules/@wmeimob/taro-design/src/components/modal/const'
import MMTabBar from '~/components/tab-bar'
import global from '~/globalStore'
import { Goods, GoodsSkuDetailList, UserShopCartVO } from '~/request/data-contracts'
import { api } from '~/request'
import DefaultPage from '~/components/defaultPage'
const Component: FC<IShopCartProps> = () => {
  const [couponFlag, setCouponFlag] = useState<boolean>(false)
  const [isLogin, setLogin] = useState<boolean>(false)
  const [cartList, setCartList] = useState<UserShopCartVO[]>([])
  const [isEdit, setEdit] = useState<boolean>(false)
  const [requestData, setRequestData] = useState<any>({ pageNum: 1, pageSize: 10 })
  const [total, setTotal] = useState<number>(0)
  const [isAll, setIsAll] = useState<boolean>(false)
  const [chooseMap, setChooseMap] = useState<any>([])

  useDidShow(() => {
    const common = Taro.getStorageSync('commonInfo')
    if (common.userNo) {
      setLogin(true)
      getData(requestData)
    } else {
      setLogin(false)
    }
    console.log(common, 'common')
  })
  async function getData(req) {
    const { data = {} } = await api['/user/api/shoppingCart/getShoppingCatList_GET'](req)
    // console.log(data)
    // const newList = data.list! || []
    // newList.forEach((item) => {
    //   item.goodsSkuDetailList?.forEach((goods) => {
    //     goods.checked = false
    //   })
    // })
    // console.log(newList)
    setCartList(data.list!)
  }
  const updateData = async () => {
    const datas = requestData
    if (datas.pageSize < total) {
      datas.pageSize = datas.pageSize + 10
      setRequestData(datas)
      Taro.showLoading({ title: '', mask: true })
      await getData(requestData)
      Taro.hideLoading()
    }
  }
  function onClose() {}

  function login() {
    global.toLogin(true)
  }

  function checkAll() {
    // const newList = cartList
    // newList.forEach((item) => {
    //   item.goodsSkuDetailList?.forEach((goods) => {
    //     goods.checked = isAll !== true
    //   })
    // })
    // console.log(newList, '-----')
    // setCartList(newList)
    if (isAll === true) {
      setChooseMap([])
    } else {
      const chooseArr = []
      cartList.forEach((item) => {
        item.goodsSkuDetailList?.forEach((goods) => {
          chooseArr.push(goods.goodsNo + '-' + goods.skuNo)
        })
      })
      setChooseMap(chooseArr)
    }

    setIsAll(!isAll)
  }
  return (
    <View className={styles.shopCartStyle}>
      <MMNavigation title="购物车" />
      {isLogin === true && cartList && cartList.length > 0 && (
        <View className={styles.shopCartManage} onClick={() => setEdit(!isEdit)}>
          {isEdit === false ? '管理' : '完成'}
        </View>
      )}
      {isLogin === true && cartList && cartList.length > 0 && (
        <View className={styles.shopCart}>
          <ScrollView scrollY className={styles.sview} lowerThreshold={150} onScrollToLower={() => updateData()}>
            {cartList.map((item) => {
              return (
                <View key={item.id} className={styles.shop}>
                  <View className={styles.shopInfo}>
                    <Image className={styles.shopIcon} src={item.storeLogo!} />
                    <Text className={styles.shopName}>{item.name}</Text>
                    <View className={styles.getCoupon} onClick={() => setCouponFlag(true)}>
                      领券
                    </View>
                  </View>
                  {item.goodsSkuDetailList &&
                    item.goodsSkuDetailList.length > 0 &&
                    item.goodsSkuDetailList.map((good) => {
                      return (
                        <View key={good.id} className={styles.goodInfo}>
                          <Image
                            className={styles.select}
                            src={
                              chooseMap.includes(good.goodsNo + '-' + good.skuNo)
                                ? require('~/images/orders/reasonSelected.png')
                                : require('~/images/orders/reasonSelect.png')
                            }
                          />
                          <Image className={styles.goodImg} src={good.skuImgURL!} />
                          <View className={styles.good}>
                            <View className={styles.goodName}>{good.goodsName}</View>
                            <View className={styles.goodSpec}>{good.skuName}</View>
                            <View className={styles.goodPc}>
                              <Text className={styles.goodPrice}>¥{good.minimumPrice}</Text>
                              {isEdit === false ? 'x' + good.quantity : <MMStepper min={1} max={1000} step={1} />}
                            </View>
                          </View>
                        </View>
                      )
                    })}
                </View>
              )
            })}

            {/*

            <View className={styles.shop}>
              <View className={styles.shopInfo}>
                <Image className={styles.shopIcon} src={require('~/images/goodImg.png')} />
                <Text className={styles.shopName}>店铺名称</Text>
              </View>
              <View className={styles.goodInfo}>
                <View className={styles.loseGood}>失效</View>
                <Image className={styles.goodImg} src={require('~/images/goodImg.png')} />
                <View className={styles.good}>
                  <View className={classNames(styles.goodName, styles.goodNameLose)}>商品名称商品名称商品名称商品名称商品名称...</View>
                  <View className={styles.goodSpec}>颜色：灰色 尺码：L</View>
                  <View className={styles.goodPc}>
                    <Text className={classNames(styles.goodPrice, styles.goodPriceLose)}>¥100</Text>
                    <Text className={styles.loseHint}>移除失效商品</Text>
                  </View>
                </View>
              </View>
            </View> */}
          </ScrollView>
        </View>
      )}
      {isLogin === true &&
        cartList &&
        cartList.length > 0 &&
        (isEdit === false ? (
          <View className={styles.shopCartHandle}>
            <Image
              onClick={() => checkAll()}
              className={styles.checkAll}
              src={isAll === false ? require('~/images/orders/reasonSelect.png') : require('~/images/orders/reasonSelected.png')}
            />
            <Text className={styles.checkAllTitle}>全选</Text>
            <Text className={styles.total}>合计：</Text>
            <Text className={styles.totalAmount}>￥12999.00</Text>
            <View className={styles.settle}>
              结算{isLogin}
              {isEdit}
            </View>
          </View>
        ) : (
          <View className={styles.shopCartHandle}>
            <Image
              onClick={() => checkAll()}
              className={styles.checkAll}
              src={isAll === false ? require('~/images/orders/reasonSelect.png') : require('~/images/orders/reasonSelected.png')}
            />
            <Text className={styles.checkAllTitle}>全选</Text>
            <View className={classNames(styles.settle, styles.addCollection)}>加入收藏</View>
            <View className={classNames(styles.settle, styles.delBtn)}>删除</View>
          </View>
        ))}

      {!isLogin && (
        <View className={styles.noLogin}>
          <Image className={styles.noLoginImg} src={require('~/images/noLogin.png')} />
          <View className={styles.noLoginHint} onClick={() => login()}>
            您还未登录，请先登录
          </View>
        </View>
      )}
      {isLogin === true && cartList && !cartList.length && <DefaultPage defaultHint="暂无商品" imgSrc={require('~/images/noGood.png')} />}
      <MMTabBar path="/pages/shopCart/index" />
      {isNewIphone && <View className="spacingIphone" />}

      <MMModal visible={couponFlag} justifyContent={MMModalJustifyContent.flexEnd} animationType={MMModalAnimationType.down} onClose={onClose}>
        <View className={styles.checkListWrap}>
          <View className={styles.checkListTitle}>
            <View className={styles.checkTitle}>选择优惠券</View>
            <Image className={styles.checkClose} onClick={() => setCouponFlag(false)} src={require('~/images/close.png')} />
          </View>
          <ScrollView enableFlex scrollY style={{ maxHeight: '450px' }}>
            <View className={styles.couponItem} style={{ background: `url(${require('~/images/couponBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}>
              <View className={styles.couponType}>
                <View className={styles.couponPrice}>¥10</View>
                <View className={styles.couponTypeName}>满减券</View>
              </View>
              <View className={styles.couponInfo}>
                <View className={styles.couponName}>优惠券名称</View>
                <View className={styles.couponTime}>2021.01.21 ~2021.05.21</View>
              </View>
              <View className={styles.draw}>领取</View>
            </View>
            <View className={styles.couponItem} style={{ background: `url(${require('~/images/couponBg.png')}) no-repeat`, backgroundSize: '100% 100%' }}>
              <View className={styles.couponType}>
                <View className={styles.couponPrice}>¥10</View>
                <View className={styles.couponTypeName}>满减券</View>
              </View>
              <View className={styles.couponInfo}>
                <View className={styles.couponName}>优惠券名称</View>
                <View className={styles.couponTime}>2021.01.21 ~2021.05.21</View>
              </View>
              <View className={styles.drawed}>已领取</View>
            </View>
          </ScrollView>
          {isNewIphone && <View className="spacingIphone" />}
        </View>
      </MMModal>
    </View>
  )
}

const ShopCart = memo(Component)
export default ShopCart
