import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import styles from './index.module.less';
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation';
import MMButton from '~/modules/@wmeimob/taro-design/src/components/button';
import { useTextGlobal } from '../globalHook/useModel';

export default () => {
  const [text, setText] = useTextGlobal();

  return (
    <View className={styles.page}>
      <MMNavigation title={text} />
      <MMButton text="变更" onClick={() => setText("测试2")} />
    </View>
  )
}

