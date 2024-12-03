import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import styles from './index.module.less';
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation';
import MMButton from '~/modules/@wmeimob/taro-design/src/components/button';

export default () => {
  return <View className={styles.page}>
    <MMNavigation title="测试" />
    <MMButton text="跳转" onClick={() => Taro.navigateTo({
      url: "/pages/template/globalHookChange/index"
    })} />
  </View>
}