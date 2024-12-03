/* eslint-disable no-nested-ternary */
import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Input, Image, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { IShopListProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import Stars from '~/components/stars'
import classNames from 'classnames'
import { api } from '~/request'
import useInput from '~/components/hooks/useInput'
import { routeNames } from '~/routes'

const Component: FC<IShopListProps> = () => {
  const searchValue = useInput()
  const [total, setTotal] = useState<number>(0)
  const [requestData, setRequestData] = useState<any>({
    pageNum: 1,
    pageSize: 10,
    sort: 'SCORE',
    order: 'ASC',
    searchInfo: ''
  })
  const [shopData, setShopData] = useState<any>([])

  useEffect(() => {
    getShop(requestData)
  }, [])
  const getShop = async (req) => {
    const { data = {} } = (await api['/user/api/store/_GET'](req)) as any
    const { list = [], total: totals } = data
    setShopData(list)
    setTotal(totals)
  }
  function changeList(type) {
    const newRequest = { ...requestData }
    switch (type) {
      case 'SCORE':
        if (newRequest.sort !== 'SCORE') {
          newRequest.sort = 'SCORE'
          newRequest.order = 'ASC'
        }
        if (newRequest.order === 'ASC') {
          newRequest.order = 'DESC'
        } else {
          newRequest.order = 'ASC'
        }
        break
      case 'SALES_COUNT':
        if (newRequest.sort !== 'SALES_COUNT') {
          newRequest.sort = 'SALES_COUNT'
          newRequest.order = 'ASC'
        }
        if (newRequest.order === 'ASC') {
          newRequest.order = 'DESC'
        } else {
          newRequest.order = 'ASC'
        }
        break
      case 'FOCUS_ON':
        if (newRequest.sort !== 'FOCUS_ON') {
          newRequest.sort = 'FOCUS_ON'
          newRequest.order = 'ASC'
        }
        if (newRequest.order === 'ASC') {
          newRequest.order = 'DESC'
        } else {
          newRequest.order = 'ASC'
        }
        break
      case 'MARGIN':
        if (newRequest.sort !== 'MARGIN') {
          newRequest.sort = 'MARGIN'
          newRequest.order = 'ASC'
        }
        if (newRequest.order === 'ASC') {
          newRequest.order = 'DESC'
        } else {
          newRequest.order = 'ASC'
        }
        break
      default:
        break
    }
    Taro.showLoading({ title: '', mask: true })
    setRequestData(newRequest)
    getShop(newRequest)
    Taro.hideLoading()
  }

  function setSearchValue() {
    const data = { ...requestData, searchInfo: searchValue.value }
    setRequestData(data)
    getShop(data)
  }
  const update = async () => {
    const datas = requestData
    if (datas.pageSize < total) {
      datas.pageSize = datas.pageSize + 10
      setRequestData(datas)
      Taro.showLoading({ title: '', mask: true })
      await getShop(requestData)
      Taro.hideLoading()
    }
  }

  return (
    <View className={styles.shopListStyle}>
      <MMNavigation title="店铺" />{' '}
      <View className={styles.homeSearchInput}>
        <View className={styles.homeSearchInputLeft}>
          <Image className={styles.searchIcon} src={require('~/images/home/search.png')} />
          <Input
            value={searchValue.value}
            onInput={searchValue.onInput}
            className={styles.searchInput}
            placeholder="试试你想寻找的内容"
            placeholderStyle="color:#999;line-height:18px"
          />
        </View>
        <View className={styles.homeSearchInputRight} onClick={() => setSearchValue}>
          搜索
        </View>
      </View>
      <View className={styles.searchSort}>
        <View className={styles.sortWrap} onClick={() => changeList('SCORE')}>
          <View className={styles.sortTitle}>评价</View>
          <Image
            className={styles.sortImg}
            src={
              requestData.sort !== 'SCORE'
                ? require('~/images/home/defaultSort.png')
                : requestData.order === 'ASC'
                ? require('~/images/home/lowSort.png')
                : require('~/images/home/highSort.png')
            }
          />
        </View>
        <View className={styles.sortWrap} onClick={() => changeList('SALES_COUNT')}>
          <View className={styles.sortTitle}>销量</View>
          <Image
            className={styles.sortImg}
            src={
              requestData.sort !== 'SALES_COUNT'
                ? require('~/images/home/defaultSort.png')
                : requestData.order === 'ASC'
                ? require('~/images/home/lowSort.png')
                : require('~/images/home/highSort.png')
            }
          />
        </View>
        <View className={styles.sortWrap} onClick={() => changeList('FOCUS_ON')}>
          <View className={styles.sortTitle}>关注</View>
          <Image
            className={styles.sortImg}
            src={
              requestData.sort !== 'FOCUS_ON'
                ? require('~/images/home/defaultSort.png')
                : requestData.order === 'ASC'
                ? require('~/images/home/lowSort.png')
                : require('~/images/home/highSort.png')
            }
          />
        </View>
        <View className={styles.sortWrap} onClick={() => changeList('MARGIN')}>
          <View className={styles.sortTitle}>保证金</View>
          <Image
            className={styles.sortImg}
            src={
              requestData.sort !== 'MARGIN'
                ? require('~/images/home/defaultSort.png')
                : requestData.order === 'ASC'
                ? require('~/images/home/lowSort.png')
                : require('~/images/home/highSort.png')
            }
          />
        </View>
      </View>
      {/* 搜索结果为空 */}
      {shopData && shopData.length === 0 && (
        <View className={styles.noSearchResult}>
          <Image className={styles.noSearchResultImg} src={require('~/images/noSearch.png')} />
          <View className={styles.hint}>Ops！未搜索到相关内容</View>
        </View>
      )}
      {shopData && shopData.length > 0 && (
        <View className={styles.searchResultGoods}>
          <ScrollView scrollY lowerThreshold={150} onScrollToLower={() => update()} className={styles.sview}>
            <View className={styles.goodWrap}>
              {shopData.map((item) => {
                return (
                  <View key={item.id} className={styles.attentionItem}>
                    <View className={styles.attentionShop}>
                      <Image className={styles.attentionShopIcon} src={item.logo} />
                      <View className={styles.attentionShopInfo}>
                        <View className={styles.attentionShopName}>{item.name}</View>
                        <View className={styles.attentionShopInformation}>
                          {item.marginStatus === 1 && <Image className={styles.zhibao} src={require('~/images/qualityGuarantee.png')} />}
                          <Stars grade={item.score} />
                          <View className={styles.attentionCount}>{item.focus}人关注</View>
                        </View>
                      </View>

                      <View
                        className={styles.toShop}
                        onClick={() => Taro.navigateTo({ url: routeNames.shopShopDetail + '?shopId=' + item.id + '&storeNo=' + item.storeNo })}
                      >
                        进店
                      </View>
                    </View>
                    {item.liveRoom && item.liveRoom.length !== 0 ? (
                      <View className={styles.goodsArr}>
                        {item.liveRoom.map((liveItem) => {
                          return (
                            <View
                              key={liveItem.id}
                              className={styles.live}
                              style={{ background: `url(${liveItem.logoPic}) no-repeat`, backgroundSize: '100% 100%' }}
                            >
                              {liveItem.status === 1 && (
                                <View className={styles.liveTop}>
                                  <View className={styles.liveTitle}>
                                    <Image className={styles.liveImg} src={require('~/images/live.png')} />
                                    直播中
                                  </View>
                                  <View className={styles.liveCount}>{liveItem.watchCount}人观看</View>
                                </View>
                              )}
                              <View className={styles.liveName}>{liveItem.roomTitle}</View>
                            </View>
                          )
                        })}
                        <View className={styles.liveGood}>
                          {item.goodsList.map((cont, index) => {
                            return (
                              index <= 1 && (
                                <Image key={cont.id} src={cont.coverImgUrl} className={classNames(styles.goodImg, index === 1 ? styles.goodImg1 : '')} />
                              )
                            )
                          })}
                        </View>
                      </View>
                    ) : (
                      <View className={styles.goodsArr}>
                        {item.goodsList.map((cont, index) => {
                          return index <= 2 && <Image key={cont.id} src={cont.coverImgUrl} className={styles.goodImg} />
                        })}
                      </View>
                    )}
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const ShopList = memo(Component)
export default ShopList
