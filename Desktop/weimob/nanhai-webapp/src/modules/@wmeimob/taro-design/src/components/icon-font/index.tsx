import { View } from '@tarojs/components';
import { PureComponent } from 'react';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import classnames from 'classnames';
import MMIconFontName from './const';
import styles from './index.modules.less';

export interface IMMIconfontProps {
  /**
   * 图标值
   *
   * @type {string}
   * @memberof IIconfontProps
   */
  value?: number | string;
  /**
   * 图标颜色
   *
   * @type {string}
   * @memberof IIconfontProps
   */
  color?: string;
  /**
   * 图标大小
   *
   * @type {number}
   * @memberof IIconfontProps
   */
  size?: number;
}

interface IIconfontState {
  checked: boolean;
}

/**
 * @name 图标
 */
@autobind
export default class MMIconFont extends PureComponent<IMMIconfontProps, IIconfontState> {
  static defaultProps = {
    size: 20
  };

  static options = {
    addGlobalClass: true
  };

  render() {
    const { size, color, value } = this.props;
    const style: any = {};
    if (size !== undefined) {
      style.fontSize = size + 'px';
    }

    if (color !== undefined) {
      style.color = color;
    }

    return <View
      className={classnames(styles.MMIconFont, value && styles[`icon${value}`])}
      style={style} />;
  }
}

