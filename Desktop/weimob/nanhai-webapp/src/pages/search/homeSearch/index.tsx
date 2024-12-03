import Taro, { getCurrentInstance, useRouter } from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Image, Input, ScrollView, Text } from '@tarojs/components'
import { IHomeSearchProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import GoodsItem from '~/components/goodsItem'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import useInput from '~/components/hooks/useInput'
import Stars from '~/components/stars'
import classNames from 'classnames'
import { api } from '~/request'
import { EGlobalDataKey, getGlobalData } from '~/GlobalData'

const Component: FC<IHomeSearchProps> = () => {
  // 检索结果 当前mock店铺数据
  const [searchData, setsearchData] = useState<any>([
    {
      id: 1,
      shopName: '店铺名称',
      shopIcon: `${require('~/images/icinfor_img.png')}`,
      isquality: true,
      grade: 4.3,
      attentionCount: 122,
      hasLive: true,
      live: [
        {
          id: 1,
          isLive: true,
          watchCount: 200,
          liveName: '直播 名称1111'
        }
      ],
      contList: [
        {
          id: 2,
          goodCover: `${require('~/images/icinfor_img.png')}`
        },
        {
          id: 3,
          goodCover: `${require('~/images/icinfor_img.png')}`
        }
      ]
    },
    {
      id: 2,
      shopName: '店铺名称',
      shopIcon: `${require('~/images/icinfor_img.png')}`,
      isquality: true,
      grade: 4.3,
      attentionCount: 122,
      hasLive: false,
      contList: [
        {
          id: 21,
          goodCover: `${require('~/images/icinfor_img.png')}`
        },
        {
          id: 31,
          goodCover: `${require('~/images/icinfor_img.png')}`
        },
        {
          id: 41,
          goodCover: `${require('~/images/icinfor_img.png')}`
        }
      ]
    }
  ])
  const [tabIndex, setTabIndex] = useState<number>(1)
  const [topSearch, setTopSearch] = useState<any>([])
  const [requestData, setRequestData] = useState<any>({ pageNum: 1, pageSize: 10 })
  const [total, setTotal] = useState<number>(0)
  const [searchRecord, setSearchRecord] = useState<any>([])
  const searchValue = useInput()
  const stars = [1, 2, 3, 4, 5]
  const { params = {} } = useRouter()
  // 获取热搜
  const getTopSearch = async () => {
    const { data = [] } = await api['/user/api/popularSearchTerms/_GET']({ setArea: getCurrentInstance().router?.params.type === '1' ? '0' : '1' })
    setTopSearch(data)
  }
  useEffect(() => {
    getTopSearch()

    const common = getGlobalData(EGlobalDataKey.CommonInfo)
    if (common && common.userNo) {
      getSearchRecord()
    }
    //
  }, [])

  // 获取搜索记录
  const getSearchRecord = async () => {
    const { data = [] } = await api['/user/api/userSearchHistory_GET']({})
    setSearchRecord(data)
  }
  const deleteRecord = async () => {
    const { code = 0 } = await api['/user/api/userSearchHistory_DELETE']({})
    getSearchRecord()
  }

  const update = async () => {
    const datas = requestData
    if (datas.pageSize < total) {
      datas.pageSize = datas.pageSize + 10
      setRequestData(datas)
      Taro.showLoading({ title: '', mask: true })
      await ongoods(requestData)
      Taro.hideLoading()
    }
  }
  const ongoods = async (reqData) => {
    console.log(reqData)
    //
  }
  return (
    <View className={styles.homeSearchStyle}>
      <MMNavigation title="搜索" />
      {/* 搜索框 */}
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
        <View className={styles.homeSearchInputRight}>搜索</View>
      </View>
      {/* 搜索结果为空 */}
      {searchData && searchData.length === 0 && (
        <View className={styles.noSearchResult}>
          <Image className={styles.noSearchResultImg} src={require('~/images/noSearch.png')} />
          <View className={styles.hint}>Ops！未搜索到相关内容</View>
        </View>
      )}

      {/* 搜索记录 */}
      {searchData && searchData.length === 0 && searchRecord && searchRecord.length !== 0 && (
        <View className={styles.homeSearchRecord}>
          <View className={styles.homeSearchRecordTitle}>
            <View className={styles.title}>搜索记录</View>
            <View className={styles.clear} onClick={() => deleteRecord()}>
              清空
            </View>
          </View>
          <View className={styles.searchRecord}>
            {searchRecord.map((item) => {
              return (
                <View key={item.id} className={styles.record}>
                  {item.content}
                </View>
              )
            })}
          </View>
        </View>
      )}
      {/* 热搜 */}
      {/* 自营店铺内的搜索无热搜 */}
      {/* 直播进来的搜索显示直播的热搜词 */}
      {topSearch &&
        topSearch.length !== 0 &&
        searchData &&
        searchData.length === 0 &&
        getCurrentInstance().router?.params &&
        getCurrentInstance().router?.params.type !== '2' && (
          <View className={styles.homeTopSearch}>
            <View className={styles.homeTopSearchTitle}>热搜</View>
            <View className={styles.homeTop}>
              {topSearch.map((item) => {
                return (
                  <View key={item.id} className={styles.searchWord}>
                    {item.terms}
                  </View>
                )
              })}
            </View>
          </View>
        )}
      <View className={styles.searchResultTab}>
        <View className={styles.tab} onClick={() => setTabIndex(1)}>
          <View className={styles.tabCurrentTitle}>商品</View>
          {tabIndex === 1 && <View className={styles.tabBottom} />}
        </View>
        {params && params.isShop !== '1' && (
          <View className={styles.tab} onClick={() => setTabIndex(2)}>
            <View className={styles.tabTitle}>店铺</View>
            {tabIndex === 2 && <View className={styles.tabBottom} />}
          </View>
        )}
      </View>
      {/* 商品结果 */}
      {tabIndex === 1 && (
        <View className={styles.searchResultGoods}>
          <ScrollView scrollY className={styles.sview}>
            <View className={styles.goodWrap}>
              <GoodsItem isShowShop={true} />
              <GoodsItem isShowShop={true} />
              <GoodsItem isShowShop={true} />
              <GoodsItem isShowShop={true} />
              <GoodsItem isShowShop={true} />
            </View>
          </ScrollView>
        </View>
      )}
      {/* 店铺结果 */}
      {tabIndex === 2 && (
        <View className={styles.searchResultGoods}>
          <ScrollView scrollY lowerThreshold={150} onScrollToLower={() => update()} className={styles.sview}>
            <View className={styles.goodWrap}>
              {searchData.map((item) => {
                return (
                  <View key={item.id} className={styles.attentionItem}>
                    <View className={styles.attentionShop}>
                      <Image className={styles.attentionShopIcon} src={item.shopIcon} />
                      <View className={styles.attentionShopInfo}>
                        <View className={styles.attentionShopName}>{item.shopName}</View>
                        <View className={styles.attentionShopInformation}>
                          {item.isquality && <Image className={styles.zhibao} src={require('~/images/qualityGuarantee.png')} />}
                          <Stars grade={item.grade} />
                          <View className={styles.attentionCount}>{item.attentionCount}人关注</View>
                        </View>
                      </View>

                      <View className={styles.toShop}>进店</View>
                    </View>
                    {item.hasLive && item.hasLive === true ? (
                      <View className={styles.goodsArr}>
                        {item.live.map((liveItem) => {
                          return (
                            <View
                              key={liveItem.id}
                              className={styles.live}
                              style={{ background: `url(${liveItem.logoPic}) no-repeat`, backgroundSize: '100% 100%' }}
                            >
                              <View className={styles.liveTop}>
                                <View className={styles.liveTitle}>
                                  <Image className={styles.liveImg} src={require('~/images/live.png')} />
                                  直播中
                                </View>
                                <View className={styles.liveCount}>{liveItem.watchCount}人观看</View>
                              </View>
                              <View className={styles.liveName}>{liveItem.liveName}</View>
                            </View>
                          )
                        })}
                        <View className={styles.liveGood}>
                          {item.contList.map((cont, index) => {
                            return <Image key={cont.id} src={cont.goodCover} className={classNames(styles.goodImg, index === 1 ? styles.goodImg1 : '')} />
                          })}
                        </View>
                      </View>
                    ) : (
                      <View className={styles.goodsArr}>
                        {item.contList.map((cont, index) => {
                          return <Image key={cont.id} src={cont.goodCover} className={styles.goodImg} />
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
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const HomeSearch = memo(Component)
export default HomeSearch
