import { View } from '@tarojs/components'
import { PureComponent } from 'react'
import Taro from '@tarojs/taro'
import { autobind } from '~/modules/@wmeimob/decorator/src/components'
import styles from './index.module.less'
import IconFontName from '../icon-font/const'
import themesStyles from '../styles/themes/default.modules.less'
import { MMStarsSize } from './const'
import MMIconFont from '../icon-font'

interface IStarsProps {
  /**
   * 当前星级数量
   *
   * @type {number}
   * @memberof IStarsProps
   */
  value?: number

  /**
   * 尺寸大小
   *
   * @type {MMStarsSize}
   * @memberof IStarsProps
   */
  size?: MMStarsSize

  /**
   * 星级总数量
   *
   * @type {number}
   * @memberof IStarsProps
   */
  count?: number

  /**
   * 改变事件
   *
   * @memberof IStarsProps
   */
  onChange?: (value: number) => void

  /**
   * 字体图标名称
   *
   * @type {IconFontName}
   * @memberof IStarsProps
   */
  iconfontName?: IconFontName
}

/**
 * @name 星级
 */
@autobind
export default class MMStars extends PureComponent<IStarsProps> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    iconfontName: IconFontName.Collect,
    size: MMStarsSize.Default,
    count: 5
  }

  get size() {
    switch (this.props.size) {
      case MMStarsSize.Big:
        return 15
      default:
        return 10
    }
  }

  get style() {
    switch (this.props.size) {
      case MMStarsSize.Big:
        return {
          marginRight: parseInt(themesStyles.spacingSize.replace('px', ''), 10) * 2 + 'px'
        }
      default:
        return {
          marginRight: themesStyles.spacingSize
        }
    }
  }

  get width() {
    const { count, value } = this.props
    if (value) {
      const nu = (value / (count as number)) * 100
      return {
        width: nu + '%'
      }
    }
    return {}
  }

  render() {
    const countArray = new Array(this.props.count).fill(1)
    const { onChange, iconfontName, value } = this.props
    return (
      <View className={styles.MMStarsStyles}>
        <View className={styles.box} style={this.width}>
          {countArray.map((val, index) => (
            <View className={styles.item} style={this.style} key={val + index} onClick={() => onChange && onChange(index + 1)}>
              <MMIconFont size={this.size} color={themesStyles.gray4} value={iconfontName as IconFontName} />
            </View>
          ))}
        </View>
        {value !== 0 && (
          <View className={styles.content} style={this.width}>
            {countArray.map((val, index) => (
              <View className={styles.item} style={this.style} key={val + index} onClick={() => onChange && onChange(index + 1)}>
                <MMIconFont size={this.size} color={themesStyles.yellow} value={iconfontName as IconFontName} />
              </View>
            ))}
          </View>
        )}
      </View>
    )
  }
}
