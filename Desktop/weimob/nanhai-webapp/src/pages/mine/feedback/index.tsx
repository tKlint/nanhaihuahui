import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Textarea, Input } from '@tarojs/components'
import styles from './index.module.less'
import { IFeedbackProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import MMImagePicker from '~/modules/@wmeimob/taro-design/src/components/image-picker'
import BottomButton from '~/components/bottomButton'
import useInput from '~/components/hooks/useInput'
import { upload } from '~/components/aliyun'
import { api } from '~/request'

const Component: FC<IFeedbackProps> = () => {
  const [imagevalue, setimagevalue] = useState<string[]>();
  const feedBackContent = useInput();
  const contactMobile = useInput();

  function ImageonChange(value: string[]) {
    setimagevalue(value);
  }

  async function submit() {
    const feedbackMsg = feedBackContent.value;
    const phone = contactMobile.value;
    if (!feedbackMsg) {
      return Taro.showToast({ title: "请输入反馈内容", icon: "none"});
    }

    if (!phone || !(/0?(13|14|15|17|18|19)[0-9]{9}/.test(phone))) {
      return Taro.showToast({ title: "请输入正确的手机号", icon: "none"});
    }
    
    const { code } = await api["/user/api/setting/addComplaintsSuggestions_POST"]({
      phone,
      feedbackContent: feedbackMsg,
      image: imagevalue ? imagevalue.join(",") : ""
    });

    if (code !== 0) {
      return Taro.showToast({ title: "提交失败", icon: "none" });
    }
    Taro.showToast({ title: "提交成功", icon: "success" });

    setimagevalue([]);
    feedBackContent.setValue("");
    contactMobile.setValue("");
  }
  return (
    <View className={styles.feedbackStyle}>
      <MMNavigation title="意见反馈" />
      <View className={styles.feedbackWrap}>
        <View className={styles.feedbackText}>
          <View className={styles.feedbackLable}>意见与反馈</View>
          <Textarea
            maxlength={100}
            style={{
              width: '100%',
              fontSize: '14px',
              outline: 'none'
            }}
            placeholder="请描述您遇到的问题或者对我们的建议，感谢您的支持（100字）"
            placeholderStyle="color:#ABABAB"
            className={styles.feedbackCont}
            autoHeight
            value={feedBackContent.value}
            onInput={feedBackContent.onInput}
          />
        </View>
        <View className={styles.feedbackImg}>
          <View className={styles.feedbackLable}>图片</View>
          <MMImagePicker value={imagevalue} count={3} onChange={(value) => ImageonChange(value)} />
        </View>
        <View className={styles.feedbackConcat}>
          <View className={styles.feedbackLable}>联系方式</View>
          <Input 
            className={styles.feedbackConcatInput} 
            value={contactMobile.value} 
            placeholder="留下您的联系方式，更快的解决您的问题哦～ " 
            placeholderStyle=" line-height:44px"
            onInput={contactMobile.onInput}
          />
        </View>
      </View>
      <BottomButton title="提交" onClick={() => submit()} contentStyle={{ background: '#fff' }} />
    </View>
  )
}

const Feedback = memo(Component)
export default Feedback
