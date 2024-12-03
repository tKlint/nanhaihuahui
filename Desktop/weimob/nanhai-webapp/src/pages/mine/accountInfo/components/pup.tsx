import { View } from '@tarojs/components'
import Taro, { useEffect } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import * as styles from './pup.module.less'
// import { api } from '~/request'
import { upload } from '~/components/aliyun'
const Pup = (props) => {
  // 上传照片
  const onimg = async (type) => {
    const { tempFilePaths } = await Taro.chooseImage({ count: 1, sourceType: type === 1 ? ['camera'] : ['album'] })
    Taro.showLoading({ title: '', mask: true })
    const resData = await upload(tempFilePaths)
    // const saveInfo = async () => {
    //   const putData = { headImg: resData[0] as any }
    //   const newData = await api.memberMember['/member/web/my/baseInfo_PUT'](putData)
    //   if (newData.code === 0) {
    //     props.setHeadImg(putData)
    //     onuser()
    //   }
    //   Taro.hideLoading()
    // }
    // saveInfo()
  }
  const onuser = () => {
    props.onpup(false)
  }
  return (
    <View className={styles.Pup}>
      <View className={styles.box}>
        <View className={styles.li} style={{ borderBottom: '1px solid #F8F8F8' }} onClick={(event) => onimg(1)}>
          拍照
        </View>
        <View className={styles.li} onClick={(event) => onimg(2)}>
          从相册中选择
        </View>
        <View style={{ background: '#F6F6F6', height: '8px' }} />
        <View onClick={onuser} className={styles.li}>
          取消
        </View>
      </View>
    </View>
  )
}
export default observer(Pup)
