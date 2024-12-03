import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { Input, View, Image } from '@tarojs/components'
import styles from './index.module.less'
import { IGoodsClassifyProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import MMMenu from '~/components/menu'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import MMTabBar from '~/components/tab-bar'
import { api } from '~/request'
import { GoodsClassify as GoodsClassify1 } from '~/request/data-contracts'

const Component: FC<IGoodsClassifyProps> = () => {
  const [classifyData, setClassifyData] = useState<GoodsClassify1>()
  useEffect(() => {
    const getClassify = async () => {
      const { data = [] } = (await api['/user/api/goodsClassify_GET']({})) as any
      setClassifyData(data)
    }
    getClassify()
  }, [])

  function onChange() {}

  function getStaticClassifyRight() {}
  function onMore() {}
  return (
    <View className={styles.goodsClassifyStyle}>
      <MMNavigation title="分类" />
      <View className={styles.goodsClassifyTop}>
        <View className={styles.goodsClassifySearch}>
          <Input className={styles.searchInput} placeholder="波斯猫" placeholderStyle="color:#666;line-height:18px" />
          <Image className={styles.searchIcon} src={require('~/images/home/search.png')} />
        </View>
        <View className={styles.goodsClassifySearchAll} onClick={() => Taro.navigateTo({ url: '/pages/search/goodList/index' })}>
          <Image className={styles.allGoodIcon} src={require('~/images/allGoodIcon.png')} />
          全部商品
        </View>
      </View>

      <View className={styles.wrap}>
        <MMMenu onChange={onChange} changeLeft={getStaticClassifyRight} onMore={onMore} data={classifyData as any} />
      </View>
      <MMTabBar path="/pages/goodsClassify/index" />
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const GoodsClassify = memo(Component)
export default GoodsClassify
