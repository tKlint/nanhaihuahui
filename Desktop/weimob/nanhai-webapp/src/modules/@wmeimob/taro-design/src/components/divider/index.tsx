import { View } from '@tarojs/components';
import { PureComponent } from 'react';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import styles from './index.modules.less';
import classNames from 'classnames';

interface IMMDividerProps {
  /**
   * 分割线大小
   *
   * @type {number}
   * @memberof IMMDividerProps
   */
  size?: number;

  /**
   * 是否是垂直线
   *
   * @type {boolean}
   * @memberof IMMDividerProps
   */
  vertical?: boolean;
}

/**
 * @name 分割线
 */
@autobind
export default class MMDivider extends PureComponent<IMMDividerProps> {
  static options = {
    addGlobalClass: true
  };

  private get className() {
    const classnames = [styles.MMDivider];

    if (this.props.vertical) {
      process.env.TARO_ENV === 'weapp' ? classnames.push(styles.MMDivider__vertical) : classnames.push(styles.MMDivider__vertical_auto)
    }

    return classNames(...classnames);
  }

  private get style() {
    const style: React.CSSProperties = {};
    if (this.props.size !== undefined) {
      if (this.props.vertical) {
        style.height = this.props.size + 'px';
      } else {
        style.width = this.props.size + 'px';
      }
    }
    return style;
  }

  render() {
    return <View style={this.style} className={this.className} />;
  }
}

