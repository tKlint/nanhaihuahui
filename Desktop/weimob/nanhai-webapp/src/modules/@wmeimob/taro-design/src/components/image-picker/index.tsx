/* eslint-disable @typescript-eslint/member-ordering */
import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Component } from 'react'
import { autobind } from '~/modules/@wmeimob/decorator/src/components'
import classname from 'classnames'
import MMIconFont from '../icon-font'
import styles from './index.modules.less'
import themesStyles from '../styles/themes/default.modules.less'
import MMIconFontName from '../icon-font/const'

interface IMMImagePickerProps {
  /**
   * 最多可选择张数
   *
   * @type {number}
   * @memberof IMMImagePickerProps
   */
  count?: number
  txt?: string
  isShowCount?: boolean
  /**
   * 图片值
   *
   * @type {string[]}
   * @memberof IMMImagePickerProps
   */
  value: string[]
  /**
   * 改变事件
   *
   * @memberof IMMImagePickerProps
   */
  onChange: (value: string[]) => void
}

/**
 * @name 图片选择器
 */
@autobind
export default class MMImagePicker extends Component<IMMImagePickerProps> {
  static defaultProps = {
    count: 9,
    value: [],
    txt: '',
    isShowCount: true
  }

  static options = {
    addGlobalClass: true
  }

  private renderIconfont(index) {
    return (
      <View className={styles.delete} onClick={() => this.onDelete(index)}>
        <Image className={styles.imageItemClose} src={require('~/images/imageClose.png')} />
      </View>
    )
  }

  private async onClick() {
    const { count } = this.props
    const { tempFilePaths } = await Taro.chooseImage({
      count
    })

    const paths = [...this.props.value, ...tempFilePaths]
    paths.splice(this.props.count as number, paths.length)
    this.props.onChange(paths)
  }

  private onDelete(index: number) {
    this.props.onChange(this.props.value.filter((_value, _index) => _index !== index))
  }

  render() {
    const { value, count, txt, isShowCount } = this.props
    return (
      <View className={styles.MMImagePicker}>
        <View className={styles.content}>
          {value.map((val, index) => (
            <View className={styles.item} key={val + index}>
              <View className={styles.itemContent}>
                <Image className={styles.image} src={val} />
              </View>
              {this.renderIconfont(index)}
            </View>
          ))}
          {(count === undefined || value.length < count) && (
            <View onClick={this.onClick} className={classname(styles.item, styles.add)}>
              <Image className={styles.imageCarema} src={require('~/images/carema.png')} />
              <View className={styles.imageItemHint}>{txt || '上传凭证'}</View>
              {isShowCount === true && <View className={styles.imageItemHint}>（最多3张）</View>}
            </View>
          )}
        </View>
      </View>
    )
  }
}
