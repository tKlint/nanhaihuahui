import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Textarea, Image, Input } from '@tarojs/components'
import styles from './index.module.less'
import { IAppealProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import classNames from 'classnames'
import BottomButton from '~/components/bottomButton'
import MMImagePicker from '~/modules/@wmeimob/taro-design/src/components/image-picker'
import useInput from '~/components/hooks/useInput'

const Component: FC<IAppealProps> = () => {
  const [imagevalue, setimagevalue] = useState<any>([`${require('~/images/goodImg.png')}`])
  const suggestHook = useInput()
  const contactHook = useInput()
  function ImageonChange(value) {}
  function submit() {
    Taro.showToast({
      title: '提交申诉成功',
      icon: 'none'
    })
    Taro.navigateBack()
  }
  return (
    <View className={styles.appealStyle}>
      <MMNavigation title="申诉" />
      <View className={styles.appeal}>
        <View className={styles.appealWrap}>
          <View className={styles.orderNo}>订单编号：2122215030005927</View>
          <View className={styles.appealTitle}>问题与意见</View>
          <Textarea
            style={{
              fontSize: '14px',
              // outline: 'none',
              width: '100%',
              height: '90px',
              background: '#EEEEEE',
              boxSizing: 'border-box',
              borderRadius: '5px',
              padding: '15px',
              marginBottom: '25px'
            }}
            value={suggestHook.value}
            onInput={suggestHook.onInput}
            maxlength={100}
            placeholder=" 请描述您遇到的问题或者对我们的建议，感谢您的
              支持（100字）"
            placeholderStyle="color:#999"
          />
          {/* 图片不必填 */}
          <View className={styles.appealTitle}>图片</View>
          <MMImagePicker value={imagevalue} count={3} txt="上传图片" isShowCount={false} onChange={(value) => ImageonChange(value)} />
          <View className={styles.appealTitle} style={{ marginTop: '25px' }}>
            联系方式
          </View>
          <Input
            className={styles.appealInput}
            value={contactHook.value}
            onInput={contactHook.onInput}
            placeholder="留下您的联系方式，更快的解决您的问题哦～ "
            // placeholderStyle="color:#999999;line-height:20px,"
          />
        </View>
        <View className={styles.appealConcat}>客服电话：400-2588-8888</View>
      </View>
      <BottomButton title=" 提交" onClick={submit} />
    </View>
  )
}

const Appeal = memo(Component)
export default Appeal
