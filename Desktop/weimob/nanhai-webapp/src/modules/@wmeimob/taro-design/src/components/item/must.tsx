import { PureComponent } from 'react'
import { Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import { IMMIconfontProps } from '../icon-font';
import styles from './must.modules.less';

@autobind
export default class MMItemMust extends PureComponent<Partial<IMMIconfontProps>> {
  static options = {
    addGlobalClass: true
  };

  static defaultProps = {
  };

  state = {
  }

  render() {
    return <Text className={styles.must}>*</Text>;
  }
}
