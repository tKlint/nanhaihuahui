/* eslint-disable no-nested-ternary */
import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { IMyEvaluationProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import Tabber from '~/components/tabber'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import DefaultPage from '~/components/defaultPage'
import Stars from '~/components/stars'

const Component: FC<IMyEvaluationProps> = () => {
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [evaluation, setEvaluation] = useState<any>([
    {
      id: 1,
      goodImg: `${require('~/images/goodImg.png')}`,
      goodsName: '商品名称',
      spec: '颜色：灰色',
      grade: 4.3,
      evaluationTxt: '我写的评价，我写的评价，我写的评价。我写的评。我写的评价。我写的评价，我写的评价我写的评价我写的评价我写的评价，我写的评价我写的评价。',
      evaluationImgs: [`${require('~/images/goodImg.png')}`, `${require('~/images/goodImg.png')}`, `${require('~/images/goodImg.png')}`],
      evaluateTime: '2020-12-12 10:00:06'
    },
    {
      id: 2,
      goodImg: `${require('~/images/goodImg.png')}`,
      goodsName: '商品名称',
      spec: '颜色：灰色',
      grade: 4.7,
      evaluationTxt: '我写的评价，我写的评价，我写的评价。我写的评。我写的评价。我写的评价，我写的评价我写的评价我写的评价我写的评价，我写的评价我写的评价。',
      evaluationImgs: [`${require('~/images/goodImg.png')}`, `${require('~/images/goodImg.png')}`, `${require('~/images/goodImg.png')}`],
      evaluateTime: '2020-12-12 10:00:06'
    },
    {
      id: 3,
      goodImg: `${require('~/images/goodImg.png')}`,
      goodsName: '商品名称',
      spec: '颜色：灰色',
      grade: 5,
      evaluationTxt: '我写的评价，我写的评价，我写的评价。我写的评。我写的评价。我写的评价，我写的评价我写的评价我写的评价我写的评价，我写的评价我写的评价。',
      evaluationImgs: [`${require('~/images/goodImg.png')}`, `${require('~/images/goodImg.png')}`, `${require('~/images/goodImg.png')}`],
      evaluateTime: '2020-12-12 10:00:06'
    },
    {
      id: 4,
      goodImg: `${require('~/images/goodImg.png')}`,
      goodsName: '商品名称',
      spec: '颜色：灰色',
      grade: 4,
      evaluationTxt: '我写的评价，我写的评价，我写的评价。我写的评。我写的评价。我写的评价，我写的评价我写的评价我写的评价我写的评价，我写的评价我写的评价。',
      evaluationImgs: [`${require('~/images/goodImg.png')}`, `${require('~/images/goodImg.png')}`, `${require('~/images/goodImg.png')}`],
      evaluateTime: '2020-12-12 10:00:06'
    }
  ])
  const [shopEva, setShopEva] = useState<any>([
    {
      id: 1,
      shopName: '店铺名称',
      shopImg: `${require('~/images/goodImg.png')}`,
      attentionCount: 123,
      saleGrade: 4,
      serviceGrade: 4.7,
      qualityGrade: 5,
      isSafeguard: false
    },
    {
      id: 2,
      shopName: '店铺名称',
      shopImg: `${require('~/images/goodImg.png')}`,
      attentionCount: 123,
      saleGrade: 4,
      serviceGrade: 4.7,
      qualityGrade: 5,
      isSafeguard: false
    },
    {
      id: 3,
      shopName: '店铺名称',
      shopImg: `${require('~/images/goodImg.png')}`,
      attentionCount: 123,
      saleGrade: 4,
      serviceGrade: 4.7,
      qualityGrade: 5,
      isSafeguard: false
    },
    {
      id: 4,
      shopName: '店铺名称',
      shopImg: `${require('~/images/goodImg.png')}`,
      attentionCount: 123,
      saleGrade: 4,
      serviceGrade: 4.7,
      qualityGrade: 5,
      isSafeguard: false
    }
  ])
  const tabArr = [
    {
      id: 0,
      title: '商品评价'
    },
    {
      id: 1,
      title: '店铺评价'
    }
  ]

  return (
    <View className={styles.myEvaluationStyle}>
      <MMNavigation title="我的评价" />
      <Tabber tabIndex={tabIndex} setTabIndex={setTabIndex} tabArr={tabArr} />

      {tabIndex === 0 && evaluation && evaluation.length && (
        <View className={styles.myEvaluation}>
          <ScrollView scrollY className={styles.sview}>
            {evaluation.map((dataitem) => {
              return (
                <View key={dataitem.id} className={styles.evaluation}>
                  <View className={styles.evaluationTop}>
                    <Image className={styles.evaluationGoodImg} src={dataitem.goodImg} />
                    <View className={styles.evaluationGood}>
                      <View className={styles.evaluationGoodName}>{dataitem.goodsName}</View>
                      <View className={styles.evaluationGoodSku}>{dataitem.spec}</View>
                    </View>
                  </View>
                  <View className={styles.evaluationGeneral}>
                    <View className={styles.evaluationGeneralTitle}>整体评价：</View>
                    <Stars grade={dataitem.grade} />
                  </View>
                  <View className={styles.evaluationTxt}>{dataitem.evaluationTxt}</View>
                  <View className={styles.evaluationImgs}>
                    {dataitem.evaluationImgs.map((img, index) => {
                      return <Image key={index} className={styles.evaluationImg} src={img} />
                    })}
                  </View>
                  <View className={styles.evaluationHandle}>
                    <View className={styles.evaluationTime}>{dataitem.evaluateTime}</View>
                    <Image className={styles.evaluationDel} src={require('~/images/delete.png')} />
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      )}
      {/* 店铺评价 */}
      {tabIndex === 1 && shopEva && shopEva.length && (
        <View className={styles.myEvaluation}>
          <ScrollView scrollY className={styles.sview}>
            {shopEva.map((dataitem) => {
              return (
                <View key={dataitem} className={styles.evaluationShop}>
                  <View className={styles.evaluationShopTop}>
                    <Image className={styles.evaluationShopImg} src={dataitem.shopImg} />
                    <View className={styles.evaluationShopInfo}>
                      <View className={styles.evaluationShopName}>
                        {dataitem.shopName}
                        {dataitem.isSafeguard && <Image className={styles.zhibao} src={require('~/images/qualityGuarantee.png')} />}
                      </View>
                      <View className={styles.evaluationShopAttention}>{dataitem.attentionCount}人关注</View>
                    </View>
                    <Image className={styles.evaluationShopDel} src={require('~/images/delete.png')} />
                  </View>

                  <View className={styles.evaluationShopItem}>
                    <View className={styles.evaluationShopLabel}>品质相符</View>
                    <Stars grade={dataitem.qualityGrade} />
                  </View>
                  <View className={styles.evaluationShopItem}>
                    <View className={styles.evaluationShopLabel}>服务态度</View>
                    <Stars grade={dataitem.serviceGrade} />
                  </View>
                  <View className={styles.evaluationShopItem}>
                    <View className={styles.evaluationShopLabel}>售后服务</View>
                    <Stars grade={dataitem.saleGrade} />
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      )}

      {evaluation && !evaluation.length && shopEva && !shopEva.length && (
        <DefaultPage defaultHint="暂无评价" imgSrc={require('~/images/noEva.png')} imgTop="100px" />
      )}
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const MyEvaluation = memo(Component)
export default MyEvaluation
