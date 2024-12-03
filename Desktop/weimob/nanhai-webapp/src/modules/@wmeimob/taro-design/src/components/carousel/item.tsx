import { View } from '@tarojs/components';

import { Component } from 'react';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import styles from './index.modules.less';

@autobind
export default class MMCarouselItem extends Component {
  static options = {
    addGlobalClass: true,
    styleIsolation: 'apply-shared'
  };

  render() {
    return <View className={styles.item}>
      {this.props.children}
    </View>;
  }
}

