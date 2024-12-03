import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, Text, Textarea } from '@tarojs/components'
import { IEvaluateProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import MMStars from '~/modules/@wmeimob/taro-design/src/components/stars'
import IconFontName from '~/modules/@wmeimob/taro-design/src/components/icon-font/name'
import { MMStarsSize } from '~/modules/@wmeimob/taro-design/src/components/stars/const'
import MMImagePicker from '~/modules/@wmeimob/taro-design/src/components/image-picker'
import BottomButton from '~/components/bottomButton'
import useInput from '~/components/hooks/useInput'

const Component: FC<IEvaluateProps> = () => {
  const [values, setvalues] = useState<number>(0)
  const [anonymityIs, setanonymityIs] = useState<boolean>(false)
  const evaluateHook = useInput()
  const imglist = []
  function onChange(value) {
    setvalues(value)
  }
  function ImageonChange(value) {}

  return (
    <View className={styles.evaluateStyle}>
      <MMNavigation title="评价" />
      <View className={styles.evaluate}>
        <View className={styles.evaluateWrap}>
          <View className={styles.evaluateGood}>
            <Image className={styles.evaluateGoodImg} src={require('~/images/icinfor_img.png')} />
            <View className={styles.evaluateGoodName}>商品名称商品名称商品名称商品名称商品名称...</View>
          </View>
          <View className={styles.evaluateOverAll}>
            <View className={styles.evaluateTitle}>整体评价:</View>
            <MMStars value={values} iconfontName={IconFontName.Rating} size={MMStarsSize.Big} onChange={(value) => onChange(value)} />
          </View>
          <Textarea
            placeholder="您可以从多个角度对宝贝进行评价"
            placeholderStyle="color:#999"
            className={styles.evaluateTextArea}
            value={evaluateHook.value}
            onInput={evaluateHook.onInput}
          />
          <MMImagePicker isShowCount={false} txt="上传图片" value={imglist} count={6} onChange={(value) => ImageonChange(value)} />
          <View className={styles.anonymity}>
            <Image
              className={styles.anonymityImg}
              onClick={() => (anonymityIs === false ? setanonymityIs(true) : setanonymityIs(false))}
              src={anonymityIs === false ? require('~/images/site/select.png') : require('~/images/site/selected.png')}
            />
            <View className={styles.anonymityTitle}>匿名评价</View>
          </View>
        </View>
      </View>
      <BottomButton
        title=" 提交"
        onClick={() => Taro.navigateTo({ url: '/pages/order/evaluateSuccess/index' })}
        contentStyle={{ background: '#fff', marginTop: '41px' }}
      />
    </View>
  )
}

const Evaluate = memo(Component)
export default Evaluate
